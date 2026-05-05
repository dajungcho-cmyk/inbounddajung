import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'

const GOALS = {
  faq: {
    headline: 'You spent 3 hours this month answering the same question.',
    stat: '× 47 times = ~3 hrs / month',
    cta: 'Want to get that time back?',
  },
  leadQualification: {
    headline: '12 people wanted to buy this week. None heard back.',
    stat: '12 buyers went cold this week',
    cta: 'Want to catch them before they go cold?',
  },
  niceComment: {
    headline: '200 comments on your posts went unanswered this week.',
    stat: '200 comments unanswered',
    cta: 'Want to keep your audience engaged?',
  },
}

export default function Screen2_GoalRouting({ goal = 'faq', onBack, onYes, onNotNow }) {
  const g = GOALS[goal]
  return (
    <div className="screen screen--light" style={{ display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={false} />
      <NavBar onBack={onBack} />

      <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.3, marginBottom: 12, color: 'var(--text-primary)' }}>
            {g.headline}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-subtle)', marginBottom: 16 }}>{g.stat}</p>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)' }}>{g.cta}</p>
        </div>
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PillButton label="Yes, let's do it" onClick={onYes} />
        <button className="secondary-btn" onClick={onNotNow}>Not right now</button>
      </div>

      <TabBar selected="agent" />
    </div>
  )
}

function NavBar({ onBack }) {
  return (
    <div className="nav-bar">
      <button className="nav-bar__back" onClick={onBack}>‹ Back</button>
    </div>
  )
}

function PillButton({ label, onClick }) {
  return (
    <button className="pill-btn" onClick={onClick}>
      <div className="pill-btn__circle">✦</div>
      <span className="pill-btn__label">{label}</span>
    </button>
  )
}

