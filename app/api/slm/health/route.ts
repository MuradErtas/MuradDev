import { NextRequest, NextResponse } from 'next/server'

// Python API URL - set via environment variable
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()
    
    console.log(`Health check: Testing connection to ${PYTHON_API_URL}/health`)
    
    // Test connection to Python API with longer timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
    
    try {
      const response = await fetch(`${PYTHON_API_URL}/health`, {
        method: 'GET',
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      const duration = Date.now() - startTime
      
      if (!response.ok) {
        return NextResponse.json(
          { 
            status: 'unhealthy',
            pythonApi: 'unreachable',
            duration: `${duration}ms`,
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
        duration: `${duration}ms`,
        pythonApiStatus: data,
        url: PYTHON_API_URL
      })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      const duration = Date.now() - startTime
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            status: 'unhealthy',
            pythonApi: 'timeout',
            duration: `${duration}ms`,
            error: 'Health check timed out after 15 seconds',
            url: PYTHON_API_URL
          },
          { status: 503 }
        )
      }
      
      // Connection refused or other network errors
      return NextResponse.json(
        { 
          status: 'unhealthy',
          pythonApi: 'unreachable',
          duration: `${duration}ms`,
          error: fetchError.message || 'Connection failed',
          errorCode: fetchError.code,
          url: PYTHON_API_URL,
          hint: process.env.PYTHON_API_URL ? 'Check Railway service is running' : 'Start Python API locally: cd SLM && python api_server.py'
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
