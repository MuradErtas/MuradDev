'use client'

import { useRef, useEffect } from 'react'

/* ── tunables ─────────────────────────────────────────────────── */
const DESKTOP_COLS = 40
const DESKTOP_ROWS = 28
const HORIZON = 0
const PERSPECTIVE = 1
const HEIGHT_SCALE = 0.1
const GRID_WIDTH = 3.6
const DEPTH_EXTEND = 1.16
const N_BUCKETS = 22
const MAX_RIPPLES = 6
const HIDE_BEFORE_GZ = 0.0

interface Ripple { gx: number; gz: number; t0: number; amp: number }
interface GridState {
  cols: number
  rows: number
  colsP1: number
  rowNorm: Float32Array
  colNorm: Float32Array
  rowWaveZ: Float32Array
  colWaveX: Float32Array
  heights: Float32Array
  screenX: Float32Array
  screenY: Float32Array
}

/* ── colour ramp: dark-blue → blue-purple → hot-pink ─────────── */
const RAMP = [
  { t: 0.00, r:   0, g: 140, b: 220 },
  { t: 0.30, r:  40, g:  60, b: 255 },
  { t: 0.55, r: 140, g:  30, b: 255 },
  { t: 0.78, r: 220, g:  20, b: 240 },
  { t: 1.00, r: 255, g:  20, b: 160 },
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

function getGridResolution(width: number): { cols: number; rows: number } {
  if (width < 640) return { cols: 30, rows: 22 }
  if (width < 1024) return { cols: 36, rows: 24 }
  return { cols: DESKTOP_COLS, rows: DESKTOP_ROWS }
}

function buildGridState(width: number): GridState {
  const { cols, rows } = getGridResolution(width)
  const colsP1 = cols + 1
  const rowsP1 = rows + 1
  const pointCount = colsP1 * rowsP1

  const colNorm = new Float32Array(colsP1)
  const rowNorm = new Float32Array(rowsP1)
  const colWaveX = new Float32Array(colsP1)
  const rowWaveZ = new Float32Array(rowsP1)

  for (let col = 0; col <= cols; col++) {
    const gx = col / cols
    colNorm[col] = gx
    colWaveX[col] = gx * Math.PI * 5
  }
  for (let row = 0; row <= rows; row++) {
    const gz = (row / rows) * DEPTH_EXTEND
    rowNorm[row] = gz
    rowWaveZ[row] = gz * Math.PI * 4
  }

  return {
    cols,
    rows,
    colsP1,
    rowNorm,
    colNorm,
    rowWaveZ,
    colWaveX,
    heights: new Float32Array(pointCount),
    screenX: new Float32Array(pointCount),
    screenY: new Float32Array(pointCount),
  }
}

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mouseGX = -1, mouseGZ = -1
    let raf: number
    const ripples: Ripple[] = []
    let nextRippleAt = 1.5
    const bucketSegments: number[][] = Array.from({ length: N_BUCKETS }, () => [])

    let grid = buildGridState(canvas.offsetWidth)
    let canvasRect = canvas.getBoundingClientRect()
    const updateCanvasRect = () => { canvasRect = canvas.getBoundingClientRect() }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      grid = buildGridState(canvas.width)
      updateCanvasRect()
    }

    // Invert perspective projection: screen (sx, sy) -> grid (gx, gz)
    const screenToGrid = (clientX: number, clientY: number): [number, number] => {
      const sx = clientX - canvasRect.left
      const sy = clientY - canvasRect.top
      const W = canvas.width, H = canvas.height
      const gz = Math.max(0, Math.min(1, (sy / H - HORIZON) / (1 - HORIZON)))
      const perspScale = 1 / (1 + (1 - gz) * PERSPECTIVE)
      const gx = 0.5 + (sx - W / 2) / (W * GRID_WIDTH * perspScale)
      return [gx, gz]
    }

    const onMouseMove = (e: MouseEvent) => { ;[mouseGX, mouseGZ] = screenToGrid(e.clientX, e.clientY) }
    const onMouseLeave = () => { mouseGX = -1 }

    const onClick = (e: MouseEvent) => {
      const rect = canvasRect
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return
      const [gx, gz] = screenToGrid(e.clientX, e.clientY)
      ripples.push({ gx, gz, t0: performance.now() * 0.001, amp: 0.4 })
      if (ripples.length > MAX_RIPPLES) ripples.shift()
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200) }

    const waveHeight = (col: number, row: number, t: number): number => {
      const x = grid.colWaveX[col]
      const z = grid.rowWaveZ[row]

      const h1 = Math.sin(x * 0.7 + t * 0.85) * Math.cos(z * 0.5 - t * 0.65) * 0.42
      const h2 = Math.cos(x * 0.45 - t * 0.55 + z * 0.35) * Math.sin(z * 0.75 + t * 0.5) * 0.30
      let h = h1 + h2

      for (const rip of ripples) {
        const dt = t - rip.t0
        if (dt < 0) continue
        const dx = grid.colNorm[col] - rip.gx
        const dz = grid.rowNorm[row] - rip.gz
        const dist = Math.sqrt(dx * dx + dz * dz)
        const front = dt * 0.55
        const delta = dist - front
        const decay = Math.exp(-dt * 0.9) * Math.exp(-delta * delta * 28)
        h += rip.amp * decay * Math.sin(delta * 22)
      }

      if (mouseGX >= 0) {
        const dmx = grid.colNorm[col] - mouseGX
        const dmz = grid.rowNorm[row] - mouseGZ
        h += 0.65 * Math.exp(-(dmx * dmx + dmz * dmz) / 0.018)
      }

      return h
    }

    const draw = () => {
      const W = canvas.width, H = canvas.height
      const t = performance.now() * 0.001

      const dark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = dark ? 'rgba(4, 1, 22, 0.82)' : 'rgba(235, 230, 255, 0.88)'
      ctx.fillRect(0, 0, W, H)

      if (t > nextRippleAt) {
        ripples.push({ gx: Math.random(), gz: Math.random(), t0: t, amp: 0.28 + Math.random() * 0.38 })
        if (ripples.length > MAX_RIPPLES) ripples.shift()
        nextRippleAt = t + 1.8 + Math.random() * 2.8
      }

      for (let b = 0; b < N_BUCKETS; b++) bucketSegments[b].length = 0

      const horizonY = H * HORIZON
      const centerX = W * 0.5
      const sxWorldScale = W * GRID_WIDTH
      const syHeightScale = H * HEIGHT_SCALE

      for (let row = 0; row <= grid.rows; row++) {
        const gz = grid.rowNorm[row]
        const perspScale = 1 / (1 + (1 - gz) * PERSPECTIVE)
        const syBase = horizonY + gz * (H - horizonY)
        const sxScale = sxWorldScale * perspScale
        const syWaveScale = perspScale * syHeightScale

        for (let col = 0; col <= grid.cols; col++) {
          const idx = row * grid.colsP1 + col
          const h = waveHeight(col, row, t)
          grid.heights[idx] = h
          grid.screenX[idx] = centerX + (grid.colNorm[col] - 0.5) * sxScale
          grid.screenY[idx] = syBase - h * syWaveScale
        }
      }

      const addSegment = (hAvg: number, sx1: number, sy1: number, sx2: number, sy2: number) => {
        const hn = Math.max(0, Math.min(1, (hAvg + 1) / 2))
        const bk = Math.min(N_BUCKETS - 1, Math.floor(hn * N_BUCKETS))
        bucketSegments[bk].push(sx1, sy1, sx2, sy2)
      }

      for (let row = 0; row <= grid.rows; row++) {
        const gz = grid.rowNorm[row]
        if (gz < HIDE_BEFORE_GZ) continue
        for (let col = 0; col < grid.cols; col++) {
          const i1 = row * grid.colsP1 + col
          const i2 = i1 + 1
          addSegment(
            (grid.heights[i1] + grid.heights[i2]) * 0.5,
            grid.screenX[i1], grid.screenY[i1],
            grid.screenX[i2], grid.screenY[i2]
          )
        }
      }

      for (let col = 0; col <= grid.cols; col++) {
        for (let row = 0; row < grid.rows; row++) {
          const gz1 = grid.rowNorm[row]
          if (gz1 < HIDE_BEFORE_GZ) continue
          const i1 = row * grid.colsP1 + col
          const i2 = i1 + grid.colsP1
          addSegment(
            (grid.heights[i1] + grid.heights[i2]) * 0.5,
            grid.screenX[i1], grid.screenY[i1],
            grid.screenX[i2], grid.screenY[i2]
          )
        }
      }

      ctx.lineWidth = 0.85
      for (let b = 0; b < N_BUCKETS; b++) {
        const segs = bucketSegments[b]
        if (!segs.length) continue
        const hn = b / (N_BUCKETS - 1)
        const [r, g, bv] = rampColor(hn)
        const alpha = 0.22 + hn * 0.72
        ctx.beginPath()
        for (let i = 0; i < segs.length; i += 4) {
          ctx.moveTo(segs[i], segs[i + 1])
          ctx.lineTo(segs[i + 2], segs[i + 3])
        }
        ctx.strokeStyle = `rgba(${r},${g},${bv},${alpha})`
        ctx.stroke()
      }

      const hGrad = ctx.createLinearGradient(0, H * HORIZON - 4, 0, H * HORIZON + 4)
      hGrad.addColorStop(0, 'rgba(180,40,255,0)')
      hGrad.addColorStop(0.5, 'rgba(200,60,255,0.55)')
      hGrad.addColorStop(1, 'rgba(180,40,255,0)')
      ctx.fillStyle = hGrad
      ctx.fillRect(0, H * HORIZON - 4, W, 8)

      const bgRGB = dark ? '4,1,22' : '235,230,255'

      // Hide occasional top edge artifacts near the horizon.
      const topFadeEnd = H * 0.08
      const topFade = ctx.createLinearGradient(0, 0, 0, topFadeEnd)
      topFade.addColorStop(0, `rgba(${bgRGB},1)`)
      topFade.addColorStop(1, `rgba(${bgRGB},0)`)
      ctx.fillStyle = topFade
      ctx.fillRect(0, 0, W, topFadeEnd)

      // Hide grid termination so the surface appears endless.
      const fadeStart = H * 0.64
      const bottomFade = ctx.createLinearGradient(0, fadeStart, 0, H)
      bottomFade.addColorStop(0, `rgba(${bgRGB},0)`)
      bottomFade.addColorStop(0.45, `rgba(${bgRGB},0.45)`)
      bottomFade.addColorStop(1, `rgba(${bgRGB},1)`)
      ctx.fillStyle = bottomFade
      ctx.fillRect(0, fadeStart, W, H - fadeStart)

      raf = requestAnimationFrame(draw)
    }

    resize(); draw()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', updateCanvasRect, { passive: true })

    return () => {
      cancelAnimationFrame(raf); clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', updateCanvasRect)
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
