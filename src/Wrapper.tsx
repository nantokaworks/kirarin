import { css } from 'styled-system/css'

export function StrongWrapper({ children }: { children: React.ReactNode }) {
  return (
    <strong className={css({ position: 'relative', zIndex: 1, fontWeight: 'bold' })}>
      {children}
    </strong>
  )
}

export function SpanWrapper({ children }: { children: React.ReactNode }) {
  return <span className={css({ position: 'relative', zIndex: 1 })}>{children}</span>
}
