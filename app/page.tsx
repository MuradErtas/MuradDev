'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import ThemeToggle from './components/ThemeToggle'
import WaveGrid    from './components/heroes/WaveGrid'
import { PORTFOLIO_NAV_ITEMS as NAV_ITEMS } from './constants/portfolioNav'

/* ── Data ─────────────────────────────────────── */

const ROLES = [
  'Developer',
  'AI / ML Enthusiast',
  'Problem Solver',
  'Builder',
  'CS Student',
]

const TECH_STACK = [
  { name: 'Python',               gradient: 'from-blue-500   to-cyan-500'    },
  { name: 'PyTorch',              gradient: 'from-orange-500 to-red-500'     },
  { name: 'TypeScript',           gradient: 'from-blue-600   to-blue-400'    },
  { name: 'Next.js',              gradient: 'from-slate-700  to-slate-500'   },
  { name: 'React',                gradient: 'from-cyan-500   to-blue-500'    },
  { name: 'Tailwind CSS',         gradient: 'from-teal-500   to-cyan-400'    },
  { name: 'Machine Learning',     gradient: 'from-purple-500 to-pink-500'    },
  { name: 'SQL',                  gradient: 'from-green-500  to-teal-500'    },
  { name: 'Reinforcement Learning', gradient: 'from-indigo-500 to-purple-500' },
  { name: 'Git',                  gradient: 'from-orange-600 to-orange-400'  },
  { name: 'Docker',               gradient: 'from-blue-400   to-blue-600'    },
  { name: 'Pandas',               gradient: 'from-violet-500 to-indigo-500'  },
]

const TIMELINE = [
  {
    period: '2025 – Present',
    role: 'Bachelor of Computer Science',
    org: 'University of Adelaide',
    tags: ['AI & Machine Learning', 'Deep Learning', 'Algorithms', 'Software Engineering'],
    desc: 'Studying Computer Science with a major in Artificial Intelligence and Machine Learning. Building a strong foundation across machine learning, deep learning, algorithms, and software engineering.',
    dotColor: 'from-blue-500 to-purple-500',
  },
  {
    period: '2025',
    role: 'Data Analytics Project',
    org: 'Quantium',
    tags: ['Python', 'Pandas', 'Dash', 'Data Visualisation'],
    desc: 'Transformed raw retail sales data into actionable insights, building interactive dashboards that surfaced customer purchasing trends and segment behaviour.',
    dotColor: 'from-orange-500 to-red-500',
  },
]

const FEATURED_PROJECTS = [
  {
    path: '/slmcomparison',
    gradient: 'from-blue-400 to-purple-500',
    glowClass: 'hover:shadow-purple-500/30 hover:border-purple-400/50',
    title: 'SLM Comparison',
    desc: 'Interactive comparison of Transformer and RNN language models. Chat with both models side-by-side to see their differences in real time.',
    tags: [
      { label: 'PyTorch',  color: 'bg-blue-100   dark:bg-blue-900/30   text-blue-700   dark:text-blue-300'   },
      { label: 'Next.js',  color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
      { label: 'AI / ML',  color: 'bg-green-100  dark:bg-green-900/30  text-green-700  dark:text-green-300'  },
    ],
  },
  {
    path: '/about',
    gradient: 'from-purple-400 to-pink-500',
    glowClass: 'hover:shadow-pink-500/30 hover:border-pink-400/50',
    title: 'Portfolio Website',
    desc: 'This site, a modern portfolio with animations, dark mode, and a contact form, built with Next.js, TypeScript, and Tailwind CSS.',
    tags: [
      { label: 'Next.js',  color: 'bg-blue-100   dark:bg-blue-900/30   text-blue-700   dark:text-blue-300'   },
      { label: 'TypeScript', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
      { label: 'Tailwind',   color: 'bg-green-100  dark:bg-green-900/30  text-green-700  dark:text-green-300'  },
    ],
  },
  {
    path: '/market-maker-sim',
    gradient: 'from-emerald-500 to-slate-700',
    glowClass: 'hover:shadow-emerald-500/30 hover:border-emerald-400/50',
    title: 'Market Maker Simulator',
    desc: 'Avellaneda–Stoikov optimal MM with LOB matching, regime-switching vol, Poisson noise flow, and a live WebSocket dashboard, FastAPI + React.',
    tags: [
      { label: 'FastAPI',    color: 'bg-blue-100   dark:bg-blue-900/30   text-blue-700   dark:text-blue-300'   },
      { label: 'TypeScript', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
      { label: 'Quant',      color: 'bg-green-100  dark:bg-green-900/30  text-green-700  dark:text-green-300'  },
    ],
  },
]

/* ── Component ─────────────────────────────────── */

export default function Home() {
  const router = useRouter()

  const [activeSection, setActiveSection] = useState('home')
  const [formData,      setFormData]      = useState({ name: '', email: '', message: '' })
  const [formStatus,    setFormStatus]    = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [roleIndex,     setRoleIndex]     = useState(0)
  const [roleVisible,   setRoleVisible]   = useState(true)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [photoError,    setPhotoError]    = useState(false)

  /* Rotating role */
  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => { setRoleIndex(i => (i + 1) % ROLES.length); setRoleVisible(true) }, 380)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* Active section tracking */
  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.id)
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 130) { setActiveSection(ids[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  /* ── Render ── */
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="orb orb-4" /><div className="orb orb-5" />
      </div>

      {/* ── Mobile fullscreen menu ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 transition-all duration-300
          bg-white/97 dark:bg-slate-950/97 backdrop-blur-md
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        {NAV_ITEMS.map(({ label, id }, i) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`text-3xl font-bold transition-all duration-300
              ${activeSection === id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}
              ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
            style={{ transitionDelay: menuOpen ? `${i * 0.055}s` : '0s' }}
          >
            {label}
          </button>
        ))}
        <div className={`mt-2 transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          style={{ transitionDelay: menuOpen ? `${NAV_ITEMS.length * 0.055}s` : '0s' }}>
          <ThemeToggle />
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            MuradDev
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative py-1 text-sm capitalize transition-colors duration-200 ${
                  activeSection === id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="nav-active-underline absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                )}
              </button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300"
            >
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative pt-36 pb-24 px-6 z-10 overflow-hidden">
        <WaveGrid />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">

          {/* Avatar */}
          <div className="animate-fade-down mb-8">
            <div className="avatar-ring p-[3px] rounded-full shadow-2xl shadow-blue-500/20">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white dark:bg-slate-900">
                {!photoError ? (
                  <img
                    src="/avatar.jpg"
                    alt="Murad Ertaskin"
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold select-none">M</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Frosted glass backdrop for text readability */}
          <div className="project-hero-glass">

          {/* Title */}
          <div className="animate-fade-down" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animated-gradient-text leading-tight">
              Welcome to My Portfolio
            </h1>
          </div>

          {/* Rotating role + blinking cursor */}
          <div className="animate-fade-up mb-3" style={{ animationDelay: '0.22s' }}>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 inline-flex items-center justify-center gap-2 mx-auto whitespace-nowrap">
              <span>{"I'm a"}</span>
              {/*
                No fixed slot width: each full phrase centers
                as one unit ("I'm a X|"), regardless of role length.
              */}
              <span
                className="font-semibold text-blue-600 dark:text-blue-400 transition-all duration-300"
                style={{
                  opacity: roleVisible ? 1 : 0,
                  transform: roleVisible ? 'translateY(0)' : 'translateY(-8px)',
                }}
              >
                {ROLES[roleIndex]}
              </span>
              <span className="cursor-blink text-blue-600 dark:text-blue-400" />
            </p>
          </div>

          <div className="animate-fade-up mb-10" style={{ animationDelay: '0.34s' }}>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400">
              University of Adelaide · Bachelor of Computer Science · AI &amp; Machine Learning
            </p>
          </div>

          {/* CTA buttons */}
          <div className="animate-fade-up flex flex-wrap gap-3 md:gap-4 justify-center" style={{ animationDelay: '0.46s' }}>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/abdullah-murad-ertaskin/', '_blank')}
              className="shimmer-btn px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105 transition-all inline-flex items-center gap-2 leading-none"
            >
              <svg className="w-5 h-5 shrink-0 -translate-y-0.5" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.18h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.98c0-1.9-.03-4.35-2.65-4.35-2.65 0-3.06 2.07-3.06 4.21V24h-4V8Z" />
              </svg>
              <span className="leading-none">LinkedIn</span>
            </button>
            <button
              onClick={() => window.open('https://github.com/MuradErtas', '_blank')}
              className="shimmer-btn px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold hover:scale-105 transition-all inline-flex items-center gap-2 leading-none"
            >
              <svg className="w-5 h-5 shrink-0 -translate-y-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.1-.74.08-.72.08-.72 1.2.08 1.83 1.24 1.83 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.01 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
              </svg>
              <span className="leading-none">GitHub</span>
            </button>
          </div>

          </div>{/* end frosted glass */}

          {/* Scroll hint */}
          <div className="mt-8">
            <button onClick={() => scrollToSection('about')} className="animate-chevron text-slate-400 hover:text-slate-500 transition-colors" aria-label="Scroll down">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 px-6 bg-white/95 dark:bg-slate-800/95 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center animate-on-scroll">About Me</h2>
          <div className="animate-on-scroll space-y-4" style={{ transitionDelay: '0.1s' }}>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              Hey! I am Abdullah Murad Ertaskin (preferred Murad). I&apos;m a passionate developer and programmer
              who loves building cool things, creating innovative solutions, and bringing ideas to life. I am
              currently a student at the University of Adelaide studying a Bachelor of Computer Science with a
              major in Artificial Intelligence and Machine Learning.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              When I&apos;m not coding you can find me exploring new technologies, reading books, working out,
              gaming, or working on personal projects that challenge me to grow.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              Thanks for checking out my portfolio!
            </p>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-3 text-center animate-on-scroll">Projects</h2>
          <p className="animate-on-scroll text-slate-500 dark:text-slate-400 text-center mb-12" style={{ transitionDelay: '0.08s' }}>
            A selection of things I&apos;ve built
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((project, i) => (
              <div
                key={project.title}
                onClick={() => router.push(project.path)}
                className={`animate-on-scroll project-card group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl ${project.glowClass} border border-slate-200 dark:border-slate-700 cursor-pointer`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className={`w-full h-44 bg-gradient-to-br ${project.gradient} rounded-lg mb-5 overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag.label} className={`px-3 py-1 ${tag.color} rounded-full text-xs font-medium`}>{tag.label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => router.push('/projects')}
            className="animate-on-scroll shimmer-btn px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105"
            style={{ transitionDelay: '0.4s' }}
          >
            See All Projects →
          </button>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section id="skills" className="py-20 px-6 bg-white/95 dark:bg-slate-800/95 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-3 text-center animate-on-scroll">Tech Stack</h2>
          <p className="animate-on-scroll text-slate-500 dark:text-slate-400 text-center mb-10" style={{ transitionDelay: '0.08s' }}>
            Tools &amp; technologies I work with
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {TECH_STACK.map((tech, i) => (
              <span
                key={tech.name}
                className="animate-on-scroll inline-block"
                style={{ transitionDelay: `${0.05 + i * 0.045}s` }}
              >
                <span
                  className={`tech-badge inline-block bg-gradient-to-r ${tech.gradient} text-white px-4 py-2 rounded-full font-medium text-sm shadow-md`}
                >
                  {tech.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section id="timeline" className="py-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-3 text-center animate-on-scroll">Experience &amp; Education</h2>
          <p className="animate-on-scroll text-slate-500 dark:text-slate-400 text-center mb-12" style={{ transitionDelay: '0.08s' }}>
            Where I&apos;ve been and what I&apos;ve done
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="timeline-line" />

            <div className="space-y-10 pl-10">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className="animate-on-scroll relative"
                  style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
                >
                  {/* Dot */}
                  <div className={`timeline-dot bg-gradient-to-br ${item.dotColor}`} />

                  {/* Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{item.role}</h3>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{item.org}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CV ── */}
      <section id="cv" className="py-20 px-6 bg-white/95 dark:bg-slate-800/95 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 animate-on-scroll">Resume / CV</h2>
          <p className="animate-on-scroll text-slate-700 dark:text-slate-300 mb-8 text-lg" style={{ transitionDelay: '0.1s' }}>
            Download my latest resume to learn more about my experience and skills.
          </p>
          <a
            href="/MuradErtaskinCV.pdf"
            download="MuradErtaskinCV.pdf"
            className="animate-on-scroll inline-block shimmer-btn px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105"
            style={{ transitionDelay: '0.2s' }}
          >
            ↓ Download CV (PDF)
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-3 text-center animate-on-scroll">Get In Touch</h2>
          <p className="animate-on-scroll text-slate-500 dark:text-slate-400 text-center mb-12" style={{ transitionDelay: '0.08s' }}>
            Have an opportunity or just want to say hi? Drop me a message.
          </p>
          <div className="animate-on-scroll bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700" style={{ transitionDelay: '0.18s' }}>
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => { setFormStatus('idle'); setFormData({ name: '', email: '', message: '' }) }}
                  className="shimmer-btn px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
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
                    const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
                    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
                    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'
                    await emailjs.send(serviceId, templateId, {
                      name: formData.name, email: formData.email, message: formData.message, title: 'Portfolio Contact Form',
                    }, publicKey)
                    setFormStatus('success')
                    setFormData({ name: '', email: '', message: '' })
                  } catch (err) {
                    console.error('EmailJS error:', err)
                    setFormStatus('error')
                  }
                }}
              >
                {formStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200 text-sm">Failed to send message. Please try again or contact me directly.</p>
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Name</label>
                  <input id="name" type="text" required value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    disabled={formStatus === 'loading'} placeholder="Your name"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-shadow" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email</label>
                  <input id="email" type="email" required value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    disabled={formStatus === 'loading'} placeholder="your.email@example.com"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-shadow" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Message</label>
                  <textarea id="message" rows={5} required value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    disabled={formStatus === 'loading'} placeholder="Your message…"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 resize-none transition-shadow" />
                </div>
                <button type="submit" disabled={formStatus === 'loading'}
                  className="shimmer-btn w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2">
                  {formStatus === 'loading' ? (
                    <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>Sending…</>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
