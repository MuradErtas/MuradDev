'use client'

import { useRef, useEffect } from 'react'

/* ── tunables ─────────────────────────────────────────────────── */
const COLS         = 48    // horizontal grid resolution
const ROWS         = 30    // depth grid resolution
const HORIZON      = 0  // horizon as fraction of canvas height
const PERSPECTIVE  = 1   // how strongly the grid converges (higher = more dramatic)
const HEIGHT_SCALE = 0.1  // how tall the waves appear (fraction of canvas height)
const GRID_WIDTH   = 3.6  // world-space width multiplier — makes the grid wider than
                            // the canvas so it fills the sides even at mid-depth
const N_BUCKETS    = 22    // colour buckets — trades smoothness for fewer draw calls
const MAX_RIPPLES  = 5

interface Ripple { gx: number; gz: number; t0: number; amp: number }

/* ── colour ramp: dark-blue → blue-purple → hot-pink ─────────── */
const RAMP = [
  { t: 0.00, r:   0, g: 140, b: 220 },  // cyan-blue
  { t: 0.30, r:  40, g:  60, b: 255 },  // blue
  { t: 0.55, r: 140, g:  30, b: 255 },  // violet
  { t: 0.78, r: 220, g:  20, b: 240 },  // purple-pink
  { t: 1.00, r: 255, g:  20, b: 160 },  // hot pink
]

function rampColor(hn: number): [number, number, number] {
  hn = Math.max(0, Math.min(1, hn))
  let i = 0
  while (i < RAMP.length - 2 && RAMP[i + 1].t <= hn) i++
  const a = RAMP[i], b = RAMP[i + 1]
  const t = (hn - a.t) / (b.t - a.t)
  return [
    Math.round(a.r + t * (b.r - a.r)),
    Math.round(a.g + t * (b.g - a.g)),
    Math.round(a.b + t * (b.b - a.b)),
  ]
}

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mouseGX = -1, mouseGZ = -1   // grid-space mouse position (0-1)
    let raf: number
    const ripples: Ripple[] = []
    let nextRippleAt = 1.5

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / canvas.width
      const my = (e.clientY - rect.top)  / canvas.height

      // Approximate inverse-perspective mapping from screen → grid space
      // gz=0 far (horizon), gz=1 near (bottom)
      const horizonFrac = HORIZON
      mouseGX = mx
      mouseGZ = Math.max(0, Math.min(1, (my - horizonFrac) / (1 - horizonFrac)))
    }
    const onMouseLeave = () => { mouseGX = -1 }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200) }

    /* ── project grid → screen ───────────────────────────────── */
    const project = (gx: number, gz: number, gy: number): [number, number] => {
      const W = canvas.width, H = canvas.height
      // gz=0 is far (near horizon), gz=1 is near (bottom of canvas)
      const perspScale = 1 / (1 + (1 - gz) * PERSPECTIVE)
      const horizonY   = H * HORIZON
      const sy_base    = horizonY + gz * (H - horizonY)
      const sx         = W / 2 + (gx - 0.5) * W * GRID_WIDTH * perspScale
      const sy         = sy_base - gy * perspScale * H * HEIGHT_SCALE
      return [sx, sy]
    }

    /* ── wave height at grid cell (col, row) at time t ────────── */
    const waveHeight = (col: number, row: number, t: number): number => {
      const x = (col / COLS) * Math.PI * 5
      const z = (row / ROWS) * Math.PI * 4

      // Two overlapping traveling waves
      const h1 = Math.sin(x * 0.7 + t * 0.85) * Math.cos(z * 0.5 - t * 0.65) * 0.42
      const h2 = Math.cos(x * 0.45 - t * 0.55 + z * 0.35) * Math.sin(z * 0.75 + t * 0.5) * 0.30

      let h = h1 + h2   // approx -0.72 … 0.72

      // Ripple contributions
      for (const rip of ripples) {
        const dt = t - rip.t0
        if (dt < 0) continue
        const dx = (col / COLS) - rip.gx
        const dz = (row / ROWS) - rip.gz
        const dist    = Math.sqrt(dx * dx + dz * dz)
        const front   = dt * 0.55               // wavefront radius
        const delta   = dist - front            // signed dist from wavefront
        const decay   = Math.exp(-dt * 0.9) * Math.exp(-delta * delta * 28)
        h += rip.amp * decay * Math.sin(delta * 22)
      }

      // Mouse Gaussian bump
      if (mouseGX >= 0) {
        const dmx = (col / COLS) - mouseGX
        const dmz = (row / ROWS) - mouseGZ
        h += 0.65 * Math.exp(-(dmx * dmx + dmz * dmz) / 0.018)
      }

      return h
    }

    /* ── main loop ───────────────────────────────────────────── */
    const draw = () => {
      const W = canvas.width, H = canvas.height
      const t = performance.now() * 0.001

      // Background — adapts to dark / light mode
      const dark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = dark ? 'rgba(4, 1, 22, 0.82)' : 'rgba(235, 230, 255, 0.88)'
      ctx.fillRect(0, 0, W, H)

      // Spawn random ripples
      if (t > nextRippleAt) {
        ripples.push({ gx: Math.random(), gz: Math.random(), t0: t, amp: 0.28 + Math.random() * 0.38 })
        if (ripples.length > MAX_RIPPLES) ripples.shift()
        nextRippleAt = t + 1.8 + Math.random() * 2.8
      }

      // Pre-compute all heights (avoids redundant recalculation per segment)
      const H2D: number[][] = Array.from({ length: ROWS + 1 }, (_, row) =>
        Array.from({ length: COLS + 1 }, (_, col) => waveHeight(col, row, t))
      )

      // Build Path2D colour buckets (avoids thousands of individual stroke() calls)
      const buckets = Array.from({ length: N_BUCKETS }, () => new Path2D())

      const addSegment = (h_avg: number, sx1: number, sy1: number, sx2: number, sy2: number) => {
        // Map height -1…1 to 0…1
        const hn  = Math.max(0, Math.min(1, (h_avg + 1) / 2))
        const bk  = Math.min(N_BUCKETS - 1, Math.floor(hn * N_BUCKETS))
        buckets[bk].moveTo(sx1, sy1)
        buckets[bk].lineTo(sx2, sy2)
      }

      // Horizontal rows — draw far→near so near rows paint over far rows
      for (let row = 0; row <= ROWS; row++) {
        const gz = row / ROWS
        // Skip the very far rows that would be above/at the horizon (just clutter)
        if (gz < 0.05) continue

        for (let col = 0; col < COLS; col++) {
          const h1 = H2D[row][col], h2 = H2D[row][col + 1]
          const [sx1, sy1] = project(col / COLS,       gz, h1)
          const [sx2, sy2] = project((col + 1) / COLS, gz, h2)
          addSegment((h1 + h2) * 0.5, sx1, sy1, sx2, sy2)
        }
      }

      // Vertical columns (depth lines)
      for (let col = 0; col <= COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const gz1 = row / ROWS, gz2 = (row + 1) / ROWS
          if (gz1 < 0.05) continue
          const h1 = H2D[row][col], h2 = H2D[row + 1][col]
          const [sx1, sy1] = project(col / COLS, gz1, h1)
          const [sx2, sy2] = project(col / COLS, gz2, h2)
          addSegment((h1 + h2) * 0.5, sx1, sy1, sx2, sy2)
        }
      }

      // Render all buckets in a single pass (N_BUCKETS stroke() calls total)
      ctx.lineWidth = 0.85
      for (let b = 0; b < N_BUCKETS; b++) {
        const hn = b / (N_BUCKETS - 1)
        const [r, g, bv] = rampColor(hn)
        // Lines near peaks are fully opaque; base lines are more transparent
        const alpha = 0.22 + hn * 0.72
        ctx.strokeStyle = `rgba(${r},${g},${bv},${alpha})`
        ctx.stroke(buckets[b])
      }

      // Subtle horizon glow
      const hGrad = ctx.createLinearGradient(0, H * HORIZON - 4, 0, H * HORIZON + 4)
      hGrad.addColorStop(0, 'rgba(180,40,255,0)')
      hGrad.addColorStop(0.5, 'rgba(200,60,255,0.55)')
      hGrad.addColorStop(1, 'rgba(180,40,255,0)')
      ctx.fillStyle = hGrad
      ctx.fillRect(0, H * HORIZON - 4, W, 8)

      // Bottom fade — smoothly hides where grid lines terminate
      const bgRGB = dark ? '4,1,22' : '235,230,255'
      const fadeStart = H * 0.70
      const fadeGrad = ctx.createLinearGradient(0, fadeStart, 0, H)
      fadeGrad.addColorStop(0, `rgba(${bgRGB},0)`)
      fadeGrad.addColorStop(1, `rgba(${bgRGB},1)`)
      ctx.fillStyle = fadeGrad
      ctx.fillRect(0, fadeStart, W, H - fadeStart)

      raf = requestAnimationFrame(draw)
    }

    resize(); draw()
    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize',     onResize)

    return () => {
      cancelAnimationFrame(raf); clearTimeout(resizeTimer)
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