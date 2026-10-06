import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useParticles, useTilt } from '../hooks'
import { STATS, MARQUEE_ITEMS, SERVICES, TESTIMONIALS, PROJECTS } from '../data'
import '../styles/home.css'

// ─── PARTICLES ───────────────────────────────────────────
function ParticlesCanvas() {
  const canvasRef = useRef(null)
  useParticles(canvasRef)
  return <canvas ref={canvasRef} className="particles-canvas" />
}

// ─── HERO ─────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <ParticlesCanvas />
      <div className="hero-grid" />
      <div className="blob blob1" />
      <div className="blob blob2" />
      <FloatingNums />
      <HeroBuilding />

      <div className="container hero-content">
        <h1 className="hero-h1">
          {['We Build', 'Dreams', 'Into Stone'].map((line, i) => (
            <motion.span
              key={i}
              className={`hero-h1-line ${i === 1 ? 'italic' : ''}`}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          Thoughtfully planned properties, strategic locations, and quality infrastructure — built for people who think beyond today.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <button className="btn btn-gold" onClick={() => navigate('/projects')}>
            <span>Explore Projects →</span>
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/about')}>
            Our Story
          </button>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="hero-scroll-line" />
        Scroll to explore
      </motion.div>

      <motion.div
        className="hero-counter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="hero-counter-num">5+</div>
        <div className="hero-counter-label">Properties Sold</div>
      </motion.div>
    </section>
  )
}

function FloatingNums() {
  const nums = ['01', '05', '500', '2023', '100%', 'A+', '4.8★', '5★', 'RERA', 'ECO']
  return (
    <div className="floating-nums" aria-hidden>
      {nums.map((n, i) => (
        <div
          key={i}
          className="float-num"
          style={{
            left: `${10 + i * 9}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${10 + (i % 3) * 3}s`,
          }}
        >
          {n}
        </div>
      ))}
    </div>
  )
}

function HeroBuilding() {
  return (
    <div className="hero-building" aria-hidden>
      <svg viewBox="0 0 600 700" fill="none" preserveAspectRatio="xMaxYMax meet">
        <rect className="building-fill" x="200" y="100" width="160" height="600" fill="rgba(201,168,76,0.04)" />
        <rect className="building-fill" x="100" y="250" width="100" height="450" fill="rgba(201,168,76,0.03)" />
        <rect className="building-fill" x="360" y="200" width="120" height="500" fill="rgba(201,168,76,0.03)" />
        <g className="building-fill" fill="rgba(201,168,76,0.15)">
          {[120, 158, 196, 234, 272, 310].map((y) =>
            [215, 245, 275, 305].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="18" height="24" rx="1"
                fill={y === 310 && (x === 215 || x === 275) ? 'rgba(201,168,76,0.4)' : undefined} />
            ))
          )}
        </g>
        <polyline className="building-line" points="200,700 200,100 360,100 360,700" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" />
        <line className="building-line" x1="100" y1="700" x2="100" y2="250" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
        <line className="building-line" x1="200" y1="250" x2="100" y2="250" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
        <line className="building-line" x1="480" y1="700" x2="480" y2="200" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
        <line className="building-line" x1="360" y1="200" x2="480" y2="200" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
        <line className="building-line" x1="280" y1="100" x2="280" y2="20" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" />
        <circle className="building-fill" cx="280" cy="18" r="4" fill="var(--gold)" />
        <line className="building-line" x1="60" y1="700" x2="560" y2="700" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      </svg>
    </div>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span>{item}</span>
            <div className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── STAT COUNTER ─────────────────────────────────────────
function StatCounter({ num, suffix = '', prefix = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timeout = setTimeout(() => {
      let start = null
      const duration = 1500
      const step = (ts) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * num))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timeout)
  }, [inView, num, delay])

  return (
    <div ref={ref} className="stat-num">
      {prefix}<span>{count}</span>{suffix}
    </div>
  )
}

function StatsStrip() {
  return (
    <section className="stats-strip" aria-label="My City Infra highlights">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className={`stat-item ${i === 2 ? 'stat-item-featured' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="stat-content">
              <StatCounter num={s.num} suffix={s.suffix} prefix={s.prefix || ''} delay={i * 100} />
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── ABOUT PREVIEW ────────────────────────────────────────
function AboutPreview() {
  const navigate = useNavigate()
  return (
    <section className="section about-preview">
      <div className="container">
        <div className="about-layout">
          <div className="about-left">
            <motion.div className="tag"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              About MYCity Infra Developers
            </motion.div>
            <motion.h2 className="section-title"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
              We Don't Just<br />Build — We<br /><em>Create Legacy</em>
            </motion.h2>
            <motion.div className="gold-line"
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} />
            <motion.p className="section-subtitle"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}>
              Since 2023, My City Infra Developers has focused on thoughtfully planned properties, strategic locations and quality infrastructure. Guided by “My City, Your Future”, we aim to make every investment journey clear and confident.
            </motion.p>
            <motion.div className="about-values"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.7 }}>
              {[
                { num: '01', title: 'Legal Clarity', desc: 'Clear documentation and a straightforward property-buying experience.' },
                { num: '02', title: 'Strategic Locations', desc: 'Projects selected around emerging growth corridors and connectivity.' },
                { num: '03', title: 'Transparent Transactions', desc: 'Clear communication, transparent dealings and customer support at every step.' },
              ].map((v) => (
                <div key={v.num} className="about-value-item">
                  <div className="about-value-num">{v.num}</div>
                  <div>
                    <div className="about-value-title">{v.title}</div>
                    <div className="about-value-desc">{v.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.button className="btn btn-gold" onClick={() => navigate('/about')}
              style={{ marginTop: 36 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <span>Discover Our Story →</span>
            </motion.button>
          </div>

          <motion.div className="about-right"
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}>
            <div className="about-visual">
              <div className="about-visual-inner">
                <div className="ring ring1" />
                <div className="ring ring2" />
                <div className="ring ring3" />
                <div className="about-center-text">
                  <div className="about-center-num">3+</div>
                  <div className="about-center-label">Years of Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── FEATURED PROJECTS ────────────────────────────────────
// ─── PROJECT CARD (RICH) ──────────────────────────────────
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef(null)
  useTilt(cardRef)

  const gradients = [
    'linear-gradient(160deg,#0d0d18 0%,#1a1a30 100%)',
    'linear-gradient(160deg,#0f0a00 0%,#1a1200 100%)',
    'linear-gradient(160deg,#030a0d 0%,#061520 100%)',
    'linear-gradient(160deg,#080c0a 0%,#101a12 100%)',
  ]

  return (
    <motion.div
      ref={cardRef}
      className={`project-card ${expanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="project-card-bg" style={{ background: gradients[index % gradients.length] }}>
        {project.image && (
          <img src={project.image} alt={project.name} className="project-card-img" />
        )}
      </div>
      <div className="project-card-overlay" />
      <div className="project-card-hover-overlay" />

      <div className="project-card-expand-hint">
        {expanded ? '✕ Close' : '+ Details'}
      </div>

      <div className="project-card-body">
        <div className="project-card-num">{project.num} — {project.type}</div>
        <div className="project-card-title">{project.name}</div>
        <div className="project-card-sub">📍 {project.location}</div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="project-card-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <p className="project-card-desc">{project.description}</p>
              <button
                className="btn btn-gold pc-cta"
                onClick={() => window.location.href = '/contact'}
              >
                <span>Enquire Now →</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && <div className="project-card-cta">+ Details</div>}
      </div>
    </motion.div>
  )
}
function BuildingSVG({ index }) {
  const svgs = [
    <svg key={0} width="200" height="300" viewBox="0 0 200 300" fill="none" opacity="0.4">
      <rect x="60" y="50" width="80" height="250" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      <rect x="20" y="150" width="40" height="150" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
      <rect x="140" y="120" width="50" height="180" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
      {[60, 88].map(y => [70, 92, 114].map(x => <rect key={`${x}${y}`} x={x} y={y} width="12" height="16" fill="rgba(201,168,76,0.3)" />))}
      <line x1="100" y1="50" x2="100" y2="10" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <circle cx="100" cy="8" r="3" fill="rgba(201,168,76,0.6)" />
    </svg>,
    <svg key={1} width="200" height="300" viewBox="0 0 200 300" fill="none" opacity="0.4">
      <rect x="30" y="80" width="140" height="220" fill="rgba(201,168,76,0.07)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      <rect x="50" y="40" width="100" height="220" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
      {[90, 135].map(y => [40, 70, 100, 130].map(x => <rect key={`${x}${y}`} x={x} y={y} width="20" height="30" fill="rgba(201,168,76,0.25)" />))}
    </svg>,
    <svg key={2} width="200" height="300" viewBox="0 0 200 300" fill="none" opacity="0.4">
      <rect x="20" y="100" width="60" height="200" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
      <rect x="90" y="60" width="90" height="240" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      <circle cx="135" cy="30" r="20" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
      {[70, 102].map(y => [100, 122, 144].map(x => <rect key={`${x}${y}`} x={x} y={y} width="14" height="20" fill="rgba(201,168,76,0.3)" />))}
    </svg>,
  ]
  return svgs[index % svgs.length]
}

function FeaturedProjects() {
  const navigate = useNavigate()
  const ongoing = [PROJECTS.warangal[0], PROJECTS.warangal[1], PROJECTS.fourthcity[0], PROJECTS.ExitNo12[0]]
  return (
    <section className="section" style={{ background: 'var(--dark)' }}>
      <div className="container">
        <div className="projects-header">
          <div>
            <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Featured Properties
            </motion.div>
            <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
              Our <em>Signature</em><br />Developments
            </motion.h2>
          </div>
          <motion.button className="btn btn-outline" onClick={() => navigate('/projects')}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            View All Projects
          </motion.button>
        </div>
        <div className="projects-grid">
          {ongoing.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────
function ServiceItem({ service, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      className={`service-item ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      <div className="service-item-line" />
      <div className="service-item-header">
        <div className="service-item-num">{service.num}</div>
        <div className="service-item-title">{service.title}</div>
        <div className="service-item-arrow">↗</div>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="service-item-desc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <p>{service.desc}</p>
            <div className="price-tag" style={{ cursor: 'none' }} onClick={(e) => { e.stopPropagation(); window.location.href = '/contact' }}>{service.price}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Services() {
  const navigate = useNavigate()
  return (
    <section className="section services-section">
      <div className="container">
        <div className="services-layout">
          <div className="services-sticky">
            <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              What We Offer
            </motion.div>
            <motion.h2 className="section-title" style={{ fontSize: 'clamp(2.5rem,4vw,3.8rem)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
              Property<br /><em>Categories</em>
            </motion.h2>
            <motion.div className="gold-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} />
            <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}>
              From luxury apartments to commercial towers, we build and sell across every premium segment.
            </motion.p>
            <motion.button className="btn btn-gold" style={{ marginTop: 32 }} onClick={() => navigate('/contact')}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <span>Book a Site Tour →</span>
            </motion.button>
          </div>
          <div className="service-items">
            {SERVICES.map((s, i) => <ServiceItem key={s.num} service={s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────
function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section className="section" style={{ background: 'var(--black)', overflow: 'hidden', paddingBottom: 80 }}>
      <div className="container">
        <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Client Voices
        </motion.div>
        <motion.h2 className="section-title" style={{ marginBottom: 60 }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
          What Our<br /><em>Buyers</em> Say
        </motion.h2>
      </div>
      <div className="testimonials-slider">
        <div className="testimonial-track">
          {doubled.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-bg-quote">"</div>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT PREVIEW ──────────────────────────────────────
function ContactPreview() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = () => {
    if (!form.name || !form.email) return alert('Please fill required fields.')
    const messageLine = form.message ? `%0AMessage: ${encodeURIComponent(form.message)}` : ''
    const msg = `Hello My City Infra Developers,%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}${messageLine}`
    window.open(`https://wa.me/+919703828581?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  return (
    <section className="section contact-preview" style={{ background: 'var(--dark)' }}>
      <div className="container">
        <div className="contact-layout">
          <div>
            <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Get In Touch
            </motion.div>
            <motion.h2 className="section-title" style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
              Let's Find<br />Your Perfect<br /><em>Property</em>
            </motion.h2>
            <motion.div className="gold-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} />
            <motion.div className="contact-info-items" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}>
              {[
                { icon: '📞', label: 'Phone', val: '+91 97038 28581' },
                { icon: '✉️', label: 'Email', val: 'Info.mycityinfra@gmail.com' },
                { icon: '📍', label: 'Head Office', val: 'Hyderabad, Telangana, India' },
              ].map((item) => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value" style={{ whiteSpace: 'pre-line' }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </motion.div>
            <MapBox />
          </div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
            {submitted ? (
              <div className="form-success">✦ Message received. Our sales team will contact you within 24 hours.</div>
            ) : (
              <div className="contact-form-wrap">
                <div className="contact-form-title">Send Us a Message</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Property Interest</label>
                    <select>
                      <option>Select property type</option>
                      <option>Luxury Ventures</option>
                      <option>Detached Villa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your requirements... (optional)" />
                  </div>
                  <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '20px' }} onClick={handleSubmit}>
                    <span>Send Inquiry →</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MapBox() {
  return (
    <div className="map-box" style={{ padding: 0, overflow: 'hidden' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4!2d78.5464!3d17.3642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIxJzUxLjIiTiA3OMKwMzInNDcuMCJF!5e0!3m2!1sen!2sin!4v1"
        width="100%"
        height="300"
        style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
// ─── HOME PAGE ────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StatsStrip />
      <AboutPreview />
      <FeaturedProjects />
      <Services />
      <Testimonials />
      <ContactPreview />
    </>
  )
}