import { NextRequest, NextResponse } from 'next/server'

// Python API URL - set via environment variable
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const diagnostics: any = {
    url: PYTHON_API_URL,
    tests: []
  }
  
  try {
    console.log(`Health check: Testing ${PYTHON_API_URL}`)
    
    // Test 1: Try root endpoint (fastest check)
    const rootController = new AbortController()
    const rootTimeout = setTimeout(() => rootController.abort(), 5000)
    
    try {
      const rootResponse = await fetch(`${PYTHON_API_URL}/`, {
        method: 'GET',
        signal: rootController.signal,
      })
      clearTimeout(rootTimeout)
      const rootDuration = Date.now() - startTime
      
      diagnostics.tests.push({
        endpoint: '/',
        status: rootResponse.status,
        duration: `${rootDuration}ms`,
        working: rootResponse.ok
      })
      
      if (rootResponse.ok) {
        const rootData = await rootResponse.json().catch(() => ({}))
        
        // Test 2: Try health endpoint if root works
        const healthController = new AbortController()
        const healthTimeout = setTimeout(() => healthController.abort(), 5000)
        
        try {
          const healthResponse = await fetch(`${PYTHON_API_URL}/health`, {
            method: 'GET',
            signal: healthController.signal,
          })
          clearTimeout(healthTimeout)
          const healthDuration = Date.now() - startTime
          
          diagnostics.tests.push({
            endpoint: '/health',
            status: healthResponse.status,
            duration: `${healthDuration}ms`,
            working: healthResponse.ok
          })
          
          if (healthResponse.ok) {
            const healthData = await healthResponse.json().catch(() => ({}))
            return NextResponse.json({
              status: 'healthy',
              pythonApi: 'fully_operational',
              duration: `${Date.now() - startTime}ms`,
              pythonApiStatus: healthData,
              diagnostics
            })
          }
        } catch (healthError: any) {
          clearTimeout(healthTimeout)
          diagnostics.tests.push({
            endpoint: '/health',
            error: healthError.name === 'AbortError' ? 'timeout' : healthError.message,
            working: false
          })
        }
        
        // Root works but health doesn't - still partially healthy
        return NextResponse.json({
          status: 'partially_healthy',
          pythonApi: 'reachable',
          duration: `${Date.now() - startTime}ms`,
          pythonApiStatus: rootData,
          diagnostics,
          note: 'Root endpoint works but /health endpoint may not exist or is slow'
        })
      }
    } catch (rootError: any) {
      clearTimeout(rootTimeout)
      diagnostics.tests.push({
        endpoint: '/',
        error: rootError.name === 'AbortError' ? 'timeout' : rootError.message,
        errorCode: rootError.code,
        working: false
      })
    }
    
    // Both endpoints failed
    return NextResponse.json(
      { 
        status: 'unhealthy',
        pythonApi: 'unreachable',
        duration: `${Date.now() - startTime}ms`,
        error: 'Python API is not responding to any endpoints',
        diagnostics,
        troubleshooting: [
          'Check Railway service logs for errors',
          'Verify Python API is running: Railway → Service → Logs',
          'Test Railway URL directly in browser',
          'Check if models are loading correctly (can take 30+ seconds on first start)',
          'Verify PYTHON_API_URL environment variable is set correctly in Vercel'
        ]
      },
      { status: 503 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        pythonApi: 'error',
        duration: `${Date.now() - startTime}ms`,
        error: error instanceof Error ? error.message : 'Unknown error',
        diagnostics
      },
      { status: 503 }
    )
  }
}
