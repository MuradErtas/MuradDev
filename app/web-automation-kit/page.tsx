'use client'

import { useRouter } from 'next/navigation'

export default function WebAutomationKitPage() {
  const router = useRouter()
  const githubUrl = 'https://github.com/MuradErtas/Website-Automation-Demo'

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
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 pt-24 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Web Automation Kit
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            A config-driven web automation framework with multiple automation patterns using Selenium. 
            Demonstrates login automation, file downloads, form filling, table scraping, and dynamic content handling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
        </div>

        {/* Project Overview */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Project Overview</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                This project is a comprehensive web automation framework that demonstrates various automation patterns 
                commonly needed in web testing and data extraction. The framework is config-driven, making it easy to 
                adapt to different websites and use cases. It includes five distinct automation modules, each showcasing 
                different techniques for interacting with web pages.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Login</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Automated login with credential validation and success verification
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Download</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    File download automation with verification and file size checks
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Form Fill</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Automated form filling with field validation and submission
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Table Scrape</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Paginated table scraping with de-duplication and CSV export
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Dynamic Content</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Handling dynamically loaded content with explicit waits and retries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Modules */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-6 text-slate-700 dark:text-slate-300">Automation Modules</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Login Automation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Automates login to secure areas with username and password input, form submission, and success validation. 
                  Includes error handling and verification of successful authentication.
                </p>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">python main.py --task login</code>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">File Download Automation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Automates file downloads from web pages, verifies file existence, and checks file size to ensure successful downloads.
                </p>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">python main.py --task download</code>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Form Fill Automation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Automates filling out web forms with multiple fields, handles form submission, and validates success messages.
                </p>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">python main.py --task form</code>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Paginated Table Scraping</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Scrapes data from paginated tables, navigates through multiple pages, handles de-duplication, and exports to CSV format.
                </p>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">python main.py --task scrape</code>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Dynamic Content Loading</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Handles dynamically loaded content using explicit waits, retry mechanisms, and proper timing strategies for JavaScript-rendered elements.
                </p>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">python main.py --task dynamic</code>
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
                  This project demonstrates comprehensive web automation capabilities using Selenium WebDriver. The framework 
                  is designed with a config-driven architecture, making it easy to adapt to different websites and automation 
                  scenarios. It includes five distinct automation modules, each showcasing different patterns and techniques 
                  for web interaction, from simple form filling to complex paginated data extraction. The framework includes 
                  robust error handling, screenshot capture, HTML artifact saving, and structured JSON output for integration 
                  with other systems.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Selenium WebDriver:</strong> Browser automation framework for controlling web browsers programmatically</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Python:</strong> Core programming language for automation logic and framework implementation</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">ChromeDriver:</strong> WebDriver implementation for Chrome browser automation</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">BeautifulSoup (implicit):</strong> HTML parsing capabilities for data extraction</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">CLI Framework:</strong> Command-line interface using argparse for task selection</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">JSON:</strong> Structured output format for automation results</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills Developed</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Web automation using Selenium WebDriver and browser automation</li>
                  <li>Config-driven architecture design for maintainable automation frameworks</li>
                  <li>Handling various web interaction patterns (login, forms, downloads, tables)</li>
                  <li>Working with dynamic content and JavaScript-rendered elements</li>
                  <li>Implementing explicit waits and retry mechanisms for robust automation</li>
                  <li>Data extraction and processing from web pages</li>
                  <li>Error handling and debugging with screenshots and HTML artifacts</li>
                  <li>CLI application design and argument parsing</li>
                  <li>Structured output formats (JSON, CSV) for automation results</li>
                  <li>File system management for artifacts and outputs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Five distinct automation modules covering common web automation patterns</li>
                  <li>Config-driven architecture with centralized configuration management</li>
                  <li>CLI interface for easy task selection and execution</li>
                  <li>Automatic screenshot capture for debugging and verification</li>
                  <li>HTML artifact saving on failures for troubleshooting</li>
                  <li>Structured JSON output with timestamps and task-specific data</li>
                  <li>Robust error handling and validation for each automation type</li>
                  <li>Support for paginated data extraction with de-duplication</li>
                  <li>Dynamic content handling with explicit waits and retry logic</li>
                  <li>File download verification with size checks</li>
                  <li>Organized artifact storage (screenshots, HTML, downloads, data)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Project Structure</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">config.py:</strong> Centralized configuration for all automation tasks (URLs, selectors, credentials)</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">main.py:</strong> CLI entry point with task selection and execution</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">automations/:</strong> Modular automation scripts for each task type</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">automations/utils.py:</strong> Shared utility functions (screenshots, HTML saving, timestamps)</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">artifacts/:</strong> Organized output directories for screenshots, HTML, downloads, and data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Use Cases</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Automated testing of web applications and user workflows</li>
                  <li>Data extraction from websites with complex navigation</li>
                  <li>Automated form submissions and data entry</li>
                  <li>File download automation and verification</li>
                  <li>Web scraping from paginated tables and dynamic content</li>
                  <li>Regression testing and workflow validation</li>
                  <li>Integration testing for web-based systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© 2025 MuradDev. All rights reserved.</p>
          <a href={githubUrl} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">GitHub</a> repository for this project.
        </div>
      </footer>
    </div>
  )
}
