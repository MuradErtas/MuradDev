import { NextRequest, NextResponse } from 'next/server'

// Python API URL - set via environment variable
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()
    
    // Test connection to Python API
    const response = await fetch(`${PYTHON_API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000), // 5 second timeout for health check
    })
    
    const duration = Date.now() - startTime
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          status: 'unhealthy',
          pythonApi: 'unreachable',
          duration: `${duration}ms`,
          error: `Python API returned ${response.status}`
        },
        { status: 503 }
      )
    }
    
    const data = await response.json().catch(() => ({}))
    
    return NextResponse.json({
      status: 'healthy',
      pythonApi: 'reachable',
      duration: `${duration}ms`,
      pythonApiStatus: data
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        pythonApi: 'unreachable',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}
