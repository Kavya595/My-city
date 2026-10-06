import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 12
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(onComplete, 400)
      }
      setProgress(Math.min(current, 100))
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }}
    >
      <motion.div
        className="loader-logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        MyCity
      </motion.div>
      <div className="loader-bar-wrap">
        <motion.div
          className="loader-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loader-pct">{Math.round(progress)}%</div>
    </motion.div>
  )
}
