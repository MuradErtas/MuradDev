'use client'

import SiteChrome from '../components/SiteChrome'
import { BTN_GITHUB, BTN_OPEN_EXTERNAL } from '../constants/projectButtons'

const STREAMLIT_DEMO_DEFAULT = 'https://muradertas-demo.streamlit.app'

function normalizeStreamlitBase(url: string): string {
  return url.trim().replace(/\/+$/, '') || STREAMLIT_DEMO_DEFAULT
}

function streamlitEmbedSrc(base: string): string {
  return `${normalizeStreamlitBase(base)}/?embed=true`
}

export default function StreamlitDemoPage() {
  const githubUrl = 'https://github.com/MuradErtas/Streamlit-Demo'
  const streamlitBase = normalizeStreamlitBase(
    process.env.NEXT_PUBLIC_STREAMLIT_DEMO_URL || STREAMLIT_DEMO_DEFAULT
  )
  const streamlitOpenUrl = `${streamlitBase}/`
  const streamlitIframeSrc = streamlitEmbedSrc(streamlitBase)

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
          {" "}repository for this project.
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
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={BTN_GITHUB}>
              <svg className="w-5 h-5 shrink-0 -translate-y-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="leading-none">View on GitHub</span>
            </a>
            <a href={streamlitOpenUrl} target="_blank" rel="noopener noreferrer" className={BTN_OPEN_EXTERNAL}>
              <svg className="w-6 h-6 shrink-0 -translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="leading-none">Open in new tab</span>
            </a>
          </div>
        </div>

        {/* Embedded app */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 content-card">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Interactive Dashboard
            </h2>
            <div className="relative w-full" style={{ minHeight: '600px' }}>
              <iframe
                src={streamlitIframeSrc}
                className="w-full h-full border-0 rounded-lg"
                style={{ minHeight: '600px', height: '100vh', maxHeight: '800px' }}
                title="Streamlit demo app"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 content-card">
            <h2 className="project-section-h2">Project Overview</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                This project demonstrates how quickly a fully interactive data application can be built and deployed
                using Streamlit, Python&apos;s rapid-prototyping framework for data science. The entire interface is
                defined in Python: widgets, charts, layouts, and reactive callbacks are declared in a single script
                that Streamlit re-runs on every user interaction, with no HTML, CSS, or JavaScript required.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Interactive Widgets</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sliders, dropdowns, and buttons that reactively update all charts and outputs with zero frontend code.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Data Visualisation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Plotly charts with zoom, pan, and hover tooltips embedded directly in the Python app.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Cloud Deployed</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Hosted on Streamlit Community Cloud; zero infrastructure, instant public URL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Features */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 content-card">
            <h2 className="project-section-h2">App Features</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Reactive UI</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Every widget interaction triggers a full script re-run, instantly refreshing all charts and
                    computed outputs. Streamlit manages state and diffing automatically.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Plotly Integration</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Interactive Plotly charts with zoom, pan, selection, and hover tooltips, rendered in the
                    browser with no additional frontend dependencies.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Data Controls</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Sidebar widgets (sliders, multiselects, radio buttons) that filter and transform the
                    underlying dataset in real time, demonstrating Streamlit&apos;s rapid prototyping strengths.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Cloud Deployment</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Deployed to Streamlit Community Cloud directly from GitHub; changes pushed to main
                    are live within seconds, with no server management required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About This Project */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 content-card">
            <h2 className="project-section-h2">About This Project</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Overview</h3>
                <p className="leading-relaxed">
                  This project demonstrates how quickly a fully interactive data application can be built and
                  deployed using Streamlit. Rather than writing HTML, CSS, or JavaScript, the entire interface is
                  defined in Python: widgets, charts, layouts, and reactive callbacks are all declared in a single
                  script that Streamlit re-runs on every user interaction. The app is deployed to Streamlit
                  Community Cloud and embedded here so you can interact with it live.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Streamlit:</strong> Python framework that turns a plain script into a shareable web app; it handles routing, state, widgets, and layout automatically</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Python:</strong> Core language for all application logic, data processing, and visualisation</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Plotly:</strong> Interactive charting library for dynamic, zoom/pan-enabled visualisations</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Pandas:</strong> Data manipulation and analysis for transforming and aggregating datasets</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Streamlit Community Cloud:</strong> Free hosting platform; zero infrastructure, instant deployment from GitHub</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Fully interactive dashboard built entirely in Python with no frontend code</li>
                  <li>Live embedded view; interact with the app directly on this page</li>
                  <li>Reactive UI: every widget interaction re-runs the script and instantly updates all outputs</li>
                  <li>Interactive Plotly charts supporting zoom, pan, hover tooltips, and selection</li>
                  <li>Deployed to Streamlit Cloud for zero-config public access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteChrome>
  )
}
