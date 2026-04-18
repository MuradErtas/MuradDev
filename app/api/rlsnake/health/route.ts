import { NextRequest, NextResponse } from 'next/server'

const getRlsnakeApiUrl = () => {
  const url = process.env.RL_SNAKE_API || 'http://localhost:8000'
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

const RL_SNAKE_API_URL = getRlsnakeApiUrl()

export const maxDuration = 60

export async function GET(_request: NextRequest) {
  const base = RL_SNAKE_API_URL.replace(/\/+$/, '')

  const tryPing = async (path: string) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 50000)
    try {
      const response = await fetch(`${base}${path}`, {
        method: 'GET',
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (e: unknown) {
      clearTimeout(timeoutId)
      throw e
    }
  }

  try {
    let response = await tryPing('/health')
    if (response.status === 404) {
      response = await tryPing('/')
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          pythonApi: 'unreachable',
          error: `Python API returned ${response.status}`,
          url: RL_SNAKE_API_URL,
        },
        { status: 503 }
      )
    }

    const ct = response.headers.get('content-type') || ''
    const data = ct.includes('application/json')
      ? await response.json().catch(() => ({}))
      : { reachable: true }

    return NextResponse.json({
      status: 'healthy',
      pythonApi: 'reachable',
      pythonApiStatus: data,
      url: RL_SNAKE_API_URL,
    })
  } catch (fetchError: unknown) {
    const err = fetchError as { name?: string; message?: string }
    if (err.name === 'AbortError') {
      return NextResponse.json(
        {
          status: 'unhealthy',
          pythonApi: 'timeout',
          error: 'Health check timed out after 50 seconds',
          url: RL_SNAKE_API_URL,
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        status: 'unhealthy',
        pythonApi: 'unreachable',
        error: err.message || 'Connection failed',
        url: RL_SNAKE_API_URL,
      },
      { status: 503 }
    )
  }
}
