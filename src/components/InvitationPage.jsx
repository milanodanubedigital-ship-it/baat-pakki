import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function Ornament({ className = '' }) {
  return (
    <svg viewBox="0 0 200 24" className={className} fill="none" aria-hidden>
      <path d="M0 12 H80" stroke="currentColor" strokeWidth="0.6" />
      <path d="M120 12 H200" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="12" r="3" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="12" r="0.8" fill="currentColor" />
      <path d="M88 12 L92 8 M88 12 L92 16" stroke="currentColor" strokeWidth="0.6" />
      <path d="M112 12 L108 8 M112 12 L108 16" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  )
}

function Heart({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Flower({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse cx="12" cy="6" rx="2.2" ry="3.4" />
        <ellipse cx="12" cy="18" rx="2.2" ry="3.4" />
        <ellipse cx="6" cy="12" rx="3.4" ry="2.2" />
        <ellipse cx="18" cy="12" rx="3.4" ry="2.2" />
      </g>
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  )
}

function Sprig({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 240"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      fill="none"
      aria-hidden
    >
      <path
        d="M60 230 C 60 180, 50 140, 30 100 C 20 80, 18 60, 24 30"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 200 - i * 20
        const x = 60 - i * 3.5
        return (
          <g key={i}>
            <path
              d={`M${x} ${y} C ${x - 18} ${y - 4}, ${x - 22} ${y - 14}, ${x - 14} ${y - 22}`}
              stroke="currentColor"
              strokeWidth="0.7"
              fill="none"
            />
            <path
              d={`M${x} ${y - 8} C ${x + 14} ${y - 12}, ${x + 20} ${y - 22}, ${x + 12} ${y - 30}`}
              stroke="currentColor"
              strokeWidth="0.7"
              fill="none"
            />
          </g>
        )
      })}
    </svg>
  )
}

const InvitationPage = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 })

  // Man on LEFT moves right, Woman on RIGHT moves left
  const manX   = useTransform(p, [0, 0.7], ['-2%', '22%'])
  const womanX = useTransform(p, [0, 0.7], ['2%', '-22%'])
  const charY  = useTransform(p, [0, 1], ['0%', '18%'])
  const charScale = useTransform(p, [0, 0.7, 1], [1, 1.02, 1])

  // Individual images fade OUT as couple fades IN
  const individualOpacity = useTransform(p, [0.4, 0.65], [1, 0])
  const coupleOpacity = useTransform(p, [0.45, 0.72], [0, 1])
  const coupleScale   = useTransform(p, [0.45, 0.72], [0.9, 1])

  // Details reveal
  const detailsOpacity = useTransform(p, [0.55, 0.78], [0, 1])
  const detailsY       = useTransform(p, [0.55, 0.78], [40, 0])

  // Hero fades as we scroll
  const heroOpacity = useTransform(p, [0, 0.25], [1, 0])
  const heroY       = useTransform(p, [0, 0.3], [0, -30])

  return (
    <main className="bg-background text-green-deep">
      {/* Scroll stage */}
      <section ref={containerRef} className="relative" style={{ height: '420vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Decorative corner sprigs */}
          <motion.div
            style={{ opacity: useTransform(p, [0, 0.6], [0.5, 0.15]) }}
            className="text-green-soft pointer-events-none absolute -left-6 -top-10 w-28 sm:w-40"
          >
            <Sprig />
          </motion.div>
          <motion.div
            style={{ opacity: useTransform(p, [0, 0.6], [0.5, 0.15]) }}
            className="text-green-soft pointer-events-none absolute -right-6 -bottom-10 w-28 sm:w-40"
          >
            <Sprig flip />
          </motion.div>

          {/* Hero copy */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-x-0 top-[6vh] z-20 flex flex-col items-center text-center px-6"
          >
            <p className="font-sans-body text-[10px] sm:text-xs uppercase text-green-mid" style={{ opacity: 0.8 }}>
              With joyful hearts
            </p>
            <Ornament className="text-gold w-40 sm:w-56 h-6 mt-3" style={{ opacity: 0.8 }} />
            <h1 className="font-display text-green-deep text-5xl sm:text-7xl md:text-8xl mt-2 leading-none">
              Baat Pakki
            </h1>
            <p className="font-serif-body italic text-green-mid mt-3 text-base sm:text-lg max-w-md">
              A quiet promise, sealed between two families.
            </p>
          </motion.div>

          {/* Characters */}
          <div className="absolute inset-0 flex items-end justify-center pb-[2vh]">
            {/* Man — starts LEFT */}
            <motion.div
              style={{ x: manX, y: charY, scale: charScale, opacity: individualOpacity, left: '4%' }}
              className="absolute bottom-0 h-[62vh] sm:h-[72vh] md:h-[78vh] w-auto"
            >
              <img
                src="/images/male.png"
                alt="Groom"
                className="h-full w-auto object-cover rounded-2xl shadow-2xl select-none pointer-events-none"
                draggable={false}
              />
            </motion.div>

            {/* Woman — starts RIGHT */}
            <motion.div
              style={{ x: womanX, y: charY, scale: charScale, opacity: individualOpacity, right: '4%' }}
              className="absolute bottom-0 h-[62vh] sm:h-[72vh] md:h-[78vh] w-auto"
            >
              <img
                src="/images/female.png"
                alt="Bride"
                className="h-full w-auto object-cover rounded-2xl shadow-2xl select-none pointer-events-none"
                draggable={false}
              />
            </motion.div>

            {/* Couple photo fades in when they meet */}
            <motion.div
              style={{ opacity: coupleOpacity, scale: coupleScale }}
              className="absolute bottom-0 h-[62vh] sm:h-[72vh] md:h-[78vh] w-auto pointer-events-none z-10"
            >
              <img
                src="/images/couple.png"
                alt="Couple"
                className="h-full w-auto object-cover rounded-2xl shadow-2xl select-none"
                draggable={false}
              />
            </motion.div>

            {/* Soft golden halo */}
            <motion.div
              style={{
                opacity: useTransform(p, [0.5, 0.78], [0, 0.5]),
                scale:   useTransform(p, [0.5, 0.78], [0.6, 1]),
              }}
              className="absolute bottom-[20vh] h-[40vh] w-[40vh] rounded-full pointer-events-none"
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 65%)',
                }}
              />
            </motion.div>
          </div>

          {/* Event details — revealed as they come together */}
          <motion.div
            style={{ opacity: detailsOpacity, y: detailsY }}
            className="absolute inset-x-0 top-[4vh] sm:top-[6vh] z-30 flex justify-center px-6"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 text-gold">
                <Flower className="w-3.5 h-3.5" />
                <p className="font-sans-body text-[10px] sm:text-xs uppercase text-green-mid">
                  You are warmly invited to
                </p>
                <Flower className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-display text-green-deep text-5xl sm:text-7xl mt-2 leading-none">
                Baat Pakki
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3 text-gold">
                <Heart className="w-3 h-3" />
                <Ornament className="w-32 sm:w-44 h-5" />
                <Heart className="w-3 h-3" />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 font-serif-body">
                {/* Date pill */}
                <div className="inline-flex items-center gap-3 rounded-full border border-green-soft bg-white/70 backdrop-blur px-5 py-2.5 sm:px-7 sm:py-3" style={{ borderColor: 'rgba(122,158,135,0.5)', backgroundColor: 'rgba(253,250,245,0.7)' }}>
                  <Heart className="w-3 h-3 text-gold" />
                  <div className="text-left leading-tight">
                    <p className="font-sans-body text-[9px] sm:text-[10px] uppercase text-green-soft" style={{ letterSpacing: '0.3em' }}>
                      Date
                    </p>
                    <p className="text-base sm:text-xl text-green-deep whitespace-nowrap">
                      5 June 2026
                    </p>
                  </div>
                </div>

                <Flower className="hidden sm:block w-3.5 h-3.5 text-gold" style={{ opacity: 0.7 }} />

                {/* Venue pill */}
                <div className="inline-flex items-center gap-3 rounded-full border px-5 py-2.5 sm:px-7 sm:py-3" style={{ borderColor: 'rgba(122,158,135,0.5)', backgroundColor: 'rgba(253,250,245,0.7)' }}>
                  <Heart className="w-3 h-3 text-gold" />
                  <div className="text-left leading-tight">
                    <p className="font-sans-body text-[9px] sm:text-[10px] uppercase text-green-soft" style={{ letterSpacing: '0.3em' }}>
                      Venue
                    </p>
                    <p className="text-base sm:text-xl text-green-deep whitespace-nowrap">
                      W49, Emirates Hills
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: useTransform(p, [0, 0.06], [1, 0]) }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-green-soft"
          >
            <span className="font-sans-body text-[10px] uppercase">Scroll</span>
            <span className="block h-8 w-px animate-pulse" style={{ backgroundColor: 'var(--green-soft)', opacity: 0.6 }} />
          </motion.div>
        </div>
      </section>

      {/* Blessing section */}
      <section className="relative bg-background py-24 sm:py-32 px-6 text-center">
        <div className="flex items-center justify-center gap-3 text-gold" style={{ opacity: 0.8 }}>
          <Flower className="w-4 h-4" />
          <Ornament className="w-32 sm:w-44 h-5" />
          <Flower className="w-4 h-4" />
        </div>
        <p
          className="font-arabic text-green-deep mt-6 text-4xl sm:text-6xl leading-tight"
          dir="rtl"
          lang="ar"
        >
          تحت بركة الله
        </p>
        <p className="font-serif-body italic text-green-mid mt-4 text-base sm:text-lg" style={{ opacity: 0.8 }}>
          Under the blessings of Allah
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-gold" style={{ opacity: 0.7 }}>
          <Heart className="w-3 h-3" />
          <Heart className="w-2.5 h-2.5" style={{ opacity: 0.7 }} />
          <Heart className="w-3 h-3" />
        </div>
      </section>
    </main>
  )
}

export default InvitationPage
