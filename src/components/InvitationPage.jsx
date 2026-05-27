import HeroSection from './HeroSection'
import CoupleTransformAnimation from './CoupleTransformAnimation'
import BlessingSection from './BlessingSection'
import FloatingHearts from './FloatingHearts'

const InvitationPage = () => {
  return (
    <div className="scroll-container bg-white">
      <FloatingHearts count={12} />
      <HeroSection />
      <CoupleTransformAnimation />
      <BlessingSection />
    </div>
  )
}

export default InvitationPage
