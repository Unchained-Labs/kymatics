import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Kymatics',
  description: 'Voice-driven build orchestration: speak intent, get running software',
  lastUpdated: true,
  cleanUrls: true,
  // The docs live inside the umbrella repo alongside the submodule checkouts
  // (otter/, seal/, lavoix/). Without this, VitePress would try to crawl them.
  srcExclude: ['../otter/**', '../seal/**', '../lavoix/**', '../landing/**'],
  vite: {
    // Keep the docs build self-contained so it never inherits the Tailwind /
    // PostCSS config used by `landing/`.
    css: {
      postcss: {
        plugins: []
      }
    }
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    editLink: {
      pattern: 'https://github.com/Unchained-Labs/kymatics/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    footer: {
      message: 'Kymatics stack documentation',
      copyright: 'Unchained Labs'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/tutorials/getting-started' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'Concepts', link: '/concepts' },
      { text: 'Operations', link: '/operations' },
      { text: 'Observability', link: '/observability' },
      { text: 'Services', link: '/services' }
    ],
    sidebar: [
      {
        text: 'Overview',
        collapsed: false,
        items: [
          { text: 'What Kymatics Is', link: '/' },
          { text: 'Concepts', link: '/concepts' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Service Map', link: '/services' }
        ]
      },
      {
        text: 'Tutorials',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/tutorials/getting-started' },
          { text: 'Your First Voice Build', link: '/tutorials/first-build' }
        ]
      },
      {
        text: 'Operations',
        collapsed: false,
        items: [
          { text: 'Running the Stack', link: '/operations' },
          { text: 'Observability and Evals', link: '/observability' },
          { text: 'Releasing and Submodules', link: '/releasing' }
        ]
      },
      {
        text: 'References',
        collapsed: false,
        items: [{ text: 'Related Documents', link: '/related-documents' }]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Unchained-Labs/kymatics' }]
  }
})
