import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Celebration particles ────────────────────────────────────────────────────
function HeartParticle() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </svg>
  )
}
function FlowerParticle() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <ellipse cx="12" cy="6"  rx="2.2" ry="3.4" />
      <ellipse cx="12" cy="18" rx="2.2" ry="3.4" />
      <ellipse cx="6"  cy="12" rx="3.4" ry="2.2" />
      <ellipse cx="18" cy="12" rx="3.4" ry="2.2" />
      <circle  cx="12" cy="12" r="1.2" />
    </svg>
  )
}

// ── Gold foil canvas texture ─────────────────────────────────────────────────
function drawGoldFoil(ctx, w, h, dpr) {
  // 1 ── base gradient
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0,    '#c9a030')
  g.addColorStop(0.25, '#e8cc58')
  g.addColorStop(0.50, '#f4dc6e')
  g.addColorStop(0.75, '#d4b040')
  g.addColorStop(1,    '#b89038')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // 2 ── radial centre highlight
  const r = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.65)
  r.addColorStop(0,   'rgba(255,248,190,0.45)')
  r.addColorStop(0.6, 'rgba(240,200,80,0.10)')
  r.addColorStop(1,   'rgba(160,100,10,0.18)')
  ctx.fillStyle = r
  ctx.fillRect(0, 0, w, h)

  // 3 ── fine grain — each dot is 1 actual pixel (1/dpr CSS px)
  const dot = 1 / dpr
  for (let i = 0; i < 1400; i++) {
    const alpha = Math.random() * 0.07
    const light = Math.random() > 0.5
    ctx.fillStyle = light
      ? `rgba(255,248,180,${alpha})`
      : `rgba(150,95,15,${alpha})`
    ctx.fillRect(Math.random() * w, Math.random() * h, dot, dot)
  }

  // 4 ── diagonal shimmer streaks
  for (let i = 0; i < 5; i++) {
    const sx = (Math.random() * 1.4 - 0.2) * w
    const sg = ctx.createLinearGradient(sx - w * 0.08, 0, sx + w * 0.08, h)
    sg.addColorStop(0,   'rgba(255,255,255,0)')
    sg.addColorStop(0.5, `rgba(255,255,255,${0.03 + Math.random() * 0.07})`)
    sg.addColorStop(1,   'rgba(255,255,255,0)')
    ctx.fillStyle = sg
    ctx.fillRect(0, 0, w, h)
  }

  // 5 ── "scratch to reveal" label
  ctx.save()
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor  = 'rgba(80,40,0,0.30)'
  ctx.shadowBlur   = 3
  ctx.shadowOffsetY = 1
  const fs = Math.max(11, Math.min(14, h * 0.14))
  ctx.font      = `italic ${fs}px 'Cormorant Garamond', Georgia, serif`
  ctx.fillStyle = 'rgba(72,38,4,0.68)'
  ctx.fillText('✦   scratch to reveal   ✦', w / 2, h / 2)
  ctx.restore()
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ScratchRevealCard() {
  const canvasRef    = useRef(null)
  const wrapRef      = useRef(null)
  const phaseRef     = useRef('idle')   // 'idle' | 'scratching' | 'fading' | 'revealed'
  const doScratchRef = useRef(null)     // always points to latest doScratch

  const [phase,     setPhase]     = useState('idle')
  const [particles, setParticles] = useState([])

  // mirror state → ref so event handlers never go stale
  useEffect(() => { phaseRef.current = phase }, [phase])

  // ── trigger full reveal ──────────────────────────────────────────────────
  const triggerReveal = useCallback(() => {
    if (phaseRef.current === 'fading' || phaseRef.current === 'revealed') return
    phaseRef.current = 'fading'
    setPhase('fading')
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        id:    i,
        left:  10 + Math.random() * 80,
        type:  i % 3 === 0 ? 'flower' : 'heart',
        delay: Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 80,
      }))
    )
    setTimeout(() => {
      phaseRef.current = 'revealed'
      setPhase('revealed')
    }, 700)
  }, [])

  // ── scratch one point ────────────────────────────────────────────────────
  const doScratch = useCallback((cssX, cssY) => {
    if (phaseRef.current === 'fading' || phaseRef.current === 'revealed') return
    if (phaseRef.current === 'idle') {
      phaseRef.current = 'scratching'
      setPhase('scratching')
    }
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    // draw with CSS coords — ctx is already scaled by DPR
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(cssX, cssY, 28, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'

    // sample every 8th pixel (actual pixels) to check cleared area
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0, total = 0
    for (let i = 3; i < data.length; i += 32) { total++; if (data[i] < 128) clear++ }
    if (clear / total > 0.48) triggerReveal()
  }, [triggerReveal])

  // keep ref current every render so the imperative handlers always use latest
  doScratchRef.current = doScratch

  // ── init canvas once ─────────────────────────────────────────────────────
  useEffect(() => {
    const wrap   = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width        = Math.round(width  * dpr)
    canvas.height       = Math.round(height * dpr)
    canvas.style.width  = width  + 'px'
    canvas.style.height = height + 'px'

    const ctx = canvas.getContext('2d')
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    drawGoldFoil(ctx, width, height, dpr)
  }, [])

  // ── imperative pointer events (touchmove needs passive:false) ────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let down = false

    const getXY = (e) => {
      const rect = canvas.getBoundingClientRect()
      const src  = e.touches ? e.touches[0] : e
      return [src.clientX - rect.left, src.clientY - rect.top]
    }

    const onDown = (e) => {
      down = true
      const [x, y] = getXY(e)
      doScratchRef.current?.(x, y)
    }
    const onMove = (e) => {
      if (!down) return
      e.preventDefault()
      const [x, y] = getXY(e)
      doScratchRef.current?.(x, y)
    }
    const onUp = () => { down = false }

    canvas.addEventListener('mousedown',  onDown)
    canvas.addEventListener('mousemove',  onMove)
    canvas.addEventListener('mouseup',    onUp)
    canvas.addEventListener('mouseleave', onUp)
    canvas.addEventListener('touchstart', onDown, { passive: true })
    canvas.addEventListener('touchmove',  onMove, { passive: false })
    canvas.addEventListener('touchend',   onUp)

    return () => {
      canvas.removeEventListener('mousedown',  onDown)
      canvas.removeEventListener('mousemove',  onMove)
      canvas.removeEventListener('mouseup',    onUp)
      canvas.removeEventListener('mouseleave', onUp)
      canvas.removeEventListener('touchstart', onDown)
      canvas.removeEventListener('touchmove',  onMove)
      canvas.removeEventListener('touchend',   onUp)
    }
  }, []) // empty deps — always calls via doScratchRef

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      className="bg-page text-center"
      style={{ padding: 'clamp(56px, 9vw, 100px) 24px clamp(48px, 8vw, 88px)' }}
    >
      {/* ── heading ─────────────────────────────────────────────────────── */}
      <p className="font-label text-mid" style={{ fontSize: 'clamp(8px,1.5vw,10px)', opacity: 0.72, letterSpacing: '0.2em' }}>
        THE DETAILS
      </p>
      <h2 className="font-display text-deep" style={{ fontSize: 'clamp(2.2rem,6vw,4rem)', lineHeight: 1, marginTop: '6px' }}>
        Our Celebration
      </h2>
      <p className="font-body text-mid" style={{ fontStyle: 'italic', fontSize: 'clamp(0.85rem,2vw,1.05rem)', marginTop: '10px', opacity: 0.7 }}>
        Unveil the details below
      </p>

      {/* ── scratch card ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
        <div
          ref={wrapRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 'clamp(280px, 72vw, 460px)',
            borderRadius: '16px',
            border: '1px solid rgba(184,150,62,0.22)',
            background: 'var(--bg)',
          }}
        >
          {/* ── revealed content ─────────────────────────────────────── */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(22px,4vh,36px) clamp(20px,5vw,44px)',
          }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <p className="font-label text-soft" style={{ fontSize: 'clamp(6.5px,1.2vw,8px)', letterSpacing: '0.28em' }}>
                DATE
              </p>
              <p className="font-display text-deep" style={{ fontSize: 'clamp(1.3rem,3.8vw,2rem)', marginTop: '4px', lineHeight: 1.1 }}>
                5 June 2026
              </p>
            </div>
            <div style={{ width: '1px', alignSelf: 'stretch', background: 'rgba(184,150,62,0.25)', margin: '0 clamp(12px,3vw,24px)' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <p className="font-label text-soft" style={{ fontSize: 'clamp(6.5px,1.2vw,8px)', letterSpacing: '0.28em' }}>
                VENUE
              </p>
              <p className="font-display text-deep" style={{ fontSize: 'clamp(1.3rem,3.8vw,2rem)', marginTop: '4px', lineHeight: 1.1 }}>
                W49, Emirates Hills
              </p>
            </div>
          </div>

          {/* ── gold scratch canvas ──────────────────────────────────── */}
          {phase !== 'revealed' && (
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '16px',
                cursor: 'crosshair',
                touchAction: 'none',
                opacity: phase === 'fading' ? 0 : 1,
                transition: 'opacity 0.7s ease',
                pointerEvents: phase === 'fading' ? 'none' : 'auto',
              }}
            />
          )}

          {/* ── celebration particles ────────────────────────────────── */}
          <AnimatePresence>
            {phase === 'fading' && particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, y: 0, x: 0 }}
                animate={{ opacity: 0, y: -72, x: p.drift }}
                exit={{}}
                transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: p.left + '%',
                  bottom: '50%',
                  transform: 'translateX(-50%)',
                  color: 'var(--gold)',
                  pointerEvents: 'none',
                  zIndex: 20,
                }}
              >
                {p.type === 'heart' ? <HeartParticle /> : <FlowerParticle />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── post-reveal message ──────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'revealed' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-label text-gold"
            style={{ fontSize: 'clamp(7px,1.3vw,9px)', letterSpacing: '0.22em', marginTop: '20px', opacity: 0.65 }}
          >
            ✦&nbsp;&nbsp;WITH JOY &amp; BLESSINGS&nbsp;&nbsp;✦
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
