import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    let mql: MediaQueryList | null = null;
    try {
      mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      mql.addEventListener("change", update)
    } catch {
      // matchMedia not supported — fall back to resize
      window.addEventListener("resize", update)
    }

    update()

    return () => {
      if (mql) {
        try { mql.removeEventListener("change", update) } catch { /* ignore */ }
      } else {
        window.removeEventListener("resize", update)
      }
    }
  }, [])

  return !!isMobile
}
