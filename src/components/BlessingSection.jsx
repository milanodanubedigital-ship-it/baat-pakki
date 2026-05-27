import { motion } from 'framer-motion'
import FloralDecorations from './FloralDecorations'

const BlessingSection = () => {
  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden px-4">
      <FloralDecorations />

      {/* Blessing Text Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-center space-y-8 relative z-10"
      >
        {/* Arabic Text */}
        <div className="space-y-4">
          <p className="text-5xl md:text-6xl font-serif text-deep-green tracking-wide">
            تحت بركة الله
          </p>
          <div className="h-1 w-20 bg-gold mx-auto"></div>
        </div>

        {/* English Translation */}
        <div className="space-y-4">
          <p className="text-2xl md:text-3xl font-light text-sage-green">
            Under the blessings of Allah
          </p>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex justify-center gap-6 mt-12"
        >
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1.5"
              className="opacity-60"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ))}
        </motion.div>

        {/* Closing Message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-lg md:text-xl text-sage-green font-light mt-16 max-w-2xl mx-auto leading-relaxed"
        >
          May this union be filled with love, respect, and countless blessings.
          <br />
          <span className="text-sm mt-4 block">We invite you to celebrate this beautiful occasion.</span>
        </motion.p>
      </motion.div>

      {/* Bottom Accent */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="#d4af37"
          strokeWidth="0.5"
          className="opacity-40"
        >
          <circle cx="20" cy="20" r="4" fill="#d4af37" />
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 20 + 10 * Math.cos(rad)
            const y1 = 20 + 10 * Math.sin(rad)
            return (
              <ellipse
                key={angle}
                cx={x1}
                cy={y1}
                rx="5"
                ry="8"
                transform={`rotate(${angle} 20 20)`}
                fill="#d4af37"
                opacity="0.5"
              />
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}

export default BlessingSection
