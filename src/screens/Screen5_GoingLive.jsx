const MESSAGES = {
  faq: "I'll handle the link questions.\nYou focus on everything else.",
  leadQualification: "I'll flag hot leads the moment they come in.\nYou close them.",
  niceComment: "I'll keep your audience warm.\nYou stay focused on what matters.",
}

import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'

export default function Screen5_GoingLive({ goal = 'faq', onBack, onLetsGo }) {
  return (
    <div className="screen screen--light" style={{ display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={false} />
      <div className="nav-bar">
        <button className="nav-bar__back" onClick={onBack}>‹ Back</button>
      </div>

      <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <h1 className="fade-up" style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
          You're ready.
        </h1>
        <p className="fade-up-delay-1" style={{ fontSize: 15, color: 'var(--text-subtle)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
          {MESSAGES[goal]}
        </p>
      </div>

      <div className="fade-up-delay-2" style={{ padding: '0 24px 24px' }}>
        <button className="pill-btn" onClick={onLetsGo}>
          <div className="pill-btn__circle">✦</div>
          <span className="pill-btn__label">Let's go</span>
        </button>
      </div>

      <TabBar selected="agent" />
    </div>
  )
}

