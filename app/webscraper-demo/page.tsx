'use client'

import SiteChrome from '../components/SiteChrome'
import { BTN_GITHUB, BTN_OPEN_EXTERNAL } from '../constants/projectButtons'

const WEBSCRAPER_DEMO_DEFAULT = 'https://webscraper-demo.streamlit.app'

function normalizeStreamlitBase(url: string): string {
  return url.trim().replace(/\/+$/, '') || WEBSCRAPER_DEMO_DEFAULT
}

function streamlitEmbedSrc(base: string): string {
  return `${normalizeStreamlitBase(base)}/?embed=true`
}

export default function WebScraperDemoPage() {
  const githubUrl = 'https://github.com/MuradErtas/WebScraper-Demo'
  const appBase = normalizeStreamlitBase(
    process.env.NEXT_PUBLIC_WEBSCRAPER_DEMO_URL || WEBSCRAPER_DEMO_DEFAULT
  )
  const streamlitOpenUrl = `${appBase}/`
  const streamlitIframeSrc = streamlitEmbedSrc(appBase)

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
            Web Scraper Demo
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            A web scraping application that extracts structured data from websites, handles Cloudflare protection, 
            and provides an interactive visualization interface for exploring the scraped data.
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
              href={streamlitOpenUrl}
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

        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Interactive Dashboard
            </h2>
            <div className="relative w-full" style={{ minHeight: '600px' }}>
              <iframe
                src={streamlitIframeSrc}
                className="w-full h-full border-0 rounded-lg"
                style={{ minHeight: '600px', height: '100vh', maxHeight: '800px' }}
                title="Web scraper Streamlit demo"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="project-section-h2">Project Overview</h2>
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
            <h2 className="project-section-h2">About This Project</h2>
            
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
    </SiteChrome>
  )
}
