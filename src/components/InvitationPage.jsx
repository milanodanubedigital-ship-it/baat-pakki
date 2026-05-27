import { motion } from 'framer-motion'
import FloralDecorations from './FloralDecorations'
import FloatingHearts from './FloatingHearts'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: 'easeOut' },
})

const InvitationPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#fdfaf5] flex flex-col items-center justify-center overflow-hidden px-6 py-16">
      <FloralDecorations />
      <FloatingHearts count={10} />

      {/* Top Label */}
      <motion.p
        {...fadeUp(0.1)}
        className="text-xs md:text-sm uppercase tracking-[0.25em] text-sage-green mb-4 font-light"
      >
        With joyful hearts
      </motion.p>

      {/* Main Title */}
      <motion.h1
        {...fadeUp(0.25)}
        className="text-6xl md:text-8xl font-bold text-deep-green font-serif tracking-tight mb-3 text-center"
      >
        Baat Pakki
      </motion.h1>

      {/* Tagline */}
      <motion.p
        {...fadeUp(0.4)}
        className="text-base md:text-lg text-sage-green font-light italic mb-12 text-center max-w-sm"
      >
        A quiet promise, sealed between two families.
      </motion.p>

      {/* Gold divider */}
      <motion.div
        {...fadeUp(0.5)}
        className="h-px w-24 bg-gold mb-12 opacity-60"
      />

      {/* Three Images */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.55 }}
        className="flex items-end justify-center gap-4 md:gap-8 mb-14 w-full max-w-2xl"
      >
        {/* Female */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-full max-w-[140px] md:max-w-[160px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ring-1 ring-gold/20">
            <img
              src="/images/female.png"
              alt="Bride"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-sage-green tracking-widest uppercase font-light">Bride</p>
        </div>

        {/* Couple — slightly taller */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-full max-w-[160px] md:max-w-[190px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-gold/30 -mt-6">
            <img
              src="/images/couple.png"
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-sage-green tracking-widest uppercase font-light">Together</p>
        </div>

        {/* Male */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-full max-w-[140px] md:max-w-[160px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ring-1 ring-gold/20">
            <img
              src="/images/male.png"
              alt="Groom"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-sage-green tracking-widest uppercase font-light">Groom</p>
        </div>
      </motion.div>

      {/* Invite Line */}
      <motion.p
        {...fadeUp(0.7)}
        className="text-sm md:text-base text-sage-green font-light tracking-wide mb-8 text-center"
      >
        You are warmly invited to
      </motion.p>

      {/* Event Card */}
      <motion.div
        {...fadeUp(0.85)}
        className="bg-white/80 backdrop-blur border border-gold/30 rounded-3xl px-10 py-8 shadow-xl text-center max-w-xs w-full mb-14"
      >
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-green mb-5">
          Baat Pakki
        </h2>
        <div className="space-y-2">
          <p className="text-deep-green font-semibold text-base">5 June 2026</p>
          <p className="text-sage-green text-sm">W49, Emirates Hills</p>
        </div>
        <div className="flex justify-center gap-3 mt-5">
          {[0, 1, 2].map((i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#d4af37" className="opacity-50">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ))}
        </div>
      </motion.div>

      {/* Gold divider */}
      <motion.div
        {...fadeUp(0.95)}
        className="h-px w-16 bg-gold mb-12 opacity-40"
      />

      {/* Blessing */}
      <motion.div
        {...fadeUp(1.05)}
        className="text-center space-y-3 mb-12"
      >
        <p className="text-3xl md:text-4xl font-serif text-deep-green tracking-wide">
          تحت بركة الله
        </p>
        <p className="text-sm md:text-base text-sage-green font-light tracking-wide">
          Under the blessings of Allah
        </p>
      </motion.div>

      {/* Closing */}
      <motion.p
        {...fadeUp(1.2)}
        className="text-sm text-sage-green font-light text-center max-w-xs leading-relaxed opacity-80"
      >
        May this union be filled with love, respect, and countless blessings.
      </motion.p>
    </div>
  )
}

export default InvitationPage
