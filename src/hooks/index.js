import { useEffect, useRef, useState, useCallback } from 'react'

// ===== CURSOR HOOK =====
const HOVER_TAGS = new Set(['A', 'BUTTON', 'SELECT', 'TEXTAREA', 'INPUT', 'LABEL'])
const HOVER_CLASSES = ['project-card', 'gallery-item', 'service-item', 'testimonial-card', 'filter-btn', 'nav-link', 'nav-cta', 'wa-float', 'proj-tab', 'footer-link', 'footer-social-btn']

function isHoverable(el) {
  if (!el || el === document.body) return false
  if (HOVER_TAGS.has(el.tagName)) return true
  if (el.classList && HOVER_CLASSES.some(c => el.classList.contains(c))) return true
  return isHoverable(el.parentElement)
}

export function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let cursorX = 0, cursorY = 0
    let ringX = 0, ringY = 0
    let raf

    const onMove = (e) => {
      cursorX = e.clientX
      cursorY = e.clientY
      dot.style.left = cursorX + 'px'
      dot.style.top = cursorY + 'px'
      // Global hover detection via target inspection
      if (isHoverable(e.target)) {
        document.body.classList.add('hovering')
      } else {
        document.body.classList.remove('hovering')
      }
    }

    const animate = () => {
      ringX += (cursorX - ringX) * 0.12
      ringY += (cursorY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      raf = requestAnimationFrame(animate)
    }

    const onDown = () => document.body.classList.add('clicking')
    const onUp = () => document.body.classList.remove('clicking')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])
}




// ===== SCROLL REVEAL =====
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}

// ===== COUNTER =====
export function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

// ===== PARALLAX =====
export function useParallax(speed = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const offset = rect.top * speed
      el.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}

// ===== TILT =====
export function useTilt(ref) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rx = ((y - cy) / cy) * -8
      const ry = ((x - cx) / cx) * 8
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
      el.style.transition = 'transform 0.1s ease'
    }
    const onLeave = () => {
      el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref])
}

// ===== PARTICLES =====
export function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef?.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    let mouse = { x: null, y: null }
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMouse)

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        if (mouse.x) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) { p.x -= dx * 0.008; p.y -= dy * 0.008 }
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`
        ctx.fill()
      })
      particles.forEach((p, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(201,168,76,${0.08 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [canvasRef])
}
