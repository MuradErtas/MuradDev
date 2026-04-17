'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import {
  PORTFOLIO_NAV_ITEMS,
  PROJECTS_AREA_PATHS,
  highlightCompactProjectsNav,
  usesCompactProjectsNav,
} from '../constants/portfolioNav'

type SiteChromeProps = {
  children: ReactNode
  /** Optional extra line(s) inside the site footer (e.g. project GitHub link). */
  footerExtra?: ReactNode
}

export default function SiteChrome({ children, footerExtra }: SiteChromeProps) {
  const router = useRouter()
  const pathname = usePathname() || ''
  const [menuOpen, setMenuOpen] = useState(false)

  const goHomeSection = (id: string) => {
    setMenuOpen(false)
    router.push(`/#${id}`)
  }

  const isProjectsNavActive =
    pathname === '/projects' ||
    pathname.startsWith('/projects/') ||
    Array.from(PROJECTS_AREA_PATHS).some(
      p => p !== '/projects' && (pathname === p || pathname.startsWith(`${p}/`))
    )

  const compactProjectsNav = usesCompactProjectsNav(pathname)
  const projectsNavEmphasis = highlightCompactProjectsNav(pathname)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <div
        className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 transition-all duration-300
          bg-white/97 dark:bg-slate-950/97 backdrop-blur-md
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        {compactProjectsNav ? (
          <>
            {(['Home', 'Projects'] as const).map((label, i) => {
              const projectsActive = label === 'Projects' && projectsNavEmphasis
              return (
              <button
                key={label}
                onClick={() => {
                  setMenuOpen(false)
                  router.push(label === 'Home' ? '/' : '/projects')
                }}
                className={`text-3xl font-bold transition-all duration-300
                  ${projectsActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}
                  ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                style={{ transitionDelay: menuOpen ? `${i * 0.055}s` : '0s' }}
              >
                {label}
              </button>
              )
            })}
            <div
              className={`mt-2 transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? `${2 * 0.055}s` : '0s' }}
            >
              <ThemeToggle />
            </div>
          </>
        ) : (
          <>
            {PORTFOLIO_NAV_ITEMS.map(({ label, id }, i) => (
              <button
                key={id}
                onClick={() => goHomeSection(id)}
                className={`text-3xl font-bold transition-all duration-300
                  ${id === 'projects' && isProjectsNavActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}
                  ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                style={{ transitionDelay: menuOpen ? `${i * 0.055}s` : '0s' }}
              >
                {label}
              </button>
            ))}
            <div
              className={`mt-2 transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? `${PORTFOLIO_NAV_ITEMS.length * 0.055}s` : '0s' }}
            >
              <ThemeToggle />
            </div>
          </>
        )}
      </div>

      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => { setMenuOpen(false); router.push('/') }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            MuradDev
          </button>

          <div className="hidden md:flex items-center gap-5">
            {compactProjectsNav ? (
              <>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="relative py-1 text-sm capitalize transition-colors duration-200 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/projects')}
                  className={`relative py-1 text-sm capitalize transition-colors duration-200 ${
                    projectsNavEmphasis
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  Projects
                  {projectsNavEmphasis && (
                    <span className="nav-active-underline absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                  )}
                </button>
                <ThemeToggle />
              </>
            ) : (
              <>
                {PORTFOLIO_NAV_ITEMS.map(({ label, id }) => {
                  const active = id === 'projects' && isProjectsNavActive
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => goHomeSection(id)}
                      className={`relative py-1 text-sm capitalize transition-colors duration-200 ${
                        active
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {label}
                      {active && (
                        <span className="nav-active-underline absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                      )}
                    </button>
                  )
                })}
                <ThemeToggle />
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300"
            >
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col">{children}</div>

      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 relative z-10 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm space-y-1">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p>
          {footerExtra}
        </div>
      </footer>
    </div>
  )
}
