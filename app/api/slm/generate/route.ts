import { NextRequest, NextResponse } from 'next/server'

// Python API URL - set via environment variable
// For local dev, defaults to localhost:8000
// For production, set PYTHON_API_URL in Vercel
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    console.log(`[${Date.now() - startTime}ms] Starting request to Python API`)
    
    // Call external Python API service with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.error(`[${Date.now() - startTime}ms] Request timeout after 55s`)
      controller.abort()
    }, 55000) // 55s timeout (5s buffer before Vercel's 60s limit)
    
    try {
      console.log(`[${Date.now() - startTime}ms] Fetching from: ${PYTHON_API_URL}/generate`)
      
      const response = await fetch(`${PYTHON_API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, max_tokens: 50 }),
        signal: controller.signal,
      })
      
      console.log(`[${Date.now() - startTime}ms] Received response: ${response.status}`)
      
      clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      console.error('Python API error:', errorData)
      return NextResponse.json(
        { 
          error: 'Failed to generate response',
          details: errorData.detail || errorData.error || 'Unknown error'
        },
        { status: response.status }
      )
    }

      const data = await response.json()
      console.log(`[${Date.now() - startTime}ms] Successfully parsed response`)
      return NextResponse.json(data)
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            error: 'Request timeout',
            details: 'The model inference is taking too long. Please try again or use a shorter prompt.'
          },
          { status: 504 }
        )
      }
      throw fetchError
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
