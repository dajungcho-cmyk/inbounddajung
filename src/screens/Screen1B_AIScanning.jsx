import { useState, useEffect } from 'react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'

const STEPS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
    ),
    thinking: 'Checking your DM history...',
    done: 'Read 3,847 DM conversations',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    thinking: 'Understanding your industry...',
    done: 'Fitness coaching & online programs',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    thinking: 'Reading what your customers ask about...',
    done: 'Pricing, availability, how to join',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    thinking: 'Calculating how much time this costs you...',
    done: '~3 hours a week on the same questions',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    thinking: 'Finding where AI can help the most...',
    done: 'Your goal: qualify leads for your 1-1 program',
  },
]

const THINK_DURATION = 1200 // ms shimmer before resolving
const HOLD_DURATION  = 600  // ms hold on done text before next step

export default function Screen1B_AIScanning({ onComplete }) {
  // currentStep = index of step being shown (0-based)
  // phase = 'thinking' | 'done'
  const [currentStep, setCurrentStep] = useState(0)
  const [phase, setPhase] = useState('thinking')

  useEffect(() => {
    let step = 0

    const runStep = () => {
      setCurrentStep(step)
      setPhase('thinking')

      // After thinking duration → resolve to done
      const doneTimer = setTimeout(() => {
        setPhase('done')

        step += 1
        if (step < STEPS.length) {
          // Hold on done text, then move to next step
          const nextTimer = setTimeout(runStep, HOLD_DURATION)
          return () => clearTimeout(nextTimer)
        } else {
          // All done — go straight to next screen
          const nextTimer = setTimeout(() => onComplete(), HOLD_DURATION + 200)
          return () => clearTimeout(nextTimer)
        }
      }, THINK_DURATION)

      return () => clearTimeout(doneTimer)
    }

    const cleanup = runStep()
    return cleanup
  }, [])

  const step = STEPS[Math.min(currentStep, STEPS.length - 1)]

  return (
    <div className="screen screen--light" style={{ display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={false} />

      {/* Fixed position reasoning area — always same spot */}
      <div className="content" style={{ padding: '24px 20px 0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          minHeight: 28,
        }}>
          {/* Icon — always gray, never colored */}
          <span style={{ color: '#8e8e93', flexShrink: 0, display: 'flex' }}>
            {step.icon}
          </span>

          {/* Text — always shimmer gray, consistent throughout */}
          <ShimmerText text={phase === 'thinking' ? step.thinking : step.done} />
        </div>
      </div>

      <TabBar selected="agent" />
    </div>
  )
}

function ShimmerText({ text }) {
  return (
    <p style={{
      fontSize: 15,
      fontWeight: 400,
      lineHeight: 1.4,
      background: 'linear-gradient(90deg, #b0b0b5 25%, #d8d8db 50%, #b0b0b5 75%)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'notionShimmer 1.2s ease-in-out infinite',
    }}>
      {text}
    </p>
  )
}

