'use client'

import SiteChrome from '../components/SiteChrome'
import { BTN_GITHUB, BTN_OPEN_EXTERNAL } from '../constants/projectButtons'

export default function MarketMakerSimPage() {
  const liveUrl = 'https://marketmakersim.up.railway.app/'
  const githubUrl = 'https://github.com/MuradErtas/MarketMakerSim'

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
        <div className="text-center mb-8 w-full max-w-4xl mx-auto">
          <h1 className="project-page-h1">
            Market Maker Simulator
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Live simulation of an Avellaneda–Stoikov optimal market maker against Poisson-driven noise flow
            in a regime-switching volatility environment, limit order book, optimal quotes, and a real-time dashboard.
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
              href={liveUrl}
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
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Interactive Dashboard</h2>
            <div className="relative w-full" style={{ minHeight: '600px' }}>
              <iframe
                src={liveUrl}
                className="w-full h-full border-0 rounded-lg"
                style={{ minHeight: '600px', height: '100vh', maxHeight: '800px' }}
                title="Market Maker Simulator"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="project-section-h2">About this project</h2>

            <div className="space-y-6 text-slate-600 dark:text-slate-400">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Overview</h3>
                <p className="leading-relaxed">
                  The simulator stitches together a price-time priority limit order book, an Avellaneda–Stoikov quoting agent
                  with inventory penalty and hard inventory caps, and a stochastic mid driven by a two-state Markov volatility regime.
                  Noise traders submit market orders via Poisson arrivals with fill intensity decaying with distance from the mid
                  (λ = A·e<sup>−kδ</sup>). The stack is built as a learning project and portfolio piece for quant-style roles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Model &amp; mechanics</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-200">Reservation price</strong> shifts the center of quotes away from the mid when inventory builds,
                    pulling the MM toward flat risk as horizon risk (σ, T − t) grows.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-200">Optimal spread</strong> balances inventory risk against fill probability via γ (risk aversion) and k (liquidity / intensity decay).
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-200">Regime switching</strong> flips volatility between low and high states with configurable transition probabilities.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-200">Adverse selection</strong> is tracked per fill using mid moves over a lookahead window, signed against the MM.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Architecture</h3>
                <p className="leading-relaxed mb-3">
                  A <strong className="text-slate-800 dark:text-slate-200">FastAPI</strong> backend runs the simulation as a background asyncio loop (~20 ticks/sec) and streams
                  JSON snapshots over <strong className="text-slate-800 dark:text-slate-200">WebSocket</strong>; REST endpoints expose parameters and reset.
                  The <strong className="text-slate-800 dark:text-slate-200">React + TypeScript</strong> frontend (Vite, Tailwind, Recharts) renders live LOB depth, mid and quotes, MtM and realised PnL,
                  inventory, rolling Sharpe, max drawdown, spread analytics, and a fill heatmap, with hot-swappable controls for γ, k, regime probabilities, and more.
                </p>
                <p className="leading-relaxed text-sm text-slate-500 dark:text-slate-500">
                  Backend modules include the LOB and matching engine, Poisson / regime flow, A–S agent, metrics, and pytest-backed tests;
                  Docker Compose runs frontend and backend together for local demos.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills demonstrated</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Implementing the canonical Avellaneda–Stoikov optimal market-making formulation in discrete time</li>
                  <li>Building a correct price-time priority limit order book and matching engine from scratch (Python)</li>
                  <li>Simulating Poisson order flow and a Markov regime-switching volatility process</li>
                  <li>Real-time client/server design with WebSockets and typed parameter surfaces (Pydantic on the API)</li>
                  <li>Quant-style dashboards: Sharpe, drawdown, inventory paths, and toxicity / adverse-selection metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key dashboard features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Live limit order book depth and mid with bid, ask, and reservation price overlays</li>
                  <li>PnL decomposition (mark-to-market vs realised) and inventory trajectory</li>
                  <li>Rolling Sharpe, maximum drawdown, and adverse-selection monitor</li>
                  <li>Fill heatmap by price offset and side; spread analytics (optimal vs realised)</li>
                  <li>Interactive parameter controls for risk aversion, liquidity, arrival rates, and regime dynamics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">References</h3>
                <p className="leading-relaxed text-sm">
                  Avellaneda &amp; Stoikov (2008), <em>Quantitative Finance</em>; Guéant, Lehalle &amp; Fernandez-Tapia (2013);
                  Cartea, Jaimungal &amp; Penalva (2015), <em>Algorithmic and High-Frequency Trading</em> (Cambridge). See the repo README for full citations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteChrome>
  )
}
