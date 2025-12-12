'use client'

import { useRouter } from 'next/navigation'

export default function ProjectsPage() {
  const router = useRouter()

  // Placeholder projects data
  const projects = [
    {
      id: 1,
      title: 'RNN vs Transformer',
      description: 'A comparison of RNN and Transformer models for text generation using an SLM.',
      tags: ['Github Link'],
      image: 'bg-gradient-to-br from-blue-400 to-purple-500'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Placeholder description',
      tags: ['Placeholder tags'],
      image: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Placeholder description',
      tags: ['Placeholder tags'],
      image: 'bg-gradient-to-br from-green-400 to-blue-500'
    },
    {
      id: 4,
      title: 'Project Four',
      description: 'Placeholder description',
      tags: ['Placeholder tags'],
      image: 'bg-gradient-to-br from-orange-400 to-red-500'
    },
    {
      id: 5,
      title: 'Project Five',
      description: 'Placeholder description',
      tags: ['Placeholder tags'],
      image: 'bg-gradient-to-br from-indigo-400 to-purple-500'
    },
    {
      id: 6,
      title: 'Project Six',
      description: 'Placeholder description',
      tags: ['Placeholder tags'],
      image: 'bg-gradient-to-br from-teal-400 to-cyan-500'
    }
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
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:scale-105"
              >
                <div className={`w-full h-48 ${project.image} rounded-lg mb-4`}></div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

