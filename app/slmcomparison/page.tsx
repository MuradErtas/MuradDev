'use client'

import { useState, useRef, useEffect } from 'react'
import SiteChrome from '../components/SiteChrome'
import { BTN_GITHUB } from '../constants/projectButtons'

interface Message {
  id: string
  role: 'user' | 'transformer' | 'rnn'
  content: string
  timestamp: Date
}

export default function SLMComparisonPage() {
  const githubUrl = 'https://github.com/MuradErtas/SLM-Comparison--RNN-vs.-Transformer'
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const transformerEndRef = useRef<HTMLDivElement>(null)
  const rnnEndRef = useRef<HTMLDivElement>(null)
  const transformerScrollRef = useRef<HTMLDivElement>(null)
  const rnnScrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll both panels to bottom when new messages arrive
  useEffect(() => {
    // Scroll each panel to its bottom independently
    if (transformerScrollRef.current) {
      transformerScrollRef.current.scrollTop = transformerScrollRef.current.scrollHeight
    }
    if (rnnScrollRef.current) {
      rnnScrollRef.current.scrollTop = rnnScrollRef.current.scrollHeight
    }
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/slm/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate response')
      }

      const data = await response.json()

      const transformerMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'transformer',
        content: data.transformer || 'Error generating response',
        timestamp: new Date()
      }

      const rnnMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'rnn',
        content: data.rnn || 'Error generating response',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, transformerMessage, rnnMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'transformer',
        content: 'Error: Could not generate response. Please ensure the models are set up correctly.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    // Reset scroll positions for both panels
    setTimeout(() => {
      if (transformerScrollRef.current) {
        transformerScrollRef.current.scrollTop = 0
      }
      if (rnnScrollRef.current) {
        rnnScrollRef.current.scrollTop = 0
      }
    }, 0)
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
      <div className="flex flex-col">
      <div className="pt-32 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="project-page-h1">
            SLM Comparison
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
            Compare Transformer and RNN small language model responses side by side, trained on the same dataset (Shakespeare's plays) with the same hyperparameters. Built from scratch using PyTorch with a custom tokeniser, see GitHub repository for more details.
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
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pb-6">
        {/* Messages Area */}
        <div className="flex-1 grid md:grid-cols-2 gap-4 mb-4 overflow-y-auto">
          {/* Transformer Panel */}
          <div className="flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-xl">
              <h2 className="font-semibold text-green-700 dark:text-green-400">Transformer Model</h2>
            </div>
            <div ref={transformerScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] hide-scrollbar">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
                  <p>Send a message to see Transformer responses...</p>
                </div>
              ) : (
                messages
                  .filter(m => m.role === 'user' || m.role === 'transformer')
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </div>
                  ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={transformerEndRef} />
            </div>
          </div>

          {/* RNN Panel */}
          <div className="flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-t-xl">
              <h2 className="font-semibold text-orange-700 dark:text-orange-400">RNN Model (LSTM)</h2>
            </div>
            <div ref={rnnScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] hide-scrollbar">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
                  <p>Send a message to see RNN responses...</p>
                </div>
              ) : (
                messages
                  .filter(m => m.role === 'user' || m.role === 'rnn')
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </div>
                  ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={rnnEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 resize-none max-h-32 hide-scrollbar overflow-hidden"
              rows={1}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button
                onClick={clearChat}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Clear
              </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="project-section-h2">About This Project</h2>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-400">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Overview</h3>
                <p className="leading-relaxed">
                  This project compares two fundamental neural network architectures for language modeling: Transformers and RNNs (LSTM). 
                  Both models are trained from scratch on the same dataset (Shakespeare's plays) with identical hyperparameters, 
                  allowing for a fair comparison of their capabilities. The side-by-side interface lets you interact with both models 
                  simultaneously to observe their differences in text generation, coherence, and style.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">PyTorch:</strong> Deep learning framework for implementing Transformer and LSTM architectures</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Transformer Architecture:</strong> Attention-based model with multi-head self-attention and feed-forward layers</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">RNN/LSTM:</strong> Recurrent neural network with Long Short-Term Memory cells for sequence modeling</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Custom Tokenizer:</strong> Byte-pair encoding (BPE) implementation for text preprocessing</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">FastAPI:</strong> Python backend API for model inference and text generation</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Next.js & React:</strong> Frontend framework for interactive chat interface</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Docker & Railway:</strong> Containerization and cloud deployment for the ML API service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills Developed</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Neural network architecture implementation from scratch (Transformer and LSTM)</li>
                  <li>Natural language processing and language model training</li>
                  <li>Attention mechanism understanding and implementation</li>
                  <li>Custom tokenizer development using byte-pair encoding</li>
                  <li>Model training, validation, and hyperparameter optimization</li>
                  <li>Full-stack development with ML model integration</li>
                  <li>Asynchronous API design for handling concurrent inference requests</li>
                  <li>Production deployment of machine learning models</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Side-by-side comparison of Transformer and RNN model responses</li>
                  <li>Real-time text generation with both models simultaneously</li>
                  <li>Interactive chat interface for testing model capabilities</li>
                  <li>Models trained on Shakespeare's plays for consistent comparison</li>
                  <li>Responsive UI with independent scrolling panels and dark mode support</li>
                  <li>Production-ready deployment with proper error handling and timeouts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>
    </SiteChrome>
  )
}
