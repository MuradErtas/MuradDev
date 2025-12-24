'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState<ModelLevel | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
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
    if (!selectedModel) return
    
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
            RL Snake
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Watch reinforcement learning models play Snake! Select a model to see how training improves gameplay. 
            Models are trained using Deep Q-Learning (DQN) with PyTorch.
          </p>
        </div>

        {/* Model Selection */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Select Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {models.map((model) => {
              const isSelected = selectedModel === model.id
              const colorClasses = {
                red: isSelected 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600',
                orange: isSelected 
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600',
                yellow: isSelected 
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600',
                green: isSelected 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
              }
              
              return (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id)
                    handleReset()
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${colorClasses[model.color as keyof typeof colorClasses]}`}
                >
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mb-1">{model.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{model.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
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
          <div className="flex gap-4">
            <button
              onClick={handleStart}
              disabled={!selectedModel || isPlaying}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Start
            </button>
            <button
              onClick={handleStop}
              disabled={!isPlaying}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Stop
            </button>
            <button
              onClick={handleReset}
              disabled={!selectedModel}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-slate-700 dark:text-slate-300">About This Project</h2>
            
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

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p> <a href="https://github.com/MuradErtas/RLSnake" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">GitHub</a> repository for this project.
        </div>
      </footer>
    </div>
  )
}

