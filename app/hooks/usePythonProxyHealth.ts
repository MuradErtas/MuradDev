'use client'

import { useCallback, useEffect, useState } from 'react'

/** Initial probe only; wake flow uses full server timeout without this cap. */
const CLIENT_PROBE_TIMEOUT_MS = 15_000

export async function isProxyHealthOk(res: Response): Promise<boolean> {
  if (!res.ok) return false
  const data = await res.json().catch(() => null)
  return data?.status === 'healthy' && data?.pythonApi === 'reachable'
}

/**
 * Probes Next.js proxy health (`/api/slm/health` or `/api/rlsnake/health`).
 * Only sets apiReady when the Python backend is actually reported healthy.
 */
export function usePythonProxyHealth(healthPath: string) {
  const [apiReady, setApiReady] = useState(false)
  const [apiCheckDone, setApiCheckDone] = useState(false)

  const probeWithTimeout = useCallback(async () => {
    const ac = new AbortController()
    const timeout = setTimeout(() => ac.abort(), CLIENT_PROBE_TIMEOUT_MS)
    try {
      const r = await fetch(`${healthPath}?ts=${Date.now()}`, {
        cache: 'no-store',
        signal: ac.signal,
      })
      return await isProxyHealthOk(r)
    } catch {
      return false
    } finally {
      clearTimeout(timeout)
    }
  }, [healthPath])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const ok = await probeWithTimeout()
        if (!cancelled) setApiReady(ok)
      } catch {
        if (!cancelled) setApiReady(false)
      } finally {
        if (!cancelled) setApiCheckDone(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [probeWithTimeout])

  return { apiReady, setApiReady, apiCheckDone }
}
