import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedCategories from './components/FeaturedCategories'
import HeritageExplorer from './components/HeritageExplorer'
import HeritageMap from './components/HeritageMap'
import CulturalTimeline from './components/CulturalTimeline'
import CommunityStories from './components/CommunityStories'
import QRModal from './components/QRModal'
import Footer from './components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trophy, X, ShieldAlert } from 'lucide-react'

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('cs_theme')
      if (stored) return stored
      // Fallback to system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      return mediaQuery.matches ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [activeStateFilter, setActiveStateFilter] = useState(null)
  const [qrOpen, setQrOpen] = useState(false)
  const [easterEggOpen, setEasterEggOpen] = useState(false)
  const [typedSequence, setTypedSequence] = useState('')

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('cs_theme', theme)
  }, [theme])

  // Listen for the "namaste" easter egg typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (/^[a-z]$/.test(key)) {
        setTypedSequence(prev => {
          const next = (prev + key).slice(-7) // match length of "namaste"
          if (next === 'namaste') {
            setEasterEggOpen(true)
            return ''
          }
          return next
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleQRUnlock = (code) => {
    // Unlocked code, e.g. mapping to a state to display
    const codeToState = {
      'KH-101': 'mp',
      'RK-202': 'gujarat',
      'KS-303': 'odisha',
      'AC-404': 'maharashtra',
      'BT-505': 'tn'
    }
    const stateId = codeToState[code]
    if (stateId) {
      setActiveStateFilter(stateId)
    }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-theme-bg text-theme-text transition-colors duration-300">
      
      {/* Sticky Top Navbar */}
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      {/* Main Page Layout */}
      <main className="flex-grow">
        <Hero onOpenQR={() => setQrOpen(true)} onSearchUpdate={setSearchQuery} />
        
        {/* Navigation Categories */}
        <FeaturedCategories />

        {/* Interactive SVG Region Map */}
        <HeritageMap activeState={activeStateFilter} onSelectState={setActiveStateFilter} />

        {/* Filterable Heritage Explorer List */}
        <HeritageExplorer 
          searchQuery={searchQuery} 
          activeStateFilter={activeStateFilter} 
          setActiveStateFilter={setActiveStateFilter} 
        />

        {/* Historical Eras Timeline */}
        <CulturalTimeline />

        {/* User Story contribution Board */}
        <CommunityStories />
      </main>

      {/* footer */}
      <Footer />

      {/* Virtual QR Code Scanner Simulator Modal */}
      <QRModal 
        isOpen={qrOpen} 
        onClose={() => setQrOpen(false)} 
        onUnlock={handleQRUnlock} 
      />

      {/* Secret easter Egg Modal: Sunken City of Dwaraka */}
      <AnimatePresence>
        {easterEggOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEasterEggOpen(false)}
              className="absolute inset-0 bg-[#0F1115]/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-theme-card border-2 border-theme-accent rounded-3xl shadow-2xl p-6 md:p-8 text-center text-theme-text z-10 overflow-hidden"
            >
              {/* Confetti simulation top bar */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
              
              <button
                onClick={() => setEasterEggOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-theme-border/20 text-theme-muted hover:text-theme-text transition-colors"
                aria-label="Close easter egg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto w-14 h-14 bg-theme-accent/10 rounded-full flex items-center justify-center text-theme-accent mb-6 animate-bounce">
                <Trophy className="w-7 h-7" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-theme-accent bg-theme-accent/10 px-3 py-1 rounded-full">
                Secret Easter Egg Unlocked
              </span>
              
              <h2 className="text-2xl font-extrabold tracking-tight mt-4 text-theme-text font-serif">
                The Sunken City of Dwaraka
              </h2>

              <p className="text-sm text-theme-muted mt-3 leading-relaxed">
                By entering the sacred greeting <strong className="text-theme-accent font-mono font-bold">"namaste"</strong>, you have summoned the legend of the ancient sunken city of Dwaraka.
              </p>

              <div className="mt-6 p-4 bg-stone-100 dark:bg-stone-900/60 border border-theme-border rounded-2xl text-left space-y-3">
                <div className="flex items-center space-x-2 text-theme-accent">
                  <ShieldAlert className="w-4.5 h-4.5" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">Marine Archaeology Log</span>
                </div>
                <p className="text-xs text-theme-text leading-relaxed font-serif italic">
                  "Ancient Sanskrit scriptures detail Dwaraka as a magnificent golden city built by Lord Krishna on the shores of Gujarat, which was swallowed by the sea upon his departure. In recent decades, marine archaeologists scanning the Gulf of Khambhat uncovered massive stone structures, anchor stones, and walls lying 120 feet beneath the waves, corroborating the oral logs."
                </p>
              </div>

              <button
                onClick={() => setEasterEggOpen(false)}
                className="mt-6 w-full py-3 bg-theme-accent hover:bg-theme-accent-hover text-white text-xs font-bold rounded-xl shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Return to Exploration</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
