import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollReveal } from './hooks'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'
import Cursor from './components/Cursor'

import Home from './pages/Home'
import { About, Projects, Gallery, Contact, Legal } from './pages/Pages'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

function GoldWipe() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + '-wipe'}
        style={{
          position: 'fixed', inset: 0, zIndex: 8999,
          background: 'var(--gold)',
          pointerEvents: 'none',
        }}
        initial={{ scaleX: 0, originX: '0%' }}
        animate={{ scaleX: [0, 1, 0], originX: ['0%', '0%', '100%'] }}
        transition={{ duration: 0.8, times: [0, 0.45, 1], ease: [0.77, 0, 0.175, 1] }}
      />
    </AnimatePresence>
  )
}

function ScrollRevealInit() {
  useScrollReveal()
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <>
      <GoldWipe />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/legal" element={<PageTransition><Legal /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <ScrollRevealInit />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <WhatsApp />
    </BrowserRouter>
  )
}
