const SignalIcon = ({ dark }) => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill={dark ? '#000' : '#fff'}>
    <rect x="0"  y="8"  width="3" height="4" rx="0.5"/>
    <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5"/>
    <rect x="9"  y="3"  width="3" height="9"   rx="0.5"/>
    <rect x="13.5" y="0" width="3" height="12"  rx="0.5"/>
  </svg>
)

const WifiIcon = ({ dark }) => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={dark ? '#000' : '#fff'} strokeWidth="1.5" strokeLinecap="round">
    <path d="M1 4.5C3.5 2 6.6 0.7 8 0.7s4.5 1.3 7 3.8"/>
    <path d="M3 7C4.6 5.4 6.2 4.5 8 4.5s3.4.9 5 2.5"/>
    <path d="M5.5 9.5C6.3 8.7 7.1 8.2 8 8.2s1.7.5 2.5 1.3"/>
    <circle cx="8" cy="11.5" r="0.8" fill={dark ? '#000' : '#fff'} stroke="none"/>
  </svg>
)

const BatteryIcon = ({ dark }) => {
  const color = dark ? '#000' : '#fff'
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={color} strokeOpacity="0.35"/>
      <rect x="2" y="2" width="17" height="8" rx="2" fill={color}/>
      <path d="M23 4v4a2 2 0 0 0 0-4z" fill={color} fillOpacity="0.4"/>
    </svg>
  )
}

export default function StatusBar({ dark = false }) {
  const color = dark ? '#fff' : '#000'
  return (
    <div style={{
      height: 58,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '0 24px 10px',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, color }}> 9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <SignalIcon dark={!dark} />
        <WifiIcon dark={!dark} />
        <BatteryIcon dark={!dark} />
      </div>
    </div>
  )
}
