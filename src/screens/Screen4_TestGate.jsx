import { useState } from 'react'

export default function Screen4_TestGate({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="screen screen--grouped" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="status-bar status-bar--light"><span>9:41</span><span>●●●</span></div>
      <div className="nav-bar">
        <button className="nav-bar__back" onClick={onBack}>‹ Back</button>
      </div>

      <div className="content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
          Want to try it before it goes live?
        </h2>

        <OptionCard
          title="Ask it yourself"
          description="Type a question as if you're a customer. See exactly what AI says."
          footnote="Takes 30 seconds"
          selected={selected === 'quick'}
          onTap={() => { setSelected('quick'); onContinue() }}
        />

        <OptionCard
          title="Watch the first 5 replies"
          description="AI drafts replies but holds them. You approve before anything is sent."
          footnote="Takes a few days"
          selected={selected === 'watch'}
          onTap={() => { setSelected('watch'); onContinue() }}
        />

        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <button className="secondary-btn" onClick={onContinue}>Skip — go live now</button>
        </div>
      </div>
    </div>
  )
}

function OptionCard({ title, description, footnote, selected, onTap }) {
  return (
    <div
      className={`card ${selected ? 'card--selected' : ''}`}
      onClick={onTap}
      style={{ cursor: 'pointer' }}
    >
      <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 6, lineHeight: 1.5 }}>{description}</p>
      <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{footnote}</p>
    </div>
  )
}
