'use client'

import SiteChrome from '../components/SiteChrome'
import { BTN_GITHUB } from '../constants/projectButtons'

export default function PortfolioWebsitePage() {
  const githubUrl = 'https://github.com/MuradErtas/MuradDev'

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
      <div className="flex flex-col max-w-6xl mx-auto w-full px-6 pt-32 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="project-page-h1">
            Portfolio Website
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            This site is a modern portfolio with a canvas wave animation, dark mode, responsive layout,
            and a working contact form, built with Next.js 14, TypeScript, and Tailwind CSS.
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
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 content-card">
            <h2 className="project-section-h2">Project Overview</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                This portfolio is a full-stack Next.js 14 application serving as both a showcase and a working
                demonstration of modern web development. Every project page you&apos;ve visited is part of it,
                built with the App Router, TypeScript throughout, and Tailwind CSS for styling. The design
                prioritises performance, accessibility, and a polished feel across light and dark mode.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">WaveGrid Hero</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Custom Canvas 2D animation with perspective projection, ripple physics, mouse tracking,
                    and click-to-ripple, optimised with typed arrays and capped at 60 fps.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Dark / Light Mode</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    System-preference detection with manual toggle; WaveGrid palette and backgrounds switch
                    seamlessly between themes with no flash on load.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Working Contact Form</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Server-side form handling via a Next.js API route with input validation and email
                    delivery through Resend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 content-card">
            <h2 className="project-section-h2">Technical Highlights</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">WaveGrid Canvas Animation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  A 40&times;28 perspective-projected grid animated at 60 fps using the Canvas 2D API.
                  Heights are computed from superimposed sine/cosine waves plus a ripple propagation system.
                  Inverse perspective projection ensures click and mouse-hover origins land exactly where
                  the user expects, even far from the centre. Optimisations include Float32Array typed
                  arrays for vertex data, pre-baked stroke-style strings, cached gradient objects, and FPS capping.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">App Router &amp; API Routes</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Built on the Next.js 14 App Router with{' '}
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">&apos;use client&apos;</code>{' '}
                  boundaries for interactive pages. API routes in{' '}
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">app/api/</code>{' '}
                  proxy requests to Railway-hosted Python backends (RL Snake, SLM Comparison) and handle
                  contact-form email dispatch via Resend.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Shared Design System</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Consistent styling through shared CSS classes, including{' '}
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">project-page-h1</code>,{' '}
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">project-section-h2</code>{' '}
                  (gradient text),{' '}
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">content-card</code>{' '}
                  (hover border glow), and{' '}
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">brand-input</code>,
                  applied uniformly across all pages.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Responsive &amp; Accessible</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Mobile-first responsive layouts using Tailwind breakpoints. WaveGrid resolution scales
                  down gracefully at smaller viewports (30&times;22 mobile, 36&times;24 tablet, 40&times;28 desktop).
                  Canvas and decorative elements carry{' '}
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">aria-hidden</code>{' '}
                  to keep the accessibility tree clean.
                </p>
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
                  Beyond showcasing other projects, this site is itself a technical project. The WaveGrid hero
                  involved non-trivial graphics work, including inverse perspective projection for accurate mouse-to-grid
                  coordinate mapping, ripple physics with Gaussian decay envelopes, and canvas optimisation to
                  keep a ~1,200-vertex animation smooth on lower-end hardware. The design went through multiple
                  iterations to land on something that feels clean and personal without being over-engineered.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Next.js 14 (App Router):</strong> React framework with server components, file-based routing, and built-in API routes</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">TypeScript:</strong> Full type safety across components, API routes, and canvas animation code</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Tailwind CSS:</strong> Utility-first styling with custom CSS classes for the shared design system</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Canvas 2D API:</strong> Custom WaveGrid animation with perspective projection, ripple physics, and mouse interaction</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Resend:</strong> Transactional email API powering the contact form server action</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Vercel:</strong> Zero-config deployment with automatic preview builds on every push</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Canvas WaveGrid hero with click-to-ripple, mouse-hover elevation, and perspective-correct coordinate mapping</li>
                  <li>Dark / light mode with system-preference detection and zero flash on load</li>
                  <li>Working contact form with server-side validation and email delivery via Resend</li>
                  <li>Consistent design system across 8+ project pages, with gradient headings, hover cards, and shared button constants</li>
                  <li>Embedded interactive demos: iframes for Streamlit/Dash apps, Canvas game for RL Snake, dual chat panels for SLM Comparison</li>
                  <li>Proxy API routes handling Railway cold-start detection and wake-up retry logic</li>
                  <li>Responsive WaveGrid resolution: 30&times;22 mobile &rarr; 36&times;24 tablet &rarr; 40&times;28 desktop</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteChrome>
  )
}
