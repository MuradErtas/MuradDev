'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Home() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MuradDev
            </div>
            <div className="hidden md:flex gap-6">
              {['Home', 'About', 'Projects', 'CV', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`capitalize hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                    activeSection === item ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Developer • Student • Creator • Problem Solver
          </p>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            <button
              onClick={() => window.open('https://www.linkedin.com/in/abdullah-murad-ertaskin/', '_blank')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              LinkedIn
            </button>
            <button
              onClick={() => window.open('https://github.com/MuradErtas', '_blank')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              GitHub
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Hey! I am Abdullah Murad Ertaskin (preferred Murad). I'm a passionate developer and programmer who loves building cool things, creating innovative solutions, and bringing ideas to life. I am currently a student at the University of Adelaide where I am studying a Bachelor of Information Technology with a major in Artificial Intelligence and Machine Learning.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
              When I'm not coding, you can find me exploring new technologies, reading books, working out, gaming,
              or working on personal projects that challenge me to grow.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
            Thanks for checking out my portfolio!
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => router.push('/slmcomparison')}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-105"
            >
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">SLM Comparison</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Interactive comparison of Transformer and RNN language models. Chat with both models side by side to see their differences.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  PyTorch
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                  AI/ML
                </span>
              </div>
            </div>
            <div
              onClick={() => router.push('/about')}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-105"
            >
              <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Fully functional website with a modern design and a responsive layout, built with Next.js, TypeScript, and Tailwind CSS.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                  Tailwind
                </span>
              </div>
            </div>
            <div
              onClick={() => router.push('/rlsnake')}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-105"
            >
              <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">RL Snake</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Watch reinforcement learning models play Snake! Compare 4 models with different training levels.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  PyTorch
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                  RL/DQN
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                  AI/ML
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => router.push('/projects')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              See All
            </button>
        </div>
      </section>

      {/* CV Section */}
      <section id="cv" className="py-20 px-6 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Resume / CV</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg">
            Download my latest resume to learn more about my experience and skills.
          </p>
          <a
            href="/MuradErtaskinCV.pdf"
            download="MuradErtaskinCV.pdf"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
          >
            Download CV (PDF)
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => {
                    setFormStatus('idle')
                    setFormData({ name: '', email: '', message: '' })
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setFormStatus('loading')
                  
                  try {
                    // Initialize EmailJS with your public key
                    // Replace these with your EmailJS credentials
                    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
                    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
                    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
                    
                    await emailjs.send(
                      serviceId,
                      templateId,
                      {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        title: 'Portfolio Contact Form', // For the subject line {{title}}
                      },
                      publicKey
                    )
                    
                    setFormStatus('success')
                    setFormData({ name: '', email: '', message: '' })
                  } catch (error) {
                    console.error('EmailJS error:', error)
                    setFormStatus('error')
                  }
                }}
              >
                {formStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      Failed to send message. Please try again or contact me directly via email.
                    </p>
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    placeholder="Your name"
                    disabled={formStatus === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    placeholder="your.email@example.com"
                    disabled={formStatus === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 resize-none"
                    placeholder="Your message..."
                    disabled={formStatus === 'loading'}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

