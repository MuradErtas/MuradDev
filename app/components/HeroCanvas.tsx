'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

const MAX_CONN_DIST   = 140
const MAX_CONN_DIST_2 = MAX_CONN_DIST * MAX_CONN_DIST  // avoid sqrt in hot loop
const MOUSE_RADIUS    = 160
const MAX_SPEED       = 1.2
const WIND_X_STRENGTH = 0.002
const WIND_Y_STRENGTH = 0.001
const GUST_STRENGTH   = 0.0001

// Particle count scales with viewport width
const baseParticleCount = () => {
  if (typeof window === 'undefined') return 80
  const w = window.innerWidth
  if (w < 480)  return 40
  if (w < 768)  return 55
  if (w < 1024) return 70
  return 90   // reduced from 120 — fewer particles, same feel, much less GPU work
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mouseX = -9999
    let mouseY = -9999
    let raf: number

    // Cache dark-mode flag — reading classList every frame is a DOM hit.
    // Re-check every 60 frames (~1 s) so theme switches still propagate.
    let dark = document.documentElement.classList.contains('dark')
    let darkCheckCounter = 0

    // Adaptive quality: track consecutive slow frames and shed particles.
    let lastFrameTime = performance.now()
    let slowStreak = 0

    const particles: Particle[] = []

    /* ── helpers ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const spawnParticles = () => {
      particles.length = 0
      const n = baseParticleCount()
      for (let i = 0; i < n; i++) {
        particles.push({
          x:    Math.random() * canvas.width,
          y:    Math.random() * canvas.height,
          vx:   (Math.random() - 0.5) * 0.45,
          vy:   (Math.random() - 0.5) * 0.45,
          size: Math.random() * 1.6 + 0.7,
        })
      }
    }

    /* ── event handlers ── */
    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        mouseX = x
        mouseY = y
      } else {
        mouseX = -9999
        mouseY = -9999
      }
    }
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999 }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => { resize() }, 200)
    }

    /* ── main draw loop ── */
    const draw = () => {
      const now = performance.now()
      const dt  = now - lastFrameTime
      lastFrameTime = now

      // Adaptive quality: if we're consistently below ~40 fps, shed 10% of
      // particles until things smooth out (floor: 25 particles).
      if (dt > 25) {
        if (++slowStreak > 8 && particles.length > 25) {
          particles.splice(0, Math.ceil(particles.length * 0.1))
          slowStreak = 0
        }
      } else {
        slowStreak = 0
      }

      // Re-read dark mode from DOM at ~1 fps cadence
      if (++darkCheckCounter >= 60) {
        dark = document.documentElement.classList.contains('dark')
        darkCheckCounter = 0
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = now * 0.001

      const dotRGBA  = dark ? '148,163,184' : '79,70,229'
      const lineRGBA = dark ? '148,163,184' : '79,70,229'
      const baseAlpha = dark ? 0.52 : 0.40

      /* ── update particle positions ── */
      for (const p of particles) {
        const windX = Math.sin(t * 0.45 + p.y * 0.02) * WIND_X_STRENGTH
        const windY = Math.cos(t * 0.35 + p.x * 0.015) * WIND_Y_STRENGTH
        p.vx += windX + Math.sin(t * 0.22) * GUST_STRENGTH
        p.vy += windY

        const dx   = mouseX - p.x
        const dy   = mouseY - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.018
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx *= 0.992
        p.vy *= 0.992

        const speed = Math.hypot(p.vx, p.vy)
        if (speed > MAX_SPEED) { p.vx = (p.vx / speed) * MAX_SPEED; p.vy = (p.vy / speed) * MAX_SPEED }

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10)                p.x = canvas.width  + 10
        if (p.x > canvas.width  + 10) p.x = -10
        if (p.y < -10)                p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10
      }

      /* ── connections — batched into 3 Path2D objects (3 stroke() calls total)
             instead of one ctx.stroke() per line (~thousands of calls).
             Lines are bucketed by distance into far / mid / close alpha groups. ── */
      const pathFar  = new Path2D()
      const pathMid  = new Path2D()
      const pathNear = new Path2D()

      for (let i = 0; i < particles.length; i++) {
        const ax = particles[i].x, ay = particles[i].y
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = ax - particles[j].x
          const dy2 = ay - particles[j].y
          const d2  = dx2 * dx2 + dy2 * dy2   // skip sqrt until we know we're in range
          if (d2 < MAX_CONN_DIST_2) {
            const ratio = d2 / MAX_CONN_DIST_2  // 0 = very close, 1 = at edge
            const path  = ratio < 0.11 ? pathNear : ratio < 0.44 ? pathMid : pathFar
            path.moveTo(ax, ay)
            path.lineTo(particles[j].x, particles[j].y)
          }
        }
      }

      ctx.lineWidth = 0.9
      ctx.strokeStyle = `rgba(${lineRGBA},0.10)`; ctx.stroke(pathFar)
      ctx.strokeStyle = `rgba(${lineRGBA},0.22)`; ctx.stroke(pathMid)
      ctx.strokeStyle = `rgba(${lineRGBA},0.38)`; ctx.stroke(pathNear)

      /* ── dots — two batched fill() calls (normal + mouse-brightened) ── */
      // Normal dots
      ctx.fillStyle = `rgba(${dotRGBA},${baseAlpha})`
      ctx.beginPath()
      for (const p of particles) {
        const dxm = mouseX - p.x, dym = mouseY - p.y
        if (dxm * dxm + dym * dym >= 100 * 100) {
          ctx.moveTo(p.x + p.size, p.y)
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        }
      }
      ctx.fill()

      // Brightened dots near cursor
      ctx.fillStyle = `rgba(${dotRGBA},${Math.min(baseAlpha + 0.45, 1)})`
      ctx.beginPath()
      for (const p of particles) {
        const dxm = mouseX - p.x, dym = mouseY - p.y
        if (dxm * dxm + dym * dym < 100 * 100) {
          ctx.moveTo(p.x + p.size, p.y)
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        }
      }
      ctx.fill()

      /* ── mouse glow ring ── */
      if (mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height) {
        const glowRGBA = dark ? '139,92,246' : '99,102,241'
        const grd = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 90)
        grd.addColorStop(0,   `rgba(${glowRGBA},${dark ? 0.13 : 0.09})`)
        grd.addColorStop(0.4, `rgba(${glowRGBA},${dark ? 0.05 : 0.03})`)
        grd.addColorStop(1,   `rgba(${glowRGBA},0)`)
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      raf = requestAnimationFrame(draw)
    }

    /* ── init ── */
    resize()
    spawnParticles()
    draw()

    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize',     onResize)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize',     onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
