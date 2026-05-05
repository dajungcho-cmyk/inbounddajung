import { useState } from 'react'

const DATA = {
  faq: {
    headline: "Great. Here's how I'd handle your most common question.",
    incoming: { handle: '@jessica.k', message: "Where's the link to your course? I've been looking for it", time: 'just now' },
    reply: "Hey Jessica! Here it is 👉 course.link/go — Let me know if you have any questions!",
  },
  leadQualification: {
    headline: "Great. Here's how I'd qualify a lead the moment they DM you.",
    incoming: { handle: '@marcus.p', message: "How do I sign up right now? I want to join today", time: '2 min ago' },
    reply: "Hey Marcus! So glad you're interested 🙌 Here's how to join: course.link/enrol — spots are limited so grab yours now!",
  },
  niceComment: {
    headline: "Great. Here's how I'd reply to keep your audience engaged.",
    incoming: { handle: '@sara.creates', message: "This video changed everything for me, thank you so much 🙌", time: '5 min ago' },
    reply: "Thank you so much, this genuinely means everything to me 🙏 So glad it helped — more coming soon!",
  },
}

export default function Screen3_AIPlan({ goal = 'faq', onBack, onConfirm }) {
  const [isTweaking, setIsTweaking] = useState(false)
  const [reply, setReply] = useState(DATA[goal].reply)
  const d = DATA[goal]

  return (
    <div className="screen screen--grouped" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="status-bar status-bar--light"><span>9:41</span><span>●●●</span></div>
      <div className="nav-bar">
        <button className="nav-bar__back" onClick={onBack}>‹ Back</button>
        {isTweaking && <span className="nav-bar__title">Make it sound like you.</span>}
      </div>

      <div className="content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{d.headline}</p>

        {/* DM thread */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Incoming */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6 }}>{d.incoming.handle}</p>
            <div className="bubble bubble--incoming">{d.incoming.message}</div>
            <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>{d.incoming.time}</p>
          </div>

          {/* AI reply */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {isTweaking ? null : 'your AI ▸'}
            </p>
            {isTweaking ? (
              <textarea
                value={reply}
                onChange={e => setReply(e.target.value)}
                style={{
                  width: '100%', minHeight: 100, padding: '10px 14px',
                  borderRadius: 16, border: '1.5px solid var(--brand-purple)',
                  background: 'rgba(107,70,255,0.06)', fontSize: 15,
                  fontFamily: 'inherit', resize: 'none', outline: 'none',
                }}
              />
            ) : (
              <div className="bubble bubble--ai">{reply}</div>
            )}
          </div>
        </div>

        {/* Actions */}
        {isTweaking ? (
          <button className="primary-btn" onClick={() => { setIsTweaking(false); onConfirm() }}>Done</button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-subtle)' }}>Sound like you?</p>
            <button className="primary-btn" onClick={onConfirm}>Yes, that's me</button>
            <button className="secondary-btn" onClick={() => setIsTweaking(true)}>Tweak it</button>
          </div>
        )}
      </div>
    </div>
  )
}
