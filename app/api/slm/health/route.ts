import { NextRequest, NextResponse } from 'next/server'

// Python API URL - set via environment variable
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    try {
      const response = await fetch(`${PYTHON_API_URL}/health`, {
        method: 'GET',
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        return NextResponse.json(
          { 
            status: 'unhealthy',
            pythonApi: 'unreachable',
            error: `Python API returned ${response.status}`,
            url: PYTHON_API_URL
          },
          { status: 503 }
        )
      }
      
      const data = await response.json().catch(() => ({}))
      
      return NextResponse.json({
        status: 'healthy',
        pythonApi: 'reachable',
        pythonApiStatus: data,
        url: PYTHON_API_URL
      })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            status: 'unhealthy',
            pythonApi: 'timeout',
            error: 'Health check timed out after 10 seconds',
            url: PYTHON_API_URL
          },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { 
          status: 'unhealthy',
          pythonApi: 'unreachable',
          error: fetchError.message || 'Connection failed',
          url: PYTHON_API_URL
        },
        { status: 503 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        pythonApi: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        url: PYTHON_API_URL
      },
      { status: 503 }
    )
  }
}
