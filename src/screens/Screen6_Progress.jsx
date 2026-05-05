const METRICS = {
  faq: { metric: '2 hours back\nthis week.', nextTeaser: '12 people wanted to buy this week. None heard back.' },
  leadQualification: { metric: '3 hot leads\nflagged today.', nextTeaser: '200 comments on your posts went unanswered.' },
  niceComment: { metric: '140 comments\nanswered this week.', nextTeaser: 'You still spend 3 hours answering the same question.' },
}

const ACTIVITY = [
  { handle: '@jessica.k',  snippet: '"Where\'s the link…"', meta: 'I replied · 2 min ago', highlight: false },
  { handle: '@tom.builds',  snippet: '"How do I join?"',     meta: 'I replied · 1 hr ago',  highlight: false },
  { handle: '@sara.creates', snippet: '"Is it still open?"', meta: 'Take a look →',          highlight: true },
]

export default function Screen6_Progress({ goal = 'faq', onBack, onReviewConversation, onFixNextGoal }) {
  const d = METRICS[goal]
  return (
    <div className="screen screen--grouped" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="status-bar status-bar--light"><span>9:41</span><span>●●●</span></div>
      <div className="nav-bar">
        <button className="nav-bar__back" onClick={onBack}>‹ Back</button>
      </div>

      <div className="content">
        {/* Metric */}
        <div style={{ padding: '16px 16px 0' }}>
          <p style={{ fontSize: 20, color: 'var(--text-primary)' }}>You've got</p>
          <p style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.2, whiteSpace: 'pre-line', color: 'var(--text-primary)' }}>
            {d.metric}
          </p>
        </div>

        <hr style={{ margin: '16px 0', borderColor: 'var(--separator)' }} />

        {/* Activity */}
        <div>
          {ACTIVITY.map(item => (
            <div
              key={item.handle}
              className={`activity-row ${item.highlight ? 'activity-row--highlight' : ''}`}
              onClick={item.highlight ? onReviewConversation : undefined}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.handle}</p>
                <p style={{ fontSize: 14, color: 'var(--text-subtle)' }}>{item.snippet}</p>
              </div>
              <p style={{ fontSize: 12, color: item.highlight ? 'var(--brand-purple)' : 'var(--text-subtle)' }}>{item.meta}</p>
            </div>
          ))}
        </div>

        <hr style={{ margin: '16px 0', borderColor: 'var(--separator)' }} />

        {/* Next goal teaser */}
        <div style={{ padding: '0 16px 24px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 12 }}>I also noticed…</p>
          <div className="card">
            <p style={{ fontSize: 15, color: 'var(--text-primary)', marginBottom: 12 }}>{d.nextTeaser}</p>
            <button className="primary-btn" onClick={onFixNextGoal}>Want to fix that?</button>
          </div>
        </div>
      </div>
    </div>
  )
}
