'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SiteChrome from '../components/SiteChrome'

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
    description: 'This site, a modern portfolio with animations, dark mode, and a contact form, built with Next.js, TypeScript, and Tailwind CSS.',
    tags: [{ name: 'Next.js', color: 'blue' }, { name: 'TypeScript', color: 'purple' }, { name: 'Tailwind', color: 'green' }],
    image: 'from-purple-400 to-pink-500',
    glow: 'hover:shadow-pink-500/30 hover:border-pink-400/50',
    link: '/about',
  },
  {
    id: 3,
    title: 'Market Maker Simulator',
    description: 'Avellaneda–Stoikov optimal MM with LOB matching, regime-switching vol, Poisson noise flow, and a live WebSocket dashboard, FastAPI + React.',
    tags: [{ name: 'FastAPI', color: 'blue' }, { name: 'TypeScript', color: 'purple' }, { name: 'Quant', color: 'green' }],
    image: 'from-emerald-500 to-slate-700',
    glow: 'hover:shadow-emerald-500/30 hover:border-emerald-400/50',
    link: '/market-maker-sim',
  },
  {
    id: 4,
    title: 'RL Snake',
    description: 'Watch reinforcement-learning agents play Snake! Compare 4 DQN models at different training stages to see how intelligence emerges.',
    tags: [{ name: 'PyTorch', color: 'blue' }, { name: 'RL / DQN', color: 'purple' }, { name: 'AI / ML', color: 'green' }],
    image: 'from-green-400 to-blue-500',
    glow: 'hover:shadow-green-500/30 hover:border-green-400/50',
    link: '/rlsnake',
  },
  {
    id: 5,
    title: 'Quantium Data Analytics',
    description: 'Transformed raw retail sales data into actionable insights, building interactive dashboards to surface customer purchasing trends.',
    tags: [{ name: 'Python', color: 'blue' }, { name: 'Pandas', color: 'purple' }, { name: 'Dash', color: 'green' }],
    image: 'from-orange-400 to-red-500',
    glow: 'hover:shadow-orange-500/30 hover:border-orange-400/50',
    link: '/quantium',
  },
  {
    id: 6,
    title: 'Streamlit Demo',
    description: 'Interactive web application built with Streamlit, showcasing data visualisation and interactive features.',
    tags: [{ name: 'Python', color: 'blue' }, { name: 'Streamlit', color: 'purple' }, { name: 'Data Viz', color: 'green' }],
    image: 'from-indigo-400 to-purple-500',
    glow: 'hover:shadow-indigo-500/30 hover:border-indigo-400/50',
    link: '/streamlit-demo',
  },
  {
    id: 7,
    title: 'Web Scraper Demo',
    description: 'Web scraping application that extracts structured data, handles Cloudflare protection, and provides interactive visualisation.',
    tags: [{ name: 'Python', color: 'blue' }, { name: 'Selenium', color: 'purple' }, { name: 'Streamlit', color: 'green' }],
    image: 'from-teal-400 to-cyan-500',
    glow: 'hover:shadow-teal-500/30 hover:border-teal-400/50',
    link: '/webscraper-demo',
  },
  {
    id: 8,
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

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <SiteChrome>
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="project-page-h1">
            My Projects
          </h1>
          <p
            className="animate-fade-up text-xl text-slate-600 dark:text-slate-300 mb-14 text-center max-w-2xl mx-auto"
            style={{ animationDelay: '0.2s' }}
          >
            A collection of things I&apos;ve built, and the things they taught me.
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
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px)',
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
    </SiteChrome>
  )
}
