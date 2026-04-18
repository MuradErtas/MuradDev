'use client'

import SiteChrome from '../components/SiteChrome'
import { BTN_GITHUB, BTN_OPEN_EXTERNAL } from '../constants/projectButtons'

export default function StreamlitDemoPage() {
  const streamlitUrl = 'https://muradertas-demo.streamlit.app/'
  const githubUrl = 'https://github.com/MuradErtas/Streamlit-Demo'

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
      <div className="flex flex-col max-w-7xl mx-auto w-full px-6 pt-32 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="project-page-h1">
            Streamlit Demo
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            An interactive web application built with Streamlit, showcasing data visualization and interactive features.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={BTN_GITHUB}
            >
              <svg className="w-5 h-5 shrink-0 -translate-y-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="leading-none">View on GitHub</span>
            </a>
            <a
              href={streamlitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={BTN_OPEN_EXTERNAL}
            >
              <svg className="w-6 h-6 shrink-0 -translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="leading-none">Open in new tab</span>
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="project-section-h2">About This Project</h2>
            
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
    </SiteChrome>
  )
}
