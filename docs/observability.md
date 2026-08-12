# Observability and Evals

You cannot claim to build software reliably from voice prompts without
measuring how often it works. This page covers what the stack records and how to
read it.

## The metric that matters

A job reaching `succeeded` only means the agent process exited zero. It does not
mean anything is running.

Because the agent is required to containerise its build, start it, and register
a URL via `POST /v1/jobs/{id}/preview-url`, there is a stricter signal available:
**delivered** — a job that both succeeded and published a preview URL.

Otter exposes both:

| Metric | Meaning |
|---|---|
| `otter_success_rate` | Succeeded share of terminal jobs |
| `otter_delivery_rate` | Share of terminal jobs that published a preview URL |

The gap between them is the number to watch. It is precisely the population of
runs that looked fine and shipped nothing, and it is where regressions hide.

## Prometheus endpoint

Otter serves the standard scrape path, so no per-deployment override is needed:

```bash
curl http://localhost:8080/metrics
```

```text
# HELP otter_jobs Jobs by lifecycle status.
# TYPE otter_jobs gauge
otter_jobs{status="queued"} 1
otter_jobs{status="running"} 1
otter_jobs{status="succeeded"} 3
otter_jobs{status="failed"} 2
otter_jobs{status="cancelled"} 1
otter_jobs_delivered_total 2
otter_tokens_total{kind="prompt"} 3600
otter_tokens_total{kind="completion"} 610
otter_estimated_cost_usd_total 0.310000
otter_success_rate 0.500000
otter_delivery_rate 0.333333
otter_job_duration_ms_avg 20000
```

A minimal scrape config:

```yaml
scrape_configs:
  - job_name: otter
    static_configs:
      - targets: ["otter-server:8080"]
```

Metrics are derived from Postgres, not from in-process counters. The server and
the worker are separate processes: in-process counters in the server would miss
everything the worker does and would reset on every deploy. Any replica answers
with the same numbers.

## Token and cost accounting

Every agent run has its token usage extracted from the streamed transcript and
persisted. Per-job detail is available at:

```bash
curl http://localhost:8080/v1/jobs/{id}/usage
```

```json
{
  "job_id": "…",
  "model": "mistral-large-3",
  "prompt_tokens": 1000,
  "completion_tokens": 200,
  "total_tokens": 1200,
  "estimated_cost_usd": 0.1,
  "duration_ms": 10000
}
```

`duration_ms` measures agent execution, excluding the post-run setup hook and
runtime provisioning.

### Configuring prices

Cost is derived, never reported by the provider, so prices are operator-supplied
via `OTTER_MODEL_PRICING`. The format is `model=input:output` in USD per million
tokens:

```bash
OTTER_MODEL_PRICING=mistral-large-3=2.0:6.0,mistral-small-latest=0.2:0.6
```

::: tip Unknown is not free
With no price configured, `estimated_cost_usd` is `null` — never `0`. Jobs on
unpriced models still contribute token counts, and are excluded from
`otter_jobs_with_cost_total` so the spend total is never quietly understated.
:::

Malformed price entries are skipped rather than failing startup. A typo in a
price string should cost you cost reporting, not your control plane.

## The eval suite

Metrics tell you what happened to real traffic. The eval suite tells you whether
a change made things better or worse, on demand.

It lives in [`otter/evals/`](https://github.com/Unchained-Labs/otter/blob/main/evals/README.md)
and runs a fixed set of prompts against a live stack, scoring each on delivery,
duration, and cost.

```bash
cd otter/evals

./run_evals.py --dry-run                    # validate without spending tokens
./run_evals.py --tier smoke                 # fastest useful signal
./run_evals.py --report report.json --min-delivery-rate 0.8
```

The suite is tiered by cost: `smoke` (minutes), `core` (~15 min), `hard`
(~30 min, multi-container and deliberately underspecified prompts). Scoring
logic is unit tested and runs in CI without a live stack:

```bash
python3 -m unittest discover -s evals -p 'test_*.py'
```

## Reading a regression

| Observation | Likely cause |
|---|---|
| Delivery rate fell, success rate steady | Agent finishes without shipping — preview-URL registration or port binding |
| Durations climbed, delivery steady | Model or prompt regression; compare `otter_job_duration_ms_avg` |
| Cost per job climbed, tokens flat | Model routing changed to a pricier model |
| Tokens climbed, delivery fell | Agent looping or retrying inside a single run |

## Request logs

Both services emit structured tracing. `OTTER_RUST_LOG` controls verbosity
(`info` by default, `debug` for per-request detail). Job lifecycle transitions
are logged with `job_id`, so a single job can be followed across the server and
the worker:

```bash
./kymatics.sh logs -f otter-worker | grep <job-id>
```
