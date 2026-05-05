const IconHome = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
)

const IconStar = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8z"/>
  </svg>
)

const IconInbox = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
)

const IconMore = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.5"/>
    <circle cx="12" cy="12" r="1.5"/>
    <circle cx="19" cy="12" r="1.5"/>
  </svg>
)

const TABS = [
  { key: 'home',  label: 'Home',          Icon: IconHome },
  { key: 'agent', label: 'Inbound agent', Icon: IconStar },
  { key: 'inbox', label: 'Inbox',         Icon: IconInbox },
  { key: 'more',  label: 'More',          Icon: IconMore },
]

export default function TabBar({ selected = 'agent' }) {
  return (
    /* Floating container — sits above the bottom edge */
    <div style={{
      padding: '0 12px 20px',
      background: 'transparent',
      flexShrink: 0,
    }}>
      <div style={{
        background: '#f2f2f2',
        borderRadius: 32,
        display: 'flex',
        alignItems: 'center',
        padding: '8px 4px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      }}>
        {TABS.map(({ key, label, Icon }) => {
          const isSelected = key === selected
          return (
            <div key={key} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              fontSize: 11,
              fontWeight: isSelected ? 600 : 400,
              color: isSelected ? '#3a7bfd' : '#3c3c43',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 56,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                background: isSelected ? '#e0e0e0' : 'transparent',
              }}>
                <Icon filled={isSelected} />
              </div>
              <span style={{ letterSpacing: -0.1 }}>{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
