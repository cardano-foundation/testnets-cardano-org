import { useEffect, useMemo, useState } from 'react'
/**
 * uses `window.matchMedia` and updates based on changes
 */
export default function useMediaQuery (query) {
  const mql = useMemo(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(query)
    }
  }, [query])

  const [match, setMatch] = useState(mql ? mql.matches : false)

  useEffect(() => {
    const handler = (e) => {
      setMatch(e.matches)
    }
    if (mql) {
      mql.addListener(handler)
    }
    return () => mql && mql.removeListener(handler)
  }, [])

  return match
}
