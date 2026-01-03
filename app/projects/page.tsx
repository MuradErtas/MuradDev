'use client'

import { useRouter } from 'next/navigation'

interface ProjectTag {
  name: string
  color: 'blue' | 'purple' | 'green' | 'orange'
}

interface Project {
  id: number
  title: string
  description: string
  tags: ProjectTag[] | string[]
  image: string
  link?: string
}

export default function ProjectsPage() {
  const router = useRouter()

  // Placeholder projects data
  const projects: Project[] = [
    {
      id: 1,
      title: 'SLM Comparison',
      description: 'Interactive comparison of Transformer and RNN language models. Chat with both models side by side to see their differences.',
      tags: [
        { name: 'PyTorch', color: 'blue' },
        { name: 'Next.js', color: 'purple' },
        { name: 'AI/ML', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-blue-400 to-purple-500',
      link: '/slmcomparison',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Fully functional website with a modern design and a responsive layout, built with Next.js, TypeScript, and Tailwind CSS.',
      tags: [
        { name: 'Next.js', color: 'blue' },
        { name: 'TypeScript', color: 'purple' },
        { name: 'Tailwind', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-purple-400 to-pink-500',
      link: '/about'
    },
    {
      id: 3,
      title: 'RL Snake',
      description: 'Watch reinforcement learning models play Snake! Compare 4 models with different training levels to see how they improve.',
      tags: [
        { name: 'PyTorch', color: 'blue' },
        { name: 'RL/DQN', color: 'purple' },
        { name: 'AI/ML', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-green-400 to-blue-500',
      link: '/rlsnake'
    },
    {
      id: 4,
      title: 'Quantium Data Analytics',
      description: 'Data processing and visualization project. Transformed raw sales data into actionable insights with interactive dashboards.',
      tags: [
        { name: 'Python', color: 'blue' },
        { name: 'Pandas', color: 'purple' },
        { name: 'Dash', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-orange-400 to-red-500',
      link: '/quantium'
    },
    {
      id: 5,
      title: 'Streamlit Demo',
      description: 'Interactive web application built with Streamlit, showcasing data visualization and interactive features.',
      tags: [
        { name: 'Python', color: 'blue' },
        { name: 'Streamlit', color: 'purple' },
        { name: 'Data Viz', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-indigo-400 to-purple-500',
      link: '/streamlit-demo'
    },
    {
      id: 6,
      title: 'Web Scraper Demo',
      description: 'Web scraping application that extracts structured data, handles Cloudflare protection, and provides interactive visualization.',
      tags: [
        { name: 'Python', color: 'blue' },
        { name: 'Selenium', color: 'purple' },
        { name: 'Streamlit', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-teal-400 to-cyan-500',
      link: '/webscraper-demo'
    },
    {
      id: 7,
      title: 'Web Automation Kit',
      description: 'Config-driven web automation framework with multiple automation patterns: login, downloads, forms, table scraping, and dynamic content.',
      tags: [
        { name: 'Python', color: 'blue' },
        { name: 'Selenium', color: 'purple' },
        { name: 'Automation', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      link: '/web-automation-kit'
    },
    {
      id: 8,
      title: 'Competely',
      description: 'Price tracking SaaS platform for monitoring competitor websites, tracking price changes, and making data-driven pricing decisions.',
      tags: [
        { name: 'Next.js', color: 'blue' },
        { name: 'Supabase', color: 'purple' },
        { name: 'SaaS', color: 'green' }
      ],
      image: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      link: '/competely'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              MuradDev
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Projects Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 text-center max-w-2xl mx-auto">
            A collection of some projects I have worked on. Each one represents a learning experience and a step forward in my development journey.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:scale-105 cursor-pointer"
                onClick={() => project.link && router.push(project.link)}
              >
                <div className={`w-full h-48 ${project.image} rounded-lg mb-4`}></div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.tags.map((tag, index) => {
                    const tagName = typeof tag === 'string' ? tag : tag.name
                    const tagColor = typeof tag === 'string' ? 'blue' : tag.color
                    
                    const colorClasses = {
                      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
                      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
                      green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    }
                    
                    return (
                      <span
                        key={index}
                        className={`px-3 py-1 ${colorClasses[tagColor]} rounded-full text-sm`}
                      >
                        {tagName}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© 2025 MuradDev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

