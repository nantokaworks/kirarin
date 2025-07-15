export function StrongWrapper({ children }: { children: React.ReactNode }) {
  return (
    <strong style={{ position: 'relative', zIndex: 1, fontWeight: 'bold' }}>
      {children}
    </strong>
  )
}

export function SpanWrapper({ children }: { children: React.ReactNode }) {
  return <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
}
