'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeToggle from '../components/ThemeToggle'

interface ProjectTag {
  name: string
  color: 'blue' | 'purple' | 'green' | 'orange'
}

interface Project {
  id: number
  title: string
  description: string
  tags: ProjectTag[]
  image: string
  glow: string
  link?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'SLM Comparison',
    description: 'Interactive comparison of Transformer and RNN language models. Chat with both models side-by-side to see their differences in real time.',
    tags: [{ name: 'PyTorch', color: 'blue' }, { name: 'Next.js', color: 'purple' }, { name: 'AI / ML', color: 'green' }],
    image: 'from-blue-400 to-purple-500',
    glow: 'hover:shadow-purple-500/30 hover:border-purple-400/50',
    link: '/slmcomparison',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'This site — a modern portfolio with animations, dark mode, and a contact form, built with Next.js, TypeScript, and Tailwind CSS.',
    tags: [{ name: 'Next.js', color: 'blue' }, { name: 'TypeScript', color: 'purple' }, { name: 'Tailwind', color: 'green' }],
    image: 'from-purple-400 to-pink-500',
    glow: 'hover:shadow-pink-500/30 hover:border-pink-400/50',
    link: '/about',
  },
  {
    id: 3,
    title: 'RL Snake',
    description: 'Watch reinforcement-learning agents play Snake! Compare 4 DQN models at different training stages to see how intelligence emerges.',
    tags: [{ name: 'PyTorch', color: 'blue' }, { name: 'RL / DQN', color: 'purple' }, { name: 'AI / ML', color: 'green' }],
    image: 'from-green-400 to-blue-500',
    glow: 'hover:shadow-green-500/30 hover:border-green-400/50',
    link: '/rlsnake',
  },
  {
    id: 4,
    title: 'Quantium Data Analytics',
    description: 'Transformed raw retail sales data into actionable insights, building interactive dashboards to surface customer purchasing trends.',
    tags: [{ name: 'Python', color: 'blue' }, { name: 'Pandas', color: 'purple' }, { name: 'Dash', color: 'green' }],
    image: 'from-orange-400 to-red-500',
    glow: 'hover:shadow-orange-500/30 hover:border-orange-400/50',
    link: '/quantium',
  },
  {
    id: 5,
    title: 'Streamlit Demo',
    description: 'Interactive web application built with Streamlit, showcasing data visualisation and interactive features.',
    tags: [{ name: 'Python', color: 'blue' }, { name: 'Streamlit', color: 'purple' }, { name: 'Data Viz', color: 'green' }],
    image: 'from-indigo-400 to-purple-500',
    glow: 'hover:shadow-indigo-500/30 hover:border-indigo-400/50',
    link: '/streamlit-demo',
  },
  {
    id: 6,
    title: 'Web Scraper Demo',
    description: 'Web scraping application that extracts structured data, handles Cloudflare protection, and provides interactive visualisation.',
    tags: [{ name: 'Python', color: 'blue' }, { name: 'Selenium', color: 'purple' }, { name: 'Streamlit', color: 'green' }],
    image: 'from-teal-400 to-cyan-500',
    glow: 'hover:shadow-teal-500/30 hover:border-teal-400/50',
    link: '/webscraper-demo',
  },
  {
    id: 7,
    title: 'Web Automation Kit',
    description: 'Config-driven web automation framework with multiple patterns: login flows, downloads, form filling, table scraping, and dynamic content.',
    tags: [{ name: 'Python', color: 'blue' }, { name: 'Selenium', color: 'purple' }, { name: 'Automation', color: 'green' }],
    image: 'from-cyan-400 to-blue-500',
    glow: 'hover:shadow-cyan-500/30 hover:border-cyan-400/50',
    link: '/web-automation-kit',
  },
]

const TAG_COLORS = {
  blue:   'bg-blue-100   dark:bg-blue-900/30   text-blue-700   dark:text-blue-300',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  green:  'bg-green-100  dark:bg-green-900/30  text-green-700  dark:text-green-300',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
}

export default function ProjectsPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-x-hidden">

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="orb orb-4" /><div className="orb orb-5" />
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300
          bg-white/97 dark:bg-slate-950/97 backdrop-blur-md
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        {[{ label: 'Home', action: () => router.push('/') }, { label: 'Projects', action: () => setMenuOpen(false) }].map(({ label, action }, i) => (
          <button key={label} onClick={action}
            className={`text-3xl font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300
              ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
            style={{ transitionDelay: menuOpen ? `${i * 0.07}s` : '0s' }}>
            {label}
          </button>
        ))}
        <div className={`transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          style={{ transitionDelay: menuOpen ? '0.14s' : '0s' }}>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            MuradDev
          </button>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => router.push('/')} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              ← Home
            </button>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Projects grid */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center animated-gradient-text leading-tight animate-fade-down">
            My Projects
          </h1>
          <p className="animate-fade-up text-xl text-slate-600 dark:text-slate-300 mb-14 text-center max-w-2xl mx-auto"
            style={{ animationDelay: '0.2s' }}>
            A collection of things I&apos;ve built — each one a step forward in my journey.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`animate-on-scroll project-card group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl ${project.glow} border border-slate-200 dark:border-slate-700 cursor-pointer`}
                style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
                onClick={() => project.link && router.push(project.link)}
              >
                <div className={`w-full h-44 bg-gradient-to-br ${project.image} rounded-lg mb-5 overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag.name} className={`px-3 py-1 ${TAG_COLORS[tag.color]} rounded-full text-xs font-medium`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
