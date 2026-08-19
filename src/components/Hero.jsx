import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, QrCode, ArrowDown } from 'lucide-react'

export default function Hero({ onOpenQR, onSearchUpdate }) {
  const [localSearch, setLocalSearch] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearchUpdate(localSearch)
    // Scroll to explorer
    const explorer = document.getElementById('heritage-explorer')
    if (explorer) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = explorer.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const handleScrollToExplorer = () => {
    const explorer = document.getElementById('heritage-explorer')
    if (explorer) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = explorer.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Readability Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80"
          alt="Ancient Heritage Background"
          className="w-full h-full object-cover"
        />
        {/* Gradients to merge backdrop into light or dark theme backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-[#0F1115]/50 to-[#0F1115]/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 flex flex-col items-center">
        
        {/* Value Proposition */}
        <div className="space-y-4 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3.5 py-1 text-xs font-bold uppercase tracking-widest bg-theme-accent/20 text-theme-accent rounded-full border border-theme-accent/30 font-mono"
          >
            Preserving India's Living Chronicles
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif"
          >
            Travel Through Stories <br />
            <span className="text-theme-accent font-serif italic font-normal">Not Just Places</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed"
          >
            India is a country dotted with stunning wildlife diversity and rich traditions. Discover monuments, festivals, stories, and traditions that shaped the soul of India.
          </motion.p>
        </div>

        {/* Search Bar Input */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-xl flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-1.5 border border-stone-200/50"
        >
          <div className="flex items-center flex-grow px-3">
            <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search heritage, festivals, states..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value)
                onSearchUpdate(e.target.value)
              }}
              className="w-full px-3 py-2 bg-transparent text-stone-850 text-sm focus:outline-none placeholder:text-stone-400"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 duration-200"
          >
            Search
          </button>
        </motion.form>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleScrollToExplorer}
            className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-stone-50 text-stone-900 text-sm font-bold rounded-xl shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Explore Heritage</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onOpenQR}
            className="w-full sm:w-auto px-8 py-3 bg-transparent border border-white hover:bg-white/10 text-white text-sm font-bold rounded-xl active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR Code</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
