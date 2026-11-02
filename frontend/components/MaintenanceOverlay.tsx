/* ============================================================
   MAINTENANCE OVERLAY — Remove this file to go live
   ============================================================ */
'use client';
export const MaintenanceOverlay = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      background: 'rgba(10,5,5,0.82)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'all',
      userSelect: 'none',
    }}
    onContextMenu={(e) => e.preventDefault()}
  >
    {/* Spinning ring */}
    <div style={{
      width: 72, height: 72, borderRadius: '50%',
      border: '3px solid rgba(251,191,36,0.15)',
      borderTop: '3px solid #f59e0b',
      animation: 'spin 1s linear infinite',
      marginBottom: 32,
    }} />

    <p style={{
      fontFamily: 'serif',
      fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
      fontWeight: 800,
      color: '#fef3c7',
      letterSpacing: '0.06em',
      textAlign: 'center',
      margin: '0 16px 12px',
    }}>
      🚀 Site will be live within a few minutes
    </p>

    <p style={{
      fontFamily: 'monospace',
      fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
      color: '#f59e0b',
      opacity: 0.75,
      textAlign: 'center',
      margin: '0 24px',
      letterSpacing: '0.04em',
    }}>
      रुक जा भोस** के — थोड़ी देर में live करता हूँ 😤
    </p>

    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
);
