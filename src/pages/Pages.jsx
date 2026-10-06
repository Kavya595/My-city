import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TIMELINE, GOALS, PROJECTS, GALLERY_ITEMS, LEADERSHIP } from '../data'
import '../styles/pages.css'

// ─── PAGE HERO ─────────────────────────────────────────────
export function PageHero({ tag, title, subtitle, bgWord }) {
  return (
    <div className="page-hero">
      <div className="page-hero-bg-word">{bgWord}</div>
      <div className="container">
        <motion.div className="tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {tag}
        </motion.div>
        <motion.h1 className="page-hero-title"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <motion.p className="section-subtitle"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}>
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}

// ─── ABOUT PAGE ─────────────────────────────────────────────
export function About() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero tag="Est. 2023" title="Our <em>Story</em>" bgWord="ABOUT"
        subtitle="Building trust through legally clear properties, strategic locations, and modern infrastructure since 2023." />

      {/* Overview + Timeline */}
      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="about-page-grid">
            <div>
              <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Our Journey
              </motion.div>
              <motion.h2 className="section-title" style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', marginBottom: 40 }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                Our Journey of<br /><em>Building Trust</em>
              </motion.h2>
              <div className="timeline">
                {TIMELINE.map((item, i) => (
                  <motion.div key={`${item.year}-${i}`} className="tl-item"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                    <div className="tl-dot" />
                    <div className="tl-year">{item.year}</div>
                    <div className="tl-title">{item.title}</div>
                    <div className="tl-desc">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Vision & Mission
              </motion.div>
              <div className="vm-cards" style={{ marginTop: 48 }}>
                {[
                  { icon: '🔭', label: 'Vision', style: 'dark', text: "To become a trusted and leading real estate development company by creating well-planned communities, delivering quality infrastructure, and providing valuable investment opportunities that help people build a secure future." },
                  { icon: '🎯', label: 'Mission', style: 'gold', text: 'To develop high-quality residential and investment projects in strategic locations, maintaining transparency and trust in every transaction — helping customers build a secure future through smart real estate investments.' },
                ].map((v) => (
                  <motion.div key={v.label} className={`vm-card vm-${v.style}`}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <div className="vm-icon">{v.icon}</div>
                    <div className="vm-title">{v.label}</div>
                    <p className="vm-text">{v.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="section" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Our Goals
          </motion.div>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            Development<br /><em>Pillars</em>
          </motion.h2>
          <div className="goals-grid">
            {GOALS.map((g, i) => (
              <motion.div key={g.num} className="goal-item"
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}
                whileHover={{ y: -4 }}>
                <div className="goal-num">{g.num}</div>
                <div className="goal-title">{g.title}</div>
                <p className="goal-desc">{g.desc}</p>
                <div className="goal-line" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section" style={{ background: 'var(--black)', overflow: 'hidden' }}>
        <div className="container">
          <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Leadership
          </motion.div>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            The Visionaries<br />Behind <em>My City</em>
          </motion.h2>
          <div className="team-grid-2">
            {LEADERSHIP.map((member, i) => (
              <TeamCard2 key={member.name} member={member} idx={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ─── LEADERSHIP CARD ───────────────────────────────────────
function TeamCard2({ member, idx }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }))
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.pulse += 0.02
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        const alpha = p.o * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${alpha})`
        ctx.fill()
      })
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(201,168,76,${0.08 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <motion.div
      className={`team-card-2 ${hovered ? 'hovered' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.2, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="corner-tl" />
      <div className="corner-br" />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.8 : 0.3, transition: 'opacity 0.6s', pointerEvents: 'none' }}
      />
      <div className="team-card-2-top">
        <div className="team-card-2-glow" />
        <div className="team-avatar-2">
          <div className="avatar-ring ring-1" />
          <div className="avatar-ring ring-2" />
          <div className="avatar-ring ring-3" />
          <div className="avatar-img-wrap">
            <img src={member.image} alt={member.name} />
            <div className="avatar-shine" />
          </div>
        </div>
      </div>
      <div className="team-card-2-body">
        <div className="team-card-2-role">{member.role}</div>
        <div className="team-card-2-name">{member.name}</div>
        <p className="team-card-2-desc">{member.desc}</p>
      </div>
      <div className="team-card-2-line" />
    </motion.div>
  )
}

export function Projects() {
  const tabs = [
    { id: 'warangal', label: 'Warangal Highway' },
    { id: 'fourthcity', label: 'My City’s 4th City' },
    { id: 'ExitNo12', label: 'Completed Projects' },
  ]
  const [activeTab, setActiveTab] = useState('warangal')
  const [selected, setSelected] = useState(null)
  const ventures = PROJECTS[activeTab]

  return (
    <>
      <PageHero tag="Our Ventures" title="Running <em>Ventures</em>" bgWord="VENTURES"
        subtitle="4 projects across prime growth corridors in the Hyderabad region." />

      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="opj-tabs">
            {tabs.map((t) => (
              <button key={t.id} className={`opj-tab ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="venture-list">
              {ventures.map((project, i) => (
                <motion.div key={project.id} className="venture-card"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => setSelected(project)}>
                  <div className="venture-num">{project.num}</div>
                  <h2 className="venture-name">{project.name}</h2>
                  <p className="venture-desc">{project.description}</p>
                  <button className="btn btn-gold venture-cta" onClick={(e) => { e.stopPropagation(); window.location.href = '/contact' }}>
                    <span>Enquire Now →</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="venture-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}>
            <motion.div className="venture-modal" initial={{ opacity: 0, scale: 0.85, y: 60 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 60 }} transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}>
              <button className="venture-modal-close" onClick={() => setSelected(null)}>✕</button>
              <div className="venture-modal-type">{selected.type}</div>
              <h2 className="venture-modal-name">{selected.name}</h2>
              <div className="venture-modal-location">📍 {selected.location}</div>
              <p className="venture-modal-desc">{selected.description}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                <button className="btn btn-gold venture-modal-cta" onClick={(e) => { e.stopPropagation(); window.location.href = '/contact' }}>
                  <span>Enquire Now →</span>
                </button>
                {selected.pdf && (
                  <a href={selected.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-outline venture-modal-cta"
                    onClick={(e) => e.stopPropagation()}>
                    <span>Download Brochure ↓</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const filters = ['all', 'ventures', 'villas', 'nidhi']
  const visible = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === filter)

  return (
    <>
      <PageHero tag="Visual Portfolio" title="Our <em>Gallery</em>" bgWord="GALLERY" />

      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="gallery-filter">
            {filters.map((f) => (
              <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}>
                {f === 'nidhi' ? 'Nidhi Avenue' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="gallery-masonry">
            {visible.map((item, i) => (
              <motion.div key={item.id} className="gallery-item"
                layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setLightbox(item)}>
                <div className="gallery-item-inner">
                  <GalSVG index={item.id - 1} src={item.src} />
                  <div className="gallery-overlay">
                    <div className="gallery-icon">⬡</div>
                  </div>
                  <div className="gallery-label">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <motion.div className="lightbox-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            onClick={e => e.stopPropagation()}>
            <GalSVG index={GALLERY_ITEMS.findIndex(item => item.id === lightbox.id)} src={lightbox.src} large />
          </motion.div>
          <div className="lightbox-cap">{lightbox.label}</div>
        </motion.div>
      )}
    </>
  )
}
function GalSVG({ index, src, large }) {

  return (
    <img
      className="gal-svg"
      src={src}
      alt={`Gallery ${index + 1}`}
      style={{
        width: '100%',
        height: large ? 500 : 350,
        objectFit: 'cover',
        display: 'block',
      }}
    />
  )
}
// ─── CONTACT PAGE ─────────────────────────────────────────
export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ fname: '', email: '', message: '' })

  const handleSubmit = () => {
    if (!form.fname || !form.email) return alert('Please fill required fields.')
    const messageLine = form.message ? `%0AMessage: ${encodeURIComponent(form.message)}` : ''
    const msg = `Hello My City Infra Developers,%0A%0AName: ${encodeURIComponent(form.fname)}%0AEmail: ${encodeURIComponent(form.email)}${messageLine}`
    window.open(`https://wa.me/+919703828581?text=${msg}`, '_blank')
    setSubmitted(true)
  }
  return (
    <>
      <PageHero tag="Reach Out" title="Contact <em>Us</em>" bgWord="CONTACT" />
      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="contact-page-grid">
            <div>
              <motion.div className="tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Our Offices
              </motion.div>
              <motion.h2 className="section-title" style={{ fontSize: 'clamp(2rem,3.5vw,3rem)' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
                Let's Start a<br /><em>Conversation</em>
              </motion.h2>
              <motion.div className="contact-info-items" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.2 }}>
                {[
                  { icon: '📞', label: 'Sales Hotline', val: '+91 97038 28581' },
                  { icon: '✉️', label: 'Email', val: 'Info.mycityinfra@gmail.com' },
                  { icon: '📍', label: 'Head Office', val: 'Hyderabad, Telangana, India' },
                  { icon: '📍', label: 'Abuja Office', val: 'Near Warangal Highway, Hyderabad' },
                  { icon: '🕐', label: 'Working Hours', val: 'Monday – Saturday: 10AM – 6PM Sunday: By Appointment' },
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
              <div style={{ marginTop: 32, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4!2d78.5464!3d17.3642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIxJzUxLjIiTiA3OMKwMzInNDcuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="350"
                  style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
                <a href="https://maps.google.com/?q=17.3642,78.5464" target="_blank" rel="noopener noreferrer"
                  className="btn btn-gold"
                  style={{ display: 'flex', justifyContent: 'center', padding: '14px', fontSize: '0.75rem' }}>
                  <span>Open in Google Maps →</span>
                </a>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
              <div className="contact-form-title" style={{ marginBottom: 28 }}>Send Us a Message</div>
              {submitted ? (
                <div className="form-success">✦ Thank you. Our team will be in touch within 24 hours.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="form-row">
                    <div className="form-group"><label>First Name *</label><input value={form.fname} onChange={e => setForm({ ...form, fname: e.target.value })} placeholder="John" /></div>
                    <div className="form-group"><label>Last Name</label><input placeholder="Doe" /></div>
                  </div>
                  <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" /></div>
                  <div className="form-group"><label>Phone</label><input type="tel" placeholder="+234 xxx xxx xxxx" /></div>
                  <div className="form-group"><label>Inquiry Type</label>
                    <select>
                      <option>Select inquiry type</option>
                      <option>Property Purchase</option>
                      <option>Site Visit Request</option>
                      <option>Investment Inquiry</option>
                      <option>Partnership</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Message</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you're looking for... (optional)" /></div>
                  <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '20px' }} onClick={handleSubmit}>
                    <span>Send Message →</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── LEGAL PAGE ────────────────────────────────────────────
export function Legal() {
  const [activeTab, setActiveTab] = useState('privacy')
  const tabs = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'cookies', label: 'Cookie Policy' },
  ]

  const content = {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        { h: 'Introduction', p: 'My City Infra Developers respects the privacy of our customers, marketing partners, and website visitors. This Privacy Policy explains how we collect, use, and protect your information.' },
        { h: 'Information We Collect', ul: ['Full Name', 'Contact Number', 'Email Address', 'Residential Address', 'Identity Proof (if required for documentation)', 'Payment details related to plot booking', 'Bank details (for marketing associates or channel partners)'] },
        { h: 'Use of Information', ul: ['Processing plot booking applications', 'Providing property related services and updates', 'Communicating project information and offers', 'Processing payments and receipts', 'Maintaining customer and marketing partner records', 'Legal documentation and compliance'] },
        { h: 'Data Protection', p: 'My City Infra Developers takes reasonable measures to protect customer and partner information from unauthorized access, misuse, or disclosure.' },
        { h: 'Sharing of Information', p: 'We do not sell or rent your personal information to third parties. Information may only be shared with legal authorities if required by law, with banking or financial institutions for transaction purposes, or with authorized company staff for service delivery.' },
        { h: 'Consent', p: 'By providing your information to My City Infra Developers, you consent to the collection and use of your information as described in this policy.' },
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      sections: [
        { h: '1. Plot Booking', ul: ['Plot booking will be confirmed only after payment of the booking amount.', 'The booking amount is subject to company policies and project terms.', 'The customer must submit valid identification and documentation.'] },
        { h: '2. Payment Terms', p: 'Customers must pay the plot cost according to the agreed payment schedule. Delay in payment may attract penalties or cancellation as per company policy.' },
        { h: '3. Plot Allocation', p: 'Plot numbers will be allotted based on availability in the venture. The company reserves the right to modify layout or plot numbers due to government regulations or development requirements.' },
        { h: '4. Registration', p: 'Registration charges, stamp duty, and government fees will be borne by the customer unless otherwise specified. Registration will be done only after full payment of the plot cost.' },
        { h: '5. Cancellation Policy', p: 'In case of cancellation, the refund will be processed as per company refund policy. Administrative charges may apply.' },
        { h: '6. Governing Law', p: 'All projects are subject to local government approvals and regulations. Any disputes arising from transactions will be subject to the jurisdiction of the appropriate courts in Hyderabad, Telangana.' },
      ]
    },
    disclaimer: {
      title: 'Disclaimer',
      sections: [
        { h: 'General', p: 'The information provided on this website is for general informational purposes only. While My City Infra Developers strives for accuracy, we make no warranties regarding completeness or currency of the information.' },
        { h: 'Property Information', p: 'All layout plans, site images, and project details shown are representative and subject to change based on government approvals or development requirements.' },
        { h: 'Price Disclaimer', p: 'Prices shown or quoted are indicative and may change without prior notice. Binding prices are only those confirmed in executed booking agreements.' },
        { h: 'Investment Disclaimer', p: 'Real estate investment carries inherent risk. My City Infra Developers does not guarantee specific returns. Buyers should conduct independent due diligence before investing.' },
      ]
    },
    cookies: {
      title: 'Cookie Policy',
      sections: [
        { h: 'What Are Cookies', p: 'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve functionality.' },
        { h: 'Types We Use', ul: ['Essential Cookies: Required for website functionality', 'Analytics Cookies: Help us understand how visitors use our site', 'Marketing Cookies: Used to deliver relevant property advertisements', 'Preference Cookies: Remember your settings and preferences'] },
        { h: 'Managing Cookies', p: 'You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.' },
      ]
    },
  }

  const c = content[activeTab]

  return (
    <>
      <PageHero tag="Legal" title="Legal <em>Information</em>" bgWord="LEGAL" />
      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="legal-layout">
            <div className="legal-nav">
              {tabs.map((t) => (
                <button key={t.id} className={`legal-nav-link ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="legal-title">{c.title}</h2>
              <div className="legal-updated">LAST UPDATED: JANUARY 2026</div>
              {c.sections.map((s, i) => (
                <div key={i} className="legal-section">
                  <h3 className="legal-h3">{s.h}</h3>
                  {s.p && <p className="legal-p">{s.p}</p>}
                  {s.ul && <ul className="legal-ul">{s.ul.map((li, j) => <li key={j}>{li}</li>)}</ul>}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}