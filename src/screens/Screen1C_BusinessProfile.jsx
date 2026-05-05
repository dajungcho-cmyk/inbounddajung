import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'

const HEADLINE = "Here's what I know about you"

const IconBusiness = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3c3c43" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/>
  </svg>
)

const IconTarget = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3c3c43" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)


const INSIGHTS = [
  { Icon: IconBusiness, label: 'Your industry', text: 'Fitness coaching — online 1-on-1 programs' },
  { Icon: IconTarget,   label: 'Your goal',     text: 'Qualify leads, convert DMs into paying clients, and answer common questions' },
]

export default function Screen1C_BusinessProfile({ onConfirm, onCorrect }) {
  const [typedText, setTypedText]             = useState('')
  const [showCard, setShowCard]               = useState(false)
  const [visibleInsights, setVisibleInsights] = useState(0)
  const [showButtons, setShowButtons]         = useState(false)

  useEffect(() => {
    let i = 0
    const type = () => {
      if (i < HEADLINE.length) {
        i++
        setTypedText(HEADLINE.slice(0, i))
        setTimeout(type, 22)
      } else {
        // Headline done → show card, then reveal insights one by one
        setTimeout(() => setShowCard(true), 300)
        INSIGHTS.forEach((_, idx) => {
          setTimeout(() => setVisibleInsights(idx + 1), 500 + idx * 400)
        })
        setTimeout(() => setShowButtons(true), 500 + INSIGHTS.length * 400 + 200)
      }
    }
    const start = setTimeout(type, 200)
    return () => clearTimeout(start)
  }, [])

  return (
    <div className="screen screen--light" style={{ display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={false} />

      <div className="content" style={{ padding: '24px 20px 0' }}>

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          <span style={{ fontSize: 15, color: '#8e8e93' }}>Based on your DMs</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        {/* Typewriter headline */}
        <h1 style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#111118',
          lineHeight: 1.35,
          letterSpacing: -0.3,
          marginBottom: 12,
          minHeight: 40,
        }}>
          {typedText}
          {typedText.length < HEADLINE.length && (
            <span style={{ borderRight: '2px solid #111118', marginLeft: 1, animation: 'blink 0.8s step-end infinite' }} />
          )}
        </h1>

        {/* Insight rows — flat, no card */}
        <div style={{
          opacity: showCard ? 1 : 0,
          transform: showCard ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          {INSIGHTS.map(({ Icon, label, text }, idx) => (
            <div key={idx} style={{
              opacity: visibleInsights > idx ? 1 : 0,
              transform: visibleInsights > idx ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 0' }}>
                <div style={{ flexShrink: 0, color: '#8e8e93' }}><Icon /></div>
                <div>
                  <p style={{ fontSize: 11, color: '#8e8e93', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>{label}</p>
                  <p style={{ fontSize: 14, color: '#111118', fontWeight: 500, lineHeight: 1.4 }}>{text}</p>
                </div>
              </div>
              {idx < INSIGHTS.length - 1 && (
                <div style={{ height: '0.5px', background: '#e5e5ea' }} />
              )}
            </div>
          ))}
        </div>

        {/* Buttons — outside the card */}
        <div style={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          opacity: showButtons ? 1 : 0,
          transform: showButtons ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          <button onClick={onConfirm} style={{
            width: '100%', height: 50,
            background: '#111118', border: 'none', borderRadius: 12,
            cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#fff',
          }}>
            Yes, that's me
          </button>
          <button onClick={onCorrect} style={{
            width: '100%', height: 36,
            background: 'none', border: 'none',
            cursor: 'pointer', fontSize: 14, fontWeight: 400, color: '#8e8e93',
          }}>
            Not quite
          </button>
        </div>
      </div>

      <TabBar selected="agent" />
    </div>
  )
}

