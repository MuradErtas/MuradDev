import { NextRequest, NextResponse } from 'next/server'

const RLSNAKE_API_URL = process.env.RLSNAKE_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const { model_level, session_id } = await request.json()

    if (!model_level) {
      return NextResponse.json(
        { error: 'model_level is required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${RLSNAKE_API_URL}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model_level, session_id }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      return NextResponse.json(
        { 
          error: 'Failed to start game',
          details: errorData.detail || errorData.error || 'Unknown error'
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
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
