import { useMemo } from 'react'
import { motion } from 'framer-motion'

const FloatingHearts = ({ count = 15 }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        duration: 5 + Math.random() * 3,
        xDrift: (Math.random() - 0.5) * 60,
      })),
    [count]
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 1, x: 0 }}
          animate={{
            y: -(typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: [1, 1, 0],
            x: heart.xDrift,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${heart.left}%`,
            bottom: `-20px`,
          }}
          className="absolute text-gold text-opacity-60"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gold opacity-50"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingHearts
