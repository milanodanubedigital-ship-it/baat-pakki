export const Flower = ({ x, y, size = 40, rotation = 0 }) => (
  <div
    className="absolute opacity-30 pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="#d4af37"
      strokeWidth="1"
    >
      {/* Center circle */}
      <circle cx="20" cy="20" r="4" fill="#d4af37" />
      {/* Petals */}
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
            opacity="0.7"
          />
        )
      })}
    </svg>
  </div>
)

const FloralDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left corner */}
      <Flower x={-3} y={-3} size={60} rotation={15} />
      <Flower x={2} y={5} size={40} rotation={45} />

      {/* Top right corner */}
      <Flower x={95} y={-2} size={55} rotation={-20} />
      <Flower x={90} y={6} size={35} rotation={30} />

      {/* Bottom left */}
      <Flower x={-2} y={92} size={50} rotation={60} />

      {/* Bottom right */}
      <Flower x={94} y={90} size={45} rotation={-45} />

      {/* Center accents - subtle */}
      <Flower x={8} y={50} size={30} rotation={0} />
      <Flower x={88} y={55} size={28} rotation={90} />
    </div>
  )
}

export default FloralDecorations
