'use client'

import { useRouter } from 'next/navigation'

export default function WebScraperDemoPage() {
  const router = useRouter()
  const streamlitUrl = 'https://webscraper-demo.streamlit.app/'
  const githubUrl = 'https://github.com/MuradErtas/WebScraper-Demo'

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
            Web Scraper Demo
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            A web scraping application that extracts structured data from websites, handles Cloudflare protection, 
            and provides an interactive visualization interface for exploring the scraped data.
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
              Open Application
            </a>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Project Overview</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                This project demonstrates web scraping capabilities by extracting structured data from the University of Melbourne's 
                School of Computing and Information Systems people page. The scraper handles modern web protection mechanisms, 
                processes and cleans the data, and provides an interactive visualization interface for exploring the results.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Web Scraping</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Extracts names, titles, categories, and profile URLs from web pages using Selenium.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Cloudflare Bypass</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Handles Cloudflare protection using Selenium with headless Chrome browser automation.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Data Visualization</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Interactive Streamlit app with filters, search, statistics, and downloadable data.
                  </p>
                </div>
              </div>
            </div>
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
                  This project showcases end-to-end web scraping capabilities, from data extraction to visualization. 
                  The scraper targets the University of Melbourne's CIS people page, extracting structured information about 
                  faculty and staff members. The project handles modern web protection (Cloudflare), processes and cleans the data, 
                  and provides multiple output formats. An interactive Streamlit application allows users to explore, filter, 
                  and visualize the scraped data with search functionality and downloadable results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Selenium:</strong> Browser automation framework for handling JavaScript-rendered content and bypassing Cloudflare protection</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">BeautifulSoup:</strong> HTML parsing library for extracting structured data from web pages</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Python:</strong> Core programming language for scraping logic and data processing</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Streamlit:</strong> Framework for building the interactive data visualization and exploration interface</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Pandas:</strong> Data manipulation library for processing and cleaning scraped data</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">ChromeDriver:</strong> Automated browser control for navigating protected websites</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills Developed</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Web scraping techniques for extracting structured data from HTML</li>
                  <li>Handling modern web protection mechanisms (Cloudflare, bot detection)</li>
                  <li>Browser automation with Selenium and headless Chrome</li>
                  <li>Data cleaning and processing (separating honorifics, parsing categories)</li>
                  <li>Data export in multiple formats (JSON, CSV)</li>
                  <li>Building interactive data exploration interfaces with Streamlit</li>
                  <li>Implementing search, filtering, and visualization features</li>
                  <li>Error handling and robust scraping workflows</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Automated web scraping with Selenium to bypass Cloudflare protection</li>
                  <li>Extracts names, titles, categories, and profile URLs from web pages</li>
                  <li>Intelligent parsing that separates honorifics (Prof, Dr, etc.) from names</li>
                  <li>Automatic category detection from page structure and section headers</li>
                  <li>Multiple output formats: JSON and CSV for data portability</li>
                  <li>Interactive Streamlit dashboard with category and honorific filters</li>
                  <li>Search functionality to quickly find specific people or titles</li>
                  <li>Statistics and visualizations of the scraped data</li>
                  <li>Clickable profile links for easy navigation</li>
                  <li>Download filtered data as CSV for further analysis</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Project Workflow</h3>
                <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Web Scraping:</strong> Use Selenium with headless Chrome to navigate to the target website and bypass Cloudflare protection</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Extraction:</strong> Parse HTML using BeautifulSoup to extract names, titles, categories, and profile URLs</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Processing:</strong> Clean and structure the data, separate honorifics from names, and categorize entries</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Export:</strong> Save scraped data to both JSON and CSV formats for different use cases</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Visualization:</strong> Build interactive Streamlit app with filters, search, statistics, and downloadable results</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Deployment:</strong> Deploy the Streamlit application to Streamlit Cloud for public access</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p>
          <a href={githubUrl} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">GitHub</a> repository for this project.
        </div>
      </footer>
    </div>
  )
}
