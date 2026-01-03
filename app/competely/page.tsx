'use client'

import { useRouter } from 'next/navigation'

export default function CompetelyPage() {
  const router = useRouter()
  const websiteUrl = 'https://competely-test.vercel.app/'

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
            Competely
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            A price tracking SaaS platform that helps business owners monitor competitor websites, track price changes over time, 
            and make data-driven pricing decisions. Built with modern web technologies and real-time monitoring capabilities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors font-semibold text-lg shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Website
            </a>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Project Overview</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                Competely is a comprehensive price tracking SaaS platform designed for business owners who need to monitor 
                competitor pricing strategies. The platform allows users to track unlimited websites, receive instant alerts 
                on price changes, and analyze historical pricing trends to make informed business decisions.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">💰 Price Tracking</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Automatically detect and alert on price changes across competitor websites
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">🔔 Instant Alerts</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get notified immediately when tracked websites change
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">📊 Change History</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View historical changes and track trends over time
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">🎯 Multiple Sites</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Track unlimited websites simultaneously from one dashboard
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
                  Competely is a full-stack SaaS application built to solve the problem of manual competitor price monitoring. 
                  The platform automates the tedious process of checking competitor websites, providing business owners with 
                  real-time insights into pricing strategies. Users can create accounts, add multiple competitor URLs, and 
                  receive automated alerts when prices change. The system tracks historical pricing data, enabling users to 
                  identify trends and make data-driven pricing decisions for their own businesses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Next.js:</strong> React framework for building the frontend with server-side rendering and API routes</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">TypeScript:</strong> Type-safe development for better code quality and maintainability</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Supabase:</strong> Backend-as-a-Service providing authentication, database, and real-time capabilities</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Railway:</strong> Cloud platform for hosting backend services and scheduled price monitoring tasks</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Vercel:</strong> Frontend deployment platform with edge network for fast global delivery</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Web Scraping:</strong> Automated price extraction from competitor websites</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Tailwind CSS:</strong> Utility-first CSS framework for responsive and modern UI design</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills Developed</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Full-stack SaaS application development</li>
                  <li>User authentication and authorization with Supabase</li>
                  <li>Database design and management for tracking historical data</li>
                  <li>Automated web scraping and price extraction</li>
                  <li>Scheduled task implementation for periodic price checks</li>
                  <li>Real-time notifications and alert systems</li>
                  <li>Data visualization and trend analysis</li>
                  <li>Multi-tenant application architecture</li>
                  <li>Cloud platform integration (Vercel, Railway, Supabase)</li>
                  <li>API design and backend service development</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>User authentication and account management</li>
                  <li>Add and manage unlimited competitor website URLs</li>
                  <li>Automated price tracking with scheduled monitoring</li>
                  <li>Instant alerts when price changes are detected</li>
                  <li>Historical price data visualization and trend analysis</li>
                  <li>Dashboard for viewing all tracked sites and their current prices</li>
                  <li>Change history with timestamps and price comparisons</li>
                  <li>Responsive design for desktop and mobile devices</li>
                  <li>Secure data storage and user privacy protection</li>
                  <li>Scalable architecture for handling multiple users and sites</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Use Cases</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>E-commerce businesses monitoring competitor pricing strategies</li>
                  <li>Retailers tracking price changes across multiple competitors</li>
                  <li>Business owners making data-driven pricing decisions</li>
                  <li>Market research and competitive analysis</li>
                  <li>Price optimization based on competitor trends</li>
                  <li>Automated competitive intelligence gathering</li>
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
          <a href={websiteUrl} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Live website</a>
        </div>
      </footer>
    </div>
  )
}
