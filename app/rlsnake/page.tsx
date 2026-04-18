'use client'

import { useState, useRef, useEffect } from 'react'
import SiteChrome from '../components/SiteChrome'
import { BTN_GITHUB, BTN_CONTROL_BLUE, BTN_CONTROL_RED, BTN_CONTROL_PURPLE, BTN_OPEN_EXTERNAL } from '../constants/projectButtons'

interface GameState {
  score: number
  gameOver: boolean
  moves: number
  snake: [number, number][]
  food: [number, number]
  sessionId: string | null
}

type ModelLevel = 'untrained' | 'beginner' | 'intermediate' | 'advanced'

export default function RLSnakePage() {
  const githubUrl = 'https://github.com/MuradErtas/RLSnake'
  const [selectedModel, setSelectedModel] = useState<ModelLevel | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wakeLoading, setWakeLoading] = useState(false)
  const [wakeBanner, setWakeBanner] = useState<string | null>(null)
  const [apiReady, setApiReady] = useState(false)
  const [apiCheckDone, setApiCheckDone] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    gameOver: false,
    moves: 0,
    snake: [],
    food: [0, 0],
    sessionId: null
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const models = [
    { 
      id: 'untrained' as ModelLevel, 
      name: 'Untrained', 
      description: 'Random actions, no training',
      color: 'red',
      trainingEpisodes: 0
    },
    { 
      id: 'beginner' as ModelLevel, 
      name: 'Beginner', 
      description: 'Basic training (~50 episodes)',
      color: 'orange',
      trainingEpisodes: 50
    },
    { 
      id: 'intermediate' as ModelLevel, 
      name: 'Intermediate', 
      description: 'Moderate training (~250 episodes)',
      color: 'yellow',
      trainingEpisodes: 250
    },
    { 
      id: 'advanced' as ModelLevel, 
      name: 'Advanced', 
      description: 'Extensive training (~1000 episodes)',
      color: 'green',
      trainingEpisodes: 1000
    }
  ]

  // Game constants
  const GRID_SIZE = 20
  const CELL_SIZE = 20
  const GAME_SPEED = 150 // ms per move

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const r = await fetch(`/api/rlsnake/health?ts=${Date.now()}`, { cache: 'no-store' })
        if (!cancelled && r.ok) setApiReady(true)
      } catch {
        /* cold / offline */
      } finally {
        if (!cancelled) setApiCheckDone(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const wakeServers = async () => {
    if (wakeLoading || isPlaying) return
    setWakeLoading(true)
    setWakeBanner('Waking RL Snake API (first attempt can take up to ~50s if the host was asleep)…')
    const maxPasses = 3
    try {
      for (let pass = 0; pass < maxPasses; pass++) {
        try {
          const res = await fetch(`/api/rlsnake/health?ts=${Date.now()}`, { cache: 'no-store' })
          if (res.ok) {
            setApiReady(true)
            setWakeBanner('API is awake — you can pick a model and play.')
            setTimeout(() => setWakeBanner(null), 6000)
            return
          }
        } catch {
          /* retry */
        }
        if (pass < maxPasses - 1) {
          setWakeBanner('Still waiting… retrying in a few seconds.')
          await new Promise(r => setTimeout(r, 3500))
        }
      }
      setWakeBanner('API not responding yet. Wait a minute and tap Wake API again.')
    } finally {
      setWakeLoading(false)
    }
  }

  useEffect(() => {
    if (isPlaying && selectedModel && canvasRef.current && gameState.sessionId) {
      startGameLoop()
    } else {
      stopGameLoop()
    }
    return () => {
      stopGameLoop()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, selectedModel, gameState.sessionId])

  useEffect(() => {
    // Redraw canvas whenever game state changes
    if (canvasRef.current && gameState.snake.length > 0) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        drawGame(ctx, canvas)
      }
    }
  }, [gameState])

  const startGameLoop = () => {
    if (gameIntervalRef.current) return
    
    gameIntervalRef.current = setInterval(async () => {
      if (!gameState.sessionId || gameState.gameOver) {
        stopGameLoop()
        return
      }

      try {
        const response = await fetch('/api/rlsnake/step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: gameState.sessionId }),
        })

        if (!response.ok) {
          throw new Error('Failed to step game')
        }

        const data = await response.json()
        setGameState({
          score: data.score,
          gameOver: data.game_over,
          moves: data.moves,
          snake: data.snake,
          food: data.food,
          sessionId: gameState.sessionId
        })
      } catch (error) {
        console.error('Error stepping game:', error)
        stopGameLoop()
      }
    }, GAME_SPEED)
  }

  const stopGameLoop = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current)
      gameIntervalRef.current = null
    }
  }

  const drawGame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Clear canvas
    ctx.fillStyle = '#1e293b' // slate-800
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#334155' // slate-700
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(canvas.width, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw food
    if (gameState.food && gameState.food.length === 2) {
      ctx.fillStyle = '#ef4444' // red-500
      ctx.fillRect(
        gameState.food[0] * CELL_SIZE + 2,
        gameState.food[1] * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
      )
    }

    // Draw snake
    if (gameState.snake && gameState.snake.length > 0) {
      gameState.snake.forEach((segment, index) => {
        if (segment && segment.length === 2) {
          // Head is brighter green
          if (index === 0) {
            ctx.fillStyle = '#22c55e' // green-500
          } else {
            ctx.fillStyle = '#16a34a' // green-600
          }
          ctx.fillRect(
            segment[0] * CELL_SIZE + 2,
            segment[1] * CELL_SIZE + 2,
            CELL_SIZE - 4,
            CELL_SIZE - 4
          )
        }
      })
    }
  }

  const handleStart = async () => {
    if (!selectedModel || !apiReady) return

    try {
      const response = await fetch('/api/rlsnake/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model_level: selectedModel }),
      })

      if (!response.ok) {
        throw new Error('Failed to start game')
      }

      const data = await response.json()
      setGameState({
        score: data.score,
        gameOver: data.game_over,
        moves: data.moves,
        snake: data.snake,
        food: data.food,
        sessionId: data.session_id
      })
      setIsPlaying(true)
      setApiReady(true)
    } catch (error) {
      console.error('Error starting game:', error)
      alert('Failed to start game. Make sure the API server is running.')
    }
  }

  const handleStop = () => {
    setIsPlaying(false)
    stopGameLoop()
  }

  const handleReset = async () => {
    if (!apiReady) return
    handleStop()

    if (gameState.sessionId) {
      try {
        const response = await fetch('/api/rlsnake/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: gameState.sessionId }),
        })

        if (response.ok) {
          const data = await response.json()
          setGameState({
            score: data.score,
            gameOver: data.game_over,
            moves: data.moves,
            snake: data.snake,
            food: data.food,
            sessionId: gameState.sessionId
          })
        }
      } catch (error) {
        console.error('Error resetting game:', error)
        // Fallback: just reset local state
        setGameState({ score: 0, gameOver: false, moves: 0, snake: [], food: [0, 0], sessionId: null })
      }
    } else {
      setGameState({ score: 0, gameOver: false, moves: 0, snake: [], food: [0, 0], sessionId: null })
    }
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
      <div className="flex flex-col max-w-7xl mx-auto w-full px-6 pt-32 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="project-page-h1">
            RL Snake
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Watch reinforcement learning models play Snake! Select a model to see how training improves gameplay. 
            Models are trained using Deep Q-Learning (DQN) with PyTorch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
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
            <button
              type="button"
              onClick={wakeServers}
              disabled={wakeLoading || isPlaying}
              className={`${BTN_OPEN_EXTERNAL} disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:scale-100`}
              title="Pings the Python API until it responds — use when the host has been idle"
            >
              <svg className="w-5 h-5 shrink-0 -translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="relative z-10 leading-none">{wakeLoading ? 'Waking…' : 'Wake API'}</span>
            </button>
          </div>
        </div>

        {/* Model Selection */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {models.map((model) => {
              const isSelected = selectedModel === model.id
              const cardBase =
                'group relative w-full text-left rounded-xl border-2 p-4 overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md'
              const selectedByColor = {
                red: 'border-red-500 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/45 dark:via-slate-900 dark:to-rose-950/25 shadow-lg shadow-red-500/15 ring-2 ring-red-400/35 dark:ring-red-500/30',
                orange:
                  'border-orange-500 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-orange-950/45 dark:via-slate-900 dark:to-amber-950/25 shadow-lg shadow-orange-500/15 ring-2 ring-orange-400/35 dark:ring-orange-500/30',
                yellow:
                  'border-yellow-500 bg-gradient-to-br from-yellow-50 via-white to-amber-50/90 dark:from-yellow-950/35 dark:via-slate-900 dark:to-amber-950/20 shadow-lg shadow-yellow-500/15 ring-2 ring-yellow-400/40 dark:ring-yellow-500/25',
                green:
                  'border-green-500 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/45 dark:via-slate-900 dark:to-emerald-950/25 shadow-lg shadow-green-500/15 ring-2 ring-green-400/35 dark:ring-green-500/30'
              }
              const idleByColor = {
                red: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-red-300 dark:hover:border-red-800/60',
                orange:
                  'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-300 dark:hover:border-orange-800/60',
                yellow:
                  'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-yellow-300 dark:hover:border-yellow-800/50',
                green:
                  'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-green-300 dark:hover:border-green-800/60'
              }
              const c = model.color as keyof typeof selectedByColor

              return (
                <button
                  key={model.id}
                  type="button"
                  disabled={!apiReady}
                  onClick={() => {
                    if (!apiReady) return
                    setSelectedModel(model.id)
                    handleReset()
                  }}
                  className={`${cardBase} ${isSelected ? selectedByColor[c] : idleByColor[c]} disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md`}
                >
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-slate-900 dark:group-hover:text-slate-50">
                      {model.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{model.description}</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-500 tabular-nums">
                      {model.trainingEpisodes.toLocaleString()} episodes
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-4">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="border border-slate-300 dark:border-slate-600 rounded-lg"
            />
          </div>

          {/* Game Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 mb-4 w-full max-w-md">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Score</p>
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{gameState.score}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Moves</p>
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{gameState.moves}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                  {gameState.gameOver ? 'Game Over' : isPlaying ? 'Playing' : 'Ready'}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={handleStart}
              disabled={!selectedModel || isPlaying || !apiReady}
              className={BTN_CONTROL_BLUE}
            >
              <span className="relative z-10 leading-none">Start</span>
            </button>
            <button
              type="button"
              onClick={handleStop}
              disabled={!isPlaying}
              className={BTN_CONTROL_RED}
            >
              <span className="relative z-10 leading-none">Stop</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={!selectedModel || !apiReady}
              className={BTN_CONTROL_PURPLE}
            >
              <span className="relative z-10 leading-none">Reset</span>
            </button>
          </div>
          {wakeBanner && (
            <p className="mt-4 max-w-xl mx-auto text-center text-sm text-slate-600 dark:text-slate-400" role="status">
              {wakeBanner}
            </p>
          )}
          {!apiReady && apiCheckDone && !wakeBanner && (
            <p className="mt-4 max-w-xl mx-auto text-center text-sm text-slate-500 dark:text-slate-500">
              Model selection and play are disabled until the API responds. Use <span className="font-medium text-slate-700 dark:text-slate-300">Wake API</span> above if the host was asleep.
            </p>
          )}
        </div>

        {/* About Section */}
        <div className="mt-12 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="project-section-h2">About This Project</h2>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-400">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Overview</h3>
                <p className="leading-relaxed">
                  This project demonstrates reinforcement learning in action by training Deep Q-Network (DQN) agents to play Snake. 
                  The agents learn through trial and error, gradually improving their gameplay as they accumulate training experience. 
                  You can compare models at different training stages to see how reinforcement learning algorithms develop strategic 
                  decision-making capabilities over time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">PyTorch:</strong> Deep learning framework for implementing and training the DQN neural network</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Deep Q-Learning (DQN):</strong> Reinforcement learning algorithm that uses a neural network to approximate Q-values</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">FastAPI:</strong> Python backend API for running game logic and model inference</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Next.js & React:</strong> Frontend framework for interactive UI and real-time game visualization</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Canvas API:</strong> HTML5 Canvas for rendering the game grid and snake visualization</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Docker & Railway:</strong> Containerization and cloud deployment for the Python API service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills Developed</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Reinforcement learning algorithm implementation and hyperparameter tuning</li>
                  <li>Neural network architecture design for Q-value approximation</li>
                  <li>Game state representation and reward function engineering</li>
                  <li>Full-stack development with separated frontend/backend architecture</li>
                  <li>RESTful API design for real-time game state management</li>
                  <li>Asynchronous programming and concurrent request handling</li>
                  <li>Model deployment and serving in production environments</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Interactive visualization of AI agents playing Snake in real-time</li>
                  <li>Comparison of models at different training stages (untrained to advanced)</li>
                  <li>Session-based game state management for multiple concurrent games</li>
                  <li>Responsive UI with dark mode support</li>
                  <li>Production-ready deployment with proper error handling and timeouts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteChrome>
  )
}

