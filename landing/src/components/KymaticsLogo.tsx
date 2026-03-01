interface KymaticsLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Logo: organic blob of wavy gradient lines with "K" and "KYMATICS" wordmark.
 * Palette: mint (#C8F7C1) → purple (#E1A2FC) → primary (#5D4DC2).
 */
export function KymaticsLogo({
  className = "",
  width = 280,
  height = 200
}: KymaticsLogoProps) {
  const cx = width / 2;
  const cy = height * 0.42;
  const blobRx = width * 0.38;
  const blobRy = height * 0.28;
  const numLines = 32;
  const lines: string[] = [];
  for (let i = 0; i < numLines; i++) {
    const t = i / (numLines - 1);
    const y = cy - blobRy + (t * 2 * blobRy);
    const amp = 8 + Math.sin(t * Math.PI) * 6;
    const pts: string[] = [];
    const steps = 40;
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * width;
      const wave = Math.sin((s / steps) * Math.PI * 4 + t * 2) * amp;
      pts.push(`${x},${y + wave}`);
    }
    lines.push(`M ${pts.join(" L ")}`);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient
          id="kymatics-blob-gradient"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#C8F7C1" />
          <stop offset="45%" stopColor="#E1A2FC" />
          <stop offset="100%" stopColor="#5D4DC2" />
        </linearGradient>
        <linearGradient
          id="kymatics-line-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#C8F7C1" />
          <stop offset="50%" stopColor="#E1A2FC" />
          <stop offset="100%" stopColor="#5D4DC2" />
        </linearGradient>
        <clipPath id="kymatics-blob-clip">
          <ellipse cx={cx} cy={cy} rx={blobRx} ry={blobRy} />
        </clipPath>
      </defs>
      <g clipPath="url(#kymatics-blob-clip)">
        {lines.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#kymatics-line-gradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}
      </g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#F2EFE9"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="72"
      >
        K
      </text>
      <text
        x={cx}
        y={height - 24}
        textAnchor="middle"
        fill="#F2EFE9"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="0.2em"
      >
        KYMATICS
      </text>
    </svg>
  );
}
