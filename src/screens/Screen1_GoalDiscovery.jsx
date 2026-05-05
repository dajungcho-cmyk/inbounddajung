import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'

export default function Screen1_GoalDiscovery({ onShowMe }) {
  return (
    <div className="screen screen--light">
      <StatusBar dark={false} />

      {/* Vertically centered block — headline + subtitle + button together */}
      <div className="content" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
      }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#111118',
            marginBottom: 12,
            letterSpacing: -0.5,
          }}>
            Hi Jenny!<br />
            Inbound agent can handle what's costing you the most
          </h1>

          <p style={{
            fontSize: 15,
            color: '#8e8e93',
            lineHeight: 1.6,
            marginBottom: 28,
          }}>
            72% of your DMs don't need you.<br />
            I'll show you exactly what I can take off your plate.
          </p>

          <GlassPillButton label="Show me what AI found" onClick={onShowMe} />
        </div>
      </div>

      <TabBar selected="agent" />
    </div>
  )
}

function GlassPillButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        height: 58,
        border: 'none',
        borderRadius: 100,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        /* Lavender glass gradient — base layer */
        background: 'linear-gradient(90deg, #c9bcff 0%, #ddd5ff 50%, #c4b5ff 100%)',
        boxShadow: `
          0 1px 0 rgba(255,255,255,0.6) inset,
          0 -1px 0 rgba(0,0,0,0.08) inset,
          0 4px 20px rgba(130,100,255,0.25),
          0 1px 3px rgba(130,100,255,0.15)
        `,
      }}
    >
      {/* Glass highlight — top shine */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)',
        borderRadius: '100px 100px 0 0',
        pointerEvents: 'none',
      }} />

      {/* Black circle with sparkle */}
      <div style={{
        width: 50,
        height: 50,
        background: 'radial-gradient(circle at 35% 35%, #3a3a4a, #000)',
        borderRadius: '50%',
        marginLeft: 4,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8z"/>
        </svg>
      </div>

      {/* Label */}
      <span style={{
        flex: 1,
        textAlign: 'center',
        marginRight: 54,
        fontSize: 17,
        fontWeight: 600,
        color: '#1c0060',
        position: 'relative',
        zIndex: 1,
        letterSpacing: -0.2,
      }}>
        {label}
      </span>
    </button>
  )
}
