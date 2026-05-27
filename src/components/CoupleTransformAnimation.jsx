import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const CoupleTransformAnimation = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Female moves from left to center
  const femaleX = useTransform(scrollYProgress, [0, 0.6], ['-50%', '0%'])
  const femaleOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.8, 0])

  // Male moves from right to center
  const maleX = useTransform(scrollYProgress, [0, 0.6], ['50%', '0%'])
  const maleOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.8, 0])

  // Couple image fades in
  const coupleOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1])
  const coupleScale = useTransform(scrollYProgress, [0.4, 0.8], [0.95, 1])

  // Blur effect — must be a CSS string for filter to work
  const coupleFilter = useTransform(
    scrollYProgress,
    [0.4, 0.6, 0.8],
    ['blur(10px)', 'blur(5px)', 'blur(0px)']
  )

  // Event card visibility
  const cardOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1])

  return (
    // 300vh gives the scroll animation room to breathe across three viewport heights
    <div
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Individual Images Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Female Image */}
          <motion.div
            style={{ x: femaleX, opacity: femaleOpacity }}
            className="absolute w-48 md:w-56 h-96 md:h-[500px]"
          >
            <img
              src="/images/female.jpg"
              alt="Bride"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </motion.div>

          {/* Male Image */}
          <motion.div
            style={{ x: maleX, opacity: maleOpacity }}
            className="absolute w-48 md:w-56 h-96 md:h-[500px]"
          >
            <img
              src="/images/male.jpg"
              alt="Groom"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Couple Image - Fades in as individual images fade out */}
        <motion.div
          style={{
            opacity: coupleOpacity,
            scale: coupleScale,
            filter: coupleFilter,
          }}
          className="absolute w-64 md:w-80 h-96 md:h-[550px] pointer-events-none"
        >
          <img
            src="/images/couple.jpg"
            alt="Couple"
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Event Card - Fades in at the end */}
        <motion.div
          style={{ opacity: cardOpacity }}
          className="absolute bottom-24 md:bottom-32 z-10"
        >
          <div className="bg-white bg-opacity-95 backdrop-blur border border-deep-green rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-md mx-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-green mb-6">
              Baat Pakki
            </h2>
            <div className="space-y-3">
              <p className="text-lg text-sage-green">
                <span className="font-semibold">5th June 2026</span>
              </p>
              <p className="text-lg text-sage-green">
                Venue: <span className="font-semibold">W49</span>
              </p>
            </div>

            {/* Decorative hearts */}
            <div className="flex justify-center gap-3 mt-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="text-gold opacity-50">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CoupleTransformAnimation
