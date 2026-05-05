import { useState } from 'react'

export default function Screen7_TrustReview({ onBack, onApprove }) {
  const [isFixing, setIsFixing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [reply, setReply] = useState("Hey Sara! Yes, still open — grab your spot: course.link/go — Don't wait too long though 😊")

  return (
    <div className="screen screen--grouped" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="status-bar status-bar--light"><span>9:41</span><span>●●●</span></div>
      <div className="nav-bar">
        <button className="nav-bar__back" onClick={onBack}>‹ Back</button>
        <span className="nav-bar__title">@sara.creates</span>
      </div>

      <div className="content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Incoming */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6 }}>@sara.creates</p>
            <div className="bubble bubble--incoming">Is the course still open? I heard you might close it soon</div>
            <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>4 min ago</p>
          </div>

          {/* AI reply */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {isSaved ? 'sent by your AI ✓' : 'sent by your AI'}
            </p>
            {isFixing ? (
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
        {isSaved ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-subtle)' }}>Got it — updated.</p>
            <button className="secondary-btn" onClick={onApprove}>← Back</button>
          </div>
        ) : isFixing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 14, color: 'var(--text-subtle)' }}>💡 I'll say it this way from now on.</p>
            <button className="primary-btn" onClick={() => { setIsFixing(false); setIsSaved(true) }}>Save</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-subtle)' }}>Did I sound like you?</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-btn" onClick={onApprove} style={{ flex: 1 }}>Yes ✓</button>
              <button className="primary-btn" onClick={() => setIsFixing(true)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--separator)', color: 'var(--text-subtle)' }}>Fix it</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
