import { useState } from 'react'
import Screen1_GoalDiscovery from './screens/Screen1_GoalDiscovery'
import Screen1B_AIScanning from './screens/Screen1B_AIScanning'
import Screen1C_BusinessProfile from './screens/Screen1C_BusinessProfile'
import Screen2_GoalRouting from './screens/Screen2_GoalRouting'
import Screen3_AIPlan from './screens/Screen3_AIPlan'
import Screen3_Playground from './screens/Screen3_Playground'
import Screen4_TestGate from './screens/Screen4_TestGate'
import Screen5_GoingLive from './screens/Screen5_GoingLive'
import Screen6_Progress from './screens/Screen6_Progress'
import Screen7_TrustReview from './screens/Screen7_TrustReview'

// Navigation stack — each entry is { screen, props }
export default function App() {
  const [stack, setStack] = useState([{ screen: 'goal-discovery' }])
  const [darkModal, setDarkModal] = useState(null) // null | 'scanning' | 'business-profile' | 'playground'
  const [goal, setGoal] = useState('faq')

  const push = (screen, props = {}) => setStack(s => [...s, { screen, props }])
  const pop  = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s)

  const current = stack[stack.length - 1]
  const canGoBack = stack.length > 1

  const renderScreen = () => {
    switch (current.screen) {
      case 'goal-discovery':
        return (
          <Screen1_GoalDiscovery
            onShowMe={() => setDarkModal('scanning')}
          />
        )
      case 'goal-routing':
        return (
          <Screen2_GoalRouting
            goal={goal}
            onBack={pop}
            onYes={() => push('ai-plan')}
            onNotNow={pop}
          />
        )
      case 'ai-plan':
        return (
          <Screen3_AIPlan
            goal={goal}
            onBack={pop}
            onConfirm={() => push('test-gate')}
          />
        )
      case 'test-gate':
        return (
          <Screen4_TestGate
            onBack={pop}
            onContinue={() => push('going-live')}
          />
        )
      case 'going-live':
        return (
          <Screen5_GoingLive
            goal={goal}
            onBack={pop}
            onLetsGo={() => push('progress')}
          />
        )
      case 'progress':
        return (
          <Screen6_Progress
            goal={goal}
            onBack={pop}
            onReviewConversation={() => push('trust-review')}
            onFixNextGoal={() => {
              const next = goal === 'faq' ? 'leadQualification' : 'niceComment'
              setGoal(next)
              push('goal-routing')
            }}
          />
        )
      case 'trust-review':
        return (
          <Screen7_TrustReview
            onBack={pop}
            onApprove={pop}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="phone-frame">
    <div className="phone">
      {/* Light flow */}
      {renderScreen()}

      {/* Scanning — appears instantly, no transition */}
      {darkModal === 'scanning' && (
        <div className="screen screen--light" style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
          <Screen1B_AIScanning
            onComplete={() => setDarkModal('business-profile')}
            onDismiss={() => setDarkModal(null)}
          />
        </div>
      )}

      {(darkModal === 'business-profile' || darkModal === 'playground') && (
        <div className="screen screen--light" style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
          <Screen1C_BusinessProfile
            onConfirm={() => setDarkModal('playground')}
            onCorrect={() => setDarkModal('scanning')}
            onDismiss={() => setDarkModal(null)}
          />
        </div>
      )}

      {/* Dark scrim + playground — slides up over business profile */}
      {darkModal === 'playground' && (
        <>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 199,
            background: '#0d0d0d',
            animation: 'scrimFadeIn 0.4s ease forwards',
          }} />
          <Screen3_Playground onDismiss={() => setDarkModal('business-profile')} />
        </>
      )}

    </div>
    </div>
  )
}
