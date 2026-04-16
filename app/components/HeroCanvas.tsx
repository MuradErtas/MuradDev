'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

const PARTICLE_COUNT = 120
const MAX_CONN_DIST  = 160   // px — max distance to draw a line
const MOUSE_RADIUS   = 160   // px — mouse attraction radius
const MAX_SPEED      = 1.2
const WIND_X_STRENGTH = 0.002
const WIND_Y_STRENGTH = 0.001
const GUST_STRENGTH   = 0.0001

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

    const particles: Particle[] = []

    /* ── helpers ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const spawnParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
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
    const onPointerMove = (e: PointerEvent) => {
      // Ignore touch — on mobile a tap permanently locks particles to that
      // spot because there is no matching "leave" event when the finger lifts.
      if (e.pointerType === 'touch') return

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
    const onPointerLeaveWindow = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mouseX = -9999
      mouseY = -9999
    }

    const onResize = () => { resize(); spawnParticles() }

    /* ── main draw loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = performance.now() * 0.001

      const dark       = document.documentElement.classList.contains('dark')
      const baseAlpha  = dark ? 0.52 : 0.40
      const dotRGBA    = dark ? '148,163,184' : '79,70,229'   // slate-400 | indigo-600
      const lineRGBA   = dark ? '148,163,184' : '79,70,229'

      /* update */
      for (const p of particles) {
        // Smooth autonomous drift so the constellation feels alive.
        const windX = Math.sin(t * 0.45 + p.y * 0.02) * WIND_X_STRENGTH
        const windY = Math.cos(t * 0.35 + p.x * 0.015) * WIND_Y_STRENGTH
        const gust  = Math.sin(t * 0.22) * GUST_STRENGTH
        p.vx += windX + gust
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
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        p.x += p.vx
        p.y += p.vy

        /* wrap */
        if (p.x < -10)              p.x = canvas.width  + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10)              p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10
      }

      /* connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < MAX_CONN_DIST) {
            const alpha = (1 - dist / MAX_CONN_DIST) * 0.34
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${lineRGBA},${alpha})`
            ctx.lineWidth   = 0.9
            ctx.stroke()
          }
        }
      }

      /* dots */
      for (const p of particles) {
        const dxm   = mouseX - p.x
        const dym   = mouseY - p.y
        const mDist = Math.hypot(dxm, dym)
        const alpha = mDist < 100 ? baseAlpha + (1 - mDist / 100) * 0.50 : baseAlpha

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotRGBA},${alpha})`
        ctx.fill()
      }

      /* mouse glow ring — inside canvas only */
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

    window.addEventListener('pointermove',  onPointerMove)
    window.addEventListener('pointerleave', onPointerLeaveWindow)
    window.addEventListener('resize',     onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove',  onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeaveWindow)
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
