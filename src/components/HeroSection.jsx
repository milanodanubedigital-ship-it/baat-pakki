import { motion } from 'framer-motion'
import HeartOutlineBackground from './HeartOutlineBackground'
import FloralDecorations from './FloralDecorations'

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      <HeartOutlineBackground />
      <FloralDecorations />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-deep-green mb-3 font-serif tracking-tight">
          Baat Pakki
        </h1>
        <p className="text-xl md:text-2xl text-sage-green font-light">
          An elegant celebration of togetherness
        </p>
      </motion.div>

      {/* Images Container */}
      <div className="relative w-full h-80 md:h-96 lg:h-[500px] mb-12 flex items-center justify-center px-4">
        {/* Female Image - Left */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute left-0 md:left-10 w-40 md:w-48 h-80 md:h-96"
        >
          <img
            src="/images/female.jpg"
            alt="Bride"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Male Image - Right */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute right-0 md:right-10 w-40 md:w-48 h-80 md:h-96"
        >
          <img
            src="/images/male.jpg"
            alt="Groom"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Center Heart Accent */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative z-10 mt-8 text-center"
      >
        <p className="text-sm text-sage-green mb-3">Scroll to begin</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-deep-green mx-auto"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </motion.div>
    </div>
  )
}

export default HeroSection
