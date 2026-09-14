const GallerySkeleton = () => (
  <div>
    <h1 style={{ fontSize: 40, marginBottom: 4 }}>Cargando…</h1>
    <p style={{ color: 'var(--color-neutral-700)', marginBottom: 24 }}>
      Estamos trayendo tus fotos desde tu espacio privado.
    </p>
    <div
      className='grid gap-[18px]'
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: 'var(--color-neutral-100)',
            borderRadius: 'var(--radius-lg)',
            padding: 10,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            className='animate-[shimmer_1.4s_ease-in-out_infinite]'
            style={{
              aspectRatio: 1,
              borderRadius: 'calc(var(--radius-lg) - 8px)',
              background: 'var(--color-neutral-200)',
            }}
          />
          <div
            className='animate-[shimmer_1.4s_ease-in-out_infinite]'
            style={{ height: 11, width: '62%', marginTop: 10, borderRadius: 999, background: 'var(--color-neutral-300)' }}
          />
          <div
            className='animate-[shimmer_1.4s_ease-in-out_infinite]'
            style={{ height: 9, width: '40%', marginTop: 6, borderRadius: 999, background: 'var(--color-neutral-300)' }}
          />
        </div>
      ))}
    </div>
  </div>
)

export default GallerySkeleton
