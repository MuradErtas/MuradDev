'use client'

import SiteChrome from '../components/SiteChrome'

export default function AboutPage() {
  const githubUrl = 'https://github.com/MuradErtas/MuradDev'

  const technologies = [
    { name: 'Next.js', description: 'React framework for production with server-side rendering and static site generation', color: 'blue' },
    { name: 'React', description: 'JavaScript library for building user interfaces', color: 'blue' },
    { name: 'TypeScript', description: 'Typed superset of JavaScript for better code quality and developer experience', color: 'purple' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development', color: 'green' },
    { name: 'Vercel', description: 'Platform for deploying and hosting Next.js applications', color: 'indigo' },
    { name: 'Railway', description: 'Cloud platform for hosting Python API services and containerized applications', color: 'orange' }
  ]

  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
  }

  return (
    <SiteChrome
      footerExtra={(
        <p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            GitHub
          </a>
          {' '}repository for this project.
        </p>
      )}
    >
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="project-page-h1">
            About This Website
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 text-center max-w-2xl mx-auto">
            A modern portfolio website built with cutting-edge web technologies and best practices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
            <h2 className="project-section-h2">Technologies Used</h2>
            <div className="space-y-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{tech.name}</h3>
                    <span className={`px-3 py-1 ${colorClasses[tech.color as keyof typeof colorClasses]} rounded-full text-sm`}>
                      {tech.name}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="project-section-h2">Features</h2>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Responsive design that works on all devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Dark mode support for comfortable viewing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Server-side rendering for optimal performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Type-safe development with TypeScript</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Modern UI with Tailwind CSS utility classes</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Frontend deployed on Vercel for fast global CDN delivery</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Backend API services hosted on Railway for Python applications</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </SiteChrome>
  )
}
