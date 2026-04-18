/** Shared with `app/page.tsx`; keep scroll targets in sync. */
export const PORTFOLIO_NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'CV', id: 'cv' },
  { label: 'Contact', id: 'contact' },
] as const

export type PortfolioNavId = (typeof PORTFOLIO_NAV_ITEMS)[number]['id']

/** Routes where the “Projects” nav item should show as active. */
export const PROJECTS_AREA_PATHS = new Set([
  '/projects',
  '/slmcomparison',
  '/rlsnake',
  '/quantium',
  '/streamlit-demo',
  '/webscraper-demo',
  '/web-automation-kit',
  '/market-maker-sim',
])

/**
 * Individual project / portfolio subpages (not the `/projects` grid).
 */
export function isProjectDetailNavRoute(pathname: string): boolean {
  const p = pathname || ''
  if (p === '/projects' || p.startsWith('/projects/')) return false
  if (p === '/portfolio-website' || p.startsWith('/portfolio-website/')) return true
  return Array.from(PROJECTS_AREA_PATHS).some(
    route => route !== '/projects' && (p === route || p.startsWith(`${route}/`))
  )
}

/** Home + Projects compact nav: listing, any project detail, or /about. */
export function usesCompactProjectsNav(pathname: string): boolean {
  const p = pathname || ''
  if (p === '/projects' || p.startsWith('/projects/')) return true
  return isProjectDetailNavRoute(p)
}

/** Highlight “Projects” only on the projects grid, not inside a single project. */
export function highlightCompactProjectsNav(pathname: string): boolean {
  const p = pathname || ''
  return p === '/projects' || p.startsWith('/projects/')
}
