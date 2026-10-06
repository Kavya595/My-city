import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from 'framer-motion'

import App from './App.jsx'
import Loader from './components/Loader.jsx'

import './styles/globals.css'
import './styles/cursor.css'
import './styles/loader.css'
import './styles/navbar.css'
import './styles/footer.css'
import './styles/whatsapp.css'
import './styles/production.css'

function Root() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && <App />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
