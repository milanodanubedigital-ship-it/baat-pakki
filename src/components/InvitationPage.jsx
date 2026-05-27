import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// ─── SVG primitives ──────────────────────────────────────────────────────────

function Ornament({ className = '', style = {} }) {
  return (
    <svg viewBox="0 0 260 20" className={className} style={style} fill="none" aria-hidden>
      <path d="M0 10 H98"  stroke="currentColor" strokeWidth="0.5" />
      <path d="M162 10 H260" stroke="currentColor" strokeWidth="0.5" />
      {/* small diamond accents on lines */}
      <path d="M24 10 L27 7 L30 10 L27 13 Z" stroke="currentColor" strokeWidth="0.45" />
      <path d="M230 10 L233 7 L236 10 L233 13 Z" stroke="currentColor" strokeWidth="0.45" />
      {/* center medallion */}
      <circle cx="130" cy="10" r="2.8" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="130" cy="10" r="0.9" fill="currentColor" />
      {/* flanking chevrons */}
      <path d="M114 10 L118 6 M114 10 L118 14" stroke="currentColor" strokeWidth="0.5" />
      <path d="M146 10 L142 6 M146 10 L142 14" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}

function Heart({ className = '', style = {} }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden>
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
        stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
    </svg>
  )
}

// 8-petal botanical flower — more refined than Lovable's 4-petal version
function Flower({ className = '', style = {} }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden>
      {/* cardinal petals */}
      <ellipse cx="12" cy="5.2"  rx="1.6" ry="2.8" stroke="currentColor" strokeWidth="0.72" />
      <ellipse cx="12" cy="18.8" rx="1.6" ry="2.8" stroke="currentColor" strokeWidth="0.72" />
      <ellipse cx="5.2"  cy="12" rx="2.8" ry="1.6" stroke="currentColor" strokeWidth="0.72" />
      <ellipse cx="18.8" cy="12" rx="2.8" ry="1.6" stroke="currentColor" strokeWidth="0.72" />
      {/* diagonal petals */}
      <ellipse cx="7.5" cy="7.5"   rx="1.25" ry="2.1" transform="rotate(-45 7.5 7.5)"   stroke="currentColor" strokeWidth="0.62" />
      <ellipse cx="16.5" cy="7.5"  rx="1.25" ry="2.1" transform="rotate(45 16.5 7.5)"   stroke="currentColor" strokeWidth="0.62" />
      <ellipse cx="7.5"  cy="16.5" rx="1.25" ry="2.1" transform="rotate(45 7.5 16.5)"   stroke="currentColor" strokeWidth="0.62" />
      <ellipse cx="16.5" cy="16.5" rx="1.25" ry="2.1" transform="rotate(-45 16.5 16.5)" stroke="currentColor" strokeWidth="0.62" />
      <circle cx="12" cy="12" r="1.05" fill="currentColor" />
    </svg>
  )
}

// Botanical sprig with graceful arcing stem
function Sprig({ flip = false, style = {}, className = '' }) {
  return (
    <svg
      viewBox="0 0 120 240"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, ...style }}
    >
      <path
        d="M60 232 C 60 182, 50 142, 30 102 C 20 82, 18 62, 24 32"
        stroke="currentColor" strokeWidth="0.75" strokeLinecap="round"
      />
      {Array.from({ length: 10 }).map((_, i) => {
        const y = 204 - i * 19
        const x = 60 - i * 3.2
        return (
          <g key={i}>
            <path
              d={`M${x} ${y} C ${x-17} ${y-3}, ${x-21} ${y-13}, ${x-13} ${y-21}`}
              stroke="currentColor" strokeWidth="0.6" fill="none"
            />
            <path
              d={`M${x} ${y-7} C ${x+13} ${y-11}, ${x+19} ${y-21}, ${x+11} ${y-29}`}
              stroke="currentColor" strokeWidth="0.6" fill="none"
            />
          </g>
        )
      })}
    </svg>
  )
}

// ─── Photo mask helper ────────────────────────────────────────────────────────
const photoMask = {
  WebkitMaskImage: 'linear-gradient(to bottom, black 38%, transparent 94%)',
  maskImage:       'linear-gradient(to bottom, black 38%, transparent 94%)',
}

// ─── Main component ───────────────────────────────────────────────────────────

const InvitationPage = () => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Languid spring — more romantic than Lovable's snappy 80/24
  const p = useSpring(scrollYProgress, { stiffness: 52, damping: 20, mass: 0.9 })

  // Gold progress bar driven by raw scroll (not spring) for accuracy
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Photos: man LEFT moves right, woman RIGHT moves left
  const manX   = useTransform(p, [0, 0.72], ['-4%', '20%'])
  const womanX = useTransform(p, [0, 0.72], ['4%', '-20%'])
  const charY  = useTransform(p, [0, 1],    ['0%', '12%'])
  const charScale = useTransform(p, [0, 0.72, 1], [1, 1.012, 1])

  // Individual photos fade out; couple fades in
  const indivOpacity  = useTransform(p, [0.36, 0.58], [1, 0])
  const coupleOpacity = useTransform(p, [0.46, 0.70], [0, 1])
  const coupleScale   = useTransform(p, [0.46, 0.70], [0.94, 1])

  // Atmospheric golden bloom behind couple
  const bloomOpacity = useTransform(p, [0.42, 0.72], [0, 0.9])
  const bloomScale   = useTransform(p, [0.42, 0.72], [0.4, 1])

  // Hero copy fades out and lifts
  const heroOpacity = useTransform(p, [0, 0.20], [1, 0])
  const heroY       = useTransform(p, [0, 0.24], [0, -20])

  // Corner sprigs fade as you scroll
  const sprigOpacity = useTransform(p, [0, 0.48], [0.42, 0.06])

  // Event detail card
  const detailsOpacity = useTransform(p, [0.58, 0.80], [0, 1])
  const detailsY       = useTransform(p, [0.58, 0.80], [28, 0])

  // Scroll hint
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0])

  return (
    <main style={{ backgroundColor: 'var(--bg)', color: 'var(--green-deep)' }}>

      {/* ── SCROLL STAGE ───────────────────────────────────────────────────── */}
      <section ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0,
          height: '100dvh', width: '100%',
          overflow: 'hidden',
        }}>

          {/* Gold scroll progress line */}
          <motion.div style={{
            position: 'absolute', top: 0, left: 0, zIndex: 50,
            height: '1px',
            width: progressW,
            background: 'linear-gradient(to right, transparent, var(--gold-light) 20%, var(--gold) 50%, var(--gold-light) 80%, transparent)',
          }} />

          {/* Corner botanical sprigs */}
          <motion.div style={{ opacity: sprigOpacity, position: 'absolute', top: -32, left: -16, width: 'clamp(80px, 12vw, 144px)', color: 'var(--green-soft)', pointerEvents: 'none' }}>
            <Sprig />
          </motion.div>
          <motion.div style={{ opacity: sprigOpacity, position: 'absolute', top: -32, right: -16, width: 'clamp(80px, 12vw, 144px)', color: 'var(--green-soft)', pointerEvents: 'none' }}>
            <Sprig flip />
          </motion.div>

          {/* ── HERO COPY ── */}
          <motion.div style={{
            opacity: heroOpacity, y: heroY,
            position: 'absolute', insetInline: 0, top: '6vh',
            zIndex: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', padding: '0 24px',
          }}>
            <p className="font-label text-mid" style={{ fontSize: '9px', opacity: 0.72 }}>
              WITH JOYFUL HEARTS
            </p>
            <Ornament
              className="text-gold"
              style={{ width: 'clamp(148px, 22vw, 240px)', height: '18px', marginTop: '10px', opacity: 0.68 }}
            />
            <h1 className="font-display text-deep" style={{
              fontSize: 'clamp(3rem, 8.5vw, 6.5rem)',
              lineHeight: 1,
              marginTop: '6px',
            }}>
              Baat Pakki
            </h1>
            <p className="font-body text-mid" style={{
              fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)',
              marginTop: '10px',
              maxWidth: '300px',
              opacity: 0.78,
              lineHeight: 1.5,
            }}>
              A quiet promise, sealed between two families.
            </p>
          </motion.div>

          {/* ── PHOTO STAGE ── */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

            {/* Man — LEFT */}
            <motion.div style={{
              x: manX, y: charY, scale: charScale, opacity: indivOpacity,
              position: 'absolute', bottom: 0, left: '2%',
            }}>
              <div style={{
                height: 'clamp(260px, 63vh, 560px)',
                width: 'clamp(116px, 24vw, 220px)',
                ...photoMask,
              }}>
                <img
                  src="/images/male.png" alt="Groom"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Woman — RIGHT */}
            <motion.div style={{
              x: womanX, y: charY, scale: charScale, opacity: indivOpacity,
              position: 'absolute', bottom: 0, right: '2%',
            }}>
              <div style={{
                height: 'clamp(260px, 63vh, 560px)',
                width: 'clamp(116px, 24vw, 220px)',
                ...photoMask,
              }}>
                <img
                  src="/images/female.png" alt="Bride"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Couple photo */}
            <motion.div style={{
              opacity: coupleOpacity, scale: coupleScale,
              position: 'absolute', bottom: 0,
              zIndex: 10, pointerEvents: 'none',
            }}>
              <div style={{
                height: 'clamp(260px, 63vh, 560px)',
                width: 'clamp(116px, 24vw, 220px)',
                ...photoMask,
              }}>
                <img
                  src="/images/couple.png" alt="Couple"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Atmospheric golden bloom */}
            <motion.div style={{
              opacity: bloomOpacity, scale: bloomScale,
              position: 'absolute', bottom: '10vh',
              width: 'clamp(260px, 52vh, 480px)',
              height: 'clamp(260px, 52vh, 480px)',
              borderRadius: '50%',
              pointerEvents: 'none',
              background: 'radial-gradient(circle, rgba(184,150,62,0.16) 0%, rgba(184,150,62,0.06) 42%, transparent 68%)',
            }} />
          </div>

          {/* ── EVENT DETAILS REVEAL ── */}
          <motion.div style={{
            opacity: detailsOpacity, y: detailsY,
            position: 'absolute', insetInline: 0, top: '5vh',
            zIndex: 30,
            display: 'flex', justifyContent: 'center',
            padding: '0 20px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--gold)', opacity: 0.7 }}>
                <Flower style={{ width: '12px', height: '12px' }} />
                <p className="font-label text-mid" style={{ fontSize: '8.5px', opacity: 0.85 }}>
                  YOU ARE WARMLY INVITED TO
                </p>
                <Flower style={{ width: '12px', height: '12px' }} />
              </div>

              <h2 className="font-display text-deep" style={{
                fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
                lineHeight: 1, marginTop: '4px',
              }}>
                Baat Pakki
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '8px', color: 'var(--gold)', opacity: 0.6 }}>
                <Heart style={{ width: '10px', height: '10px' }} />
                <Ornament style={{ width: 'clamp(100px, 16vw, 168px)', height: '16px' }} className="text-gold" />
                <Heart style={{ width: '10px', height: '10px' }} />
              </div>

              {/* Unified event card */}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                marginTop: '18px',
                background: 'rgba(253,250,245,0.88)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(184,150,62,0.2)',
                borderRadius: '13px',
                padding: '12px 0',
              }}>
                <div style={{ padding: '0 24px', textAlign: 'center' }}>
                  <p className="font-label text-soft" style={{ fontSize: '7.5px', letterSpacing: '0.28em' }}>
                    DATE
                  </p>
                  <p className="font-body text-deep" style={{ fontSize: 'clamp(0.9rem, 2.4vw, 1.15rem)', marginTop: '2px' }}>
                    5 June 2026
                  </p>
                </div>
                <div style={{ width: '1px', height: '28px', background: 'rgba(184,150,62,0.22)', flexShrink: 0 }} />
                <div style={{ padding: '0 24px', textAlign: 'center' }}>
                  <p className="font-label text-soft" style={{ fontSize: '7.5px', letterSpacing: '0.28em' }}>
                    VENUE
                  </p>
                  <p className="font-body text-deep" style={{ fontSize: 'clamp(0.9rem, 2.4vw, 1.15rem)', marginTop: '2px', whiteSpace: 'nowrap' }}>
                    W49, Emirates Hills
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── SCROLL HINT ── */}
          <motion.div style={{
            opacity: hintOpacity,
            position: 'absolute', bottom: '28px',
            left: '50%', transform: 'translateX(-50%)',
            zIndex: 40,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}>
            <span className="font-label text-soft" style={{ fontSize: '8px', letterSpacing: '0.22em' }}>
              SCROLL
            </span>
            <motion.div
              animate={{ scaleY: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '1px', height: '26px',
                background: 'var(--green-soft)',
                transformOrigin: 'top',
              }}
            />
          </motion.div>

          {/* Atmospheric bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '22vh', pointerEvents: 'none', zIndex: 5,
            background: 'linear-gradient(to top, rgba(253,250,245,0.55), transparent)',
          }} />
        </div>
      </section>

      {/* ── BLESSING SECTION ───────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundColor: 'var(--bg)',
        padding: 'clamp(64px, 11vw, 112px) 24px clamp(72px, 12vw, 128px)',
        overflow: 'hidden',
      }}>
        {/* Subtle botanical frame */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 'clamp(64px, 10vw, 112px)', color: 'var(--green-soft)', opacity: 0.18, pointerEvents: 'none' }}>
          <Sprig />
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 'clamp(64px, 10vw, 112px)', color: 'var(--green-soft)', opacity: 0.18, pointerEvents: 'none' }}>
          <Sprig flip />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}
        >
          {/* Top ornamental row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'var(--gold)', opacity: 0.62 }}>
            <Flower style={{ width: '15px', height: '15px' }} />
            <Ornament className="text-gold" style={{ width: 'clamp(120px, 18vw, 200px)', height: '18px' }} />
            <Flower style={{ width: '15px', height: '15px' }} />
          </div>

          {/* Arabic blessing */}
          <p
            className="font-arabic text-deep"
            dir="rtl" lang="ar"
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 4.8rem)',
              lineHeight: 1.35,
              marginTop: '28px',
            }}
          >
            تحت بركة الله
          </p>

          {/* Hairline gold rule */}
          <div style={{
            width: '40px', height: '1px',
            background: 'rgba(184,150,62,0.38)',
            margin: '20px auto 0',
          }} />

          {/* English translation */}
          <p
            className="font-body text-mid"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 2.4vw, 1.2rem)',
              marginTop: '16px',
              opacity: 0.78,
              letterSpacing: '0.01em',
            }}
          >
            Under the blessings of Allah
          </p>

          {/* Closing hearts */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            marginTop: '36px', color: 'var(--gold)', opacity: 0.52,
          }}>
            <Heart style={{ width: '11px', height: '11px' }} />
            <Heart style={{ width: '8px', height: '8px', opacity: 0.55 }} />
            <Heart style={{ width: '11px', height: '11px' }} />
          </div>
        </motion.div>
      </section>
    </main>
  )
}

export default InvitationPage
