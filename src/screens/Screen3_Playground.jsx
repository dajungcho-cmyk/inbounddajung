import { useState, useEffect, useRef } from 'react'
import StatusBar from '../components/StatusBar'

const SUGGESTIONS = [
  { label: "How much does the 1-on-1 program cost?", wide: true },
  { label: "Is there availability?", wide: false },
  { label: "How do I sign up?", wide: false },
]

const AI_REPLIES = {
  "How much does the 1-on-1 program cost?": "Hey! My 1-on-1 coaching program starts at $497/month. It includes weekly calls, a personalised plan, and direct DM access. Want me to send you the full details?",
  "Is there availability?": "Hey! I do have a few spots open this month. I'd love to chat and see if we're a good fit — want to book a free 15-min call?",
  "How do I sign up?": "Hey! So glad you're interested 🙌 You can grab your spot right here: course.link/go — takes less than 2 minutes. Let me know if you have any questions!",
}

export default function Screen3_Playground({ onDismiss }) {
  const [visible, setVisible] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [showPill1, setShowPill1] = useState(false)
  const [showPill2, setShowPill2] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    // Small delay so the browser paints the off-screen position first
    setTimeout(() => setVisible(true), 50)
    setTimeout(() => setShowSubtitle(true), 900)
    setTimeout(() => setShowInput(true),   1100)
    setTimeout(() => setShowPill1(true),   1300)
    setTimeout(() => setShowPill2(true),   1480)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text) => {
    if (!text.trim() || isTyping) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setIsTyping(true)
    const reply = AI_REPLIES[text] || "Thanks for reaching out! Let me get back to you on that shortly."
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    }, 1400)
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: '#0d0d0d',
      display: 'flex', flexDirection: 'column',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      opacity: visible ? 1 : 0.5,
      transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
    }}>
      <StatusBar dark={true} />

      {/* Nav bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 20px', height: 52, position: 'relative', flexShrink: 0,
      }}>
        <button onClick={onDismiss} style={{
          position: 'absolute', left: 20,
          width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 5 }}>AI Playground</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.08)', borderRadius: 100,
            padding: '3px 10px',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Draft</span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        padding: '12px 20px 0', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        opacity: showSubtitle ? 1 : 0,
        transform: showSubtitle ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
          <path d="M12 2l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8z"/>
        </svg>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
          Ask as if you're a customer — I'll show you how I handle it.
        </p>
      </div>

      {/* Chat messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px 20px 8px',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            animation: 'fadeUp 0.3s ease forwards',
          }}>
            <div style={{
              maxWidth: '78%', padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(107,70,255,0.2)',
              border: msg.role === 'ai' ? '1px solid rgba(107,70,255,0.3)' : 'none',
              fontSize: 14, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5,
            }}>
              {msg.role === 'ai' && (
                <p style={{ fontSize: 10, color: 'rgba(107,70,255,0.85)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Inbound Agent
                </p>
              )}
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex' }}>
            <div style={{
              padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
              background: 'rgba(107,70,255,0.15)', border: '1px solid rgba(107,70,255,0.2)',
              display: 'flex', gap: 5, alignItems: 'center',
            }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'rgba(107,70,255,0.7)',
                  animation: `typingDot 1s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input + suggestion pills */}
      <div style={{ padding: '8px 16px 28px', flexShrink: 0 }}>

        {/* Input box */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1.5px solid rgba(107,70,255,0.65)',
          borderRadius: 16, padding: '14px 16px',
          boxShadow: '0 0 24px rgba(107,70,255,0.18)',
          marginBottom: 12,
          opacity: showInput ? 1 : 0,
          transform: showInput ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask anything"
            style={{
              width: '100%', background: 'none', border: 'none', outline: 'none',
              color: 'rgba(255,255,255,0.8)', fontSize: 15,
              marginBottom: 12,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 20, cursor: 'pointer' }}>+</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </div>
        </div>

        {/* Suggestion pills */}
        {messages.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={() => sendMessage(SUGGESTIONS[0].label)} style={{
              ...pillStyle,
              opacity: showPill1 ? 1 : 0,
              transform: showPill1 ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}>
              {SUGGESTIONS[0].label}
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {SUGGESTIONS.slice(1).map((s, i) => (
                <button key={i} onClick={() => sendMessage(s.label)} style={{
                  ...pillStyle, flex: 1,
                  opacity: showPill2 ? 1 : 0,
                  transform: showPill2 ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
                }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const pillStyle = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 100,
  padding: '10px 16px',
  color: 'rgba(255,255,255,0.7)',
  fontSize: 13,
  cursor: 'pointer',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
