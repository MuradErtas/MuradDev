'use client'

import { useRouter } from 'next/navigation'

export default function StreamlitDemoPage() {
  const router = useRouter()
  const streamlitUrl = 'https://muradertas-demo.streamlit.app/'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pt-24 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Streamlit Demo
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            An interactive web application built with Streamlit, showcasing data visualization and interactive features.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={streamlitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors font-semibold text-lg shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-slate-700 dark:text-slate-300">About This Project</h2>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-400">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Overview</h3>
                <p className="leading-relaxed">
                  This interactive web application demonstrates the power of Streamlit for building data-driven applications. 
                  Streamlit enables rapid development of interactive dashboards and data visualization tools with Python, 
                  making it an excellent choice for prototyping and deploying data science applications.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Streamlit:</strong> Python framework for building interactive web applications and data dashboards</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Python:</strong> Core programming language for application logic and data processing</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Visualization Libraries:</strong> Libraries like Plotly, Matplotlib, or Seaborn for creating interactive charts and graphs</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Streamlit Cloud:</strong> Platform for deploying and hosting Streamlit applications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills Developed</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Building interactive web applications with Streamlit</li>
                  <li>Creating responsive data visualizations and dashboards</li>
                  <li>Implementing user interactions and real-time updates</li>
                  <li>Deploying Python applications to the cloud</li>
                  <li>Designing intuitive user interfaces for data applications</li>
                  <li>Working with Streamlit widgets and components</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Interactive web interface built with Streamlit</li>
                  <li>Real-time data visualization and updates</li>
                  <li>User-friendly widgets and controls</li>
                  <li>Responsive design that works on different screen sizes</li>
                  <li>Cloud deployment for easy access</li>
                  <li>Fast development and iteration cycle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p> <a href="https://github.com/MuradErtas/Streamlit-Demo" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">GitHub</a> repository for this project.
        </div>
      </footer>
    </div>
  )
}
