import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, QrCode, Play, Volume2, BookOpen, AlertCircle, Sparkles } from 'lucide-react'

const VIRTUAL_CODES = {
  'KH-101': {
    name: 'Khajuraho Group of Monuments',
    state: 'Madhya Pradesh',
    title: 'The Whispering Stone Sculptures',
    audioUrl: '#',
    duration: '4m 32s',
    diary: 'I stood before the Lakshmana temple at dawn. The sandstone absorbs the first light, turning from cold gray to a warm golden honey color. The intricate figures carved into the walls seem to stir in the shadows. Each relief is not just art, but a manual of living philosophy, carved by master artisans who saw the divine in the earthly. A local priest told me the carvings represent the celebration of life in all its dimensions, from the spiritual to the sensual.',
    tip: 'Visit between 6:00 AM and 8:00 AM for the golden hour lighting.'
  },
  'RK-202': {
    name: 'Rani ki Vav (The Queen’s Stepwell)',
    state: 'Gujarat',
    title: 'Journey to the Inverted Temple',
    audioUrl: '#',
    duration: '5m 12s',
    diary: 'Descending the steps of Rani ki Vav feels like entering the womb of the earth. Unlike monuments that reach for the sky, this stepwell dives seven levels deep. Built as a memorial by Queen Udayamati in the 11th century, it served both as a sanctuary from the blazing desert heat and a sacred water temple. Over 500 major sculptures line the galleries, dedicated to Lord Vishnu. The air grows cooler with every level you descend, carrying the ancient scent of damp silt.',
    tip: 'Look closely at the fourth level to spot the panels depicting intricate Patola textile designs, which weavers still copy today.'
  },
  'KS-303': {
    name: 'Konark Sun Temple',
    state: 'Odisha',
    title: 'The Great Stone Chariot of the Sun',
    audioUrl: '#',
    duration: '3m 58s',
    diary: 'Konark is not just a temple; it is a giant astronomical instrument. Built in the shape of a colossal chariot with twelve pairs of wheels pulled by seven horses, it points directly towards the rising sun. The 24 wheels are actually sundials, so precise that you can read the time down to the minute by looking at the shadow cast by the hub. Standing on the shore, one can imagine how it once acted as a beacon for sailors on the Bay of Bengal, who called it the Black Pagoda.',
    tip: 'Ask a local guide to demonstrate how to calculate the exact time using the spokes of the wheels.'
  },
  'AC-404': {
    name: 'Ajanta Caves',
    state: 'Maharashtra',
    title: 'The Silent Masterpieces of the Monks',
    audioUrl: '#',
    duration: '6m 04s',
    diary: 'Inside Cave 1, the Bodhisattva Padmapani looks down with an expression of infinite compassion. These murals were painted by Buddhist monks between the 2nd century BCE and the 5th century CE using only oil lamps to light the pitch-black interiors. They crushed lapis lazuli from Afghanistan, copper ore, and local soils to create pigments that still glow with metallic luster after 1500 years. The horseshoe-shaped gorge outside echoes with the sound of the Waghora river.',
    tip: 'Flash photography is strictly prohibited. Carry a small penlight to observe the pigments without degrading the paint.'
  },
  'BT-505': {
    name: 'Brihadisvara Temple',
    state: 'Tamil Nadu',
    title: 'The Shadowless Vimana',
    audioUrl: '#',
    duration: '4m 45s',
    diary: 'The Vimana (temple tower) rises 216 feet into the sky, crowned by an 80-ton monolithic stone cap. Built entirely of interlocking granite blocks without cement, the engineering of the 11th century is mind-boggling. The temple is so perfectly aligned that at noon, the shadow of the topmost dome is said to never fall on the ground. Walking around the massive courtyard, the warm granite under your bare feet connects you directly to the millions of pilgrims who have walked here for over a millennium.',
    tip: 'Examine the base of the outer walls to read the thousands of Tamil inscriptions recording the names of donors, musicians, and donors.'
  }
}

export default function QRModal({ isOpen, onClose, onUnlock }) {
  const [code, setCode] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [unlockedData, setUnlockedData] = useState(null)
  const [error, setError] = useState('')
  const [playingAudio, setPlayingAudio] = useState(false)

  const handleScan = (codeToScan) => {
    const finalCode = (codeToScan || code).trim().toUpperCase()
    if (!finalCode) {
      setError('Please enter a valid QR Code ID.')
      return
    }

    setError('')
    setIsScanning(true)
    setUnlockedData(null)

    // Simulate scanning animation
    setTimeout(() => {
      setIsScanning(false)
      const data = VIRTUAL_CODES[finalCode]
      if (data) {
        setUnlockedData(data)
        if (onUnlock) {
          onUnlock(finalCode)
        }
      } else {
        setError('Invalid QR Code ID. Try KH-101, RK-202, KS-303, AC-404, or BT-505.')
      }
    }, 1800)
  }

  const handleQuickCode = (quickCode) => {
    setCode(quickCode)
    handleScan(quickCode)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0F1115]/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-theme-card border border-theme-border rounded-2xl shadow-2xl p-6 overflow-hidden z-10 text-theme-text"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-theme-border/20 text-theme-muted hover:text-theme-text transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 rounded-xl bg-theme-accent/10 text-theme-accent">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Virtual QR Scanner</h2>
              <p className="text-xs text-theme-muted">Scan monument QR codes to unlock secret journals</p>
            </div>
          </div>

          {!unlockedData ? (
            <div className="space-y-6">
              {/* Scan Screen Area */}
              <div className="relative h-48 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col items-center justify-center">
                {isScanning ? (
                  <>
                    {/* Laser line scan animation */}
                    <motion.div
                      initial={{ top: '0%' }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-1 bg-theme-accent shadow-[0_0_10px_#e27d2c] z-10"
                    />
                    <div className="text-stone-300 animate-pulse text-sm font-mono flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-theme-accent animate-spin" />
                      <span>DECODING DIGITAL SIGNALS...</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <QrCode className="w-12 h-12 text-stone-600 mx-auto mb-2 animate-pulse" />
                    <span className="text-stone-400 text-xs font-medium">Position code in the frame to decode</span>
                  </div>
                )}

                {/* Corner highlights */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-stone-400"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-stone-400"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-stone-400"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-stone-400"></div>
              </div>

              {/* Code input form */}
              <div>
                <label htmlFor="qr-id" className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">
                  Enter QR ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="qr-id"
                    placeholder="e.g. KH-101, RK-202, KS-303..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                    className="flex-grow px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-theme-text text-sm focus:outline-none focus:ring-2 focus:ring-theme-accent/50"
                  />
                  <button
                    onClick={() => handleScan()}
                    disabled={isScanning}
                    className="px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-hover disabled:bg-theme-muted/50 text-white text-sm font-semibold rounded-lg shadow-md transition-all active:scale-95 duration-200"
                  >
                    Scan Code
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{error}</span>
                  </p>
                )}
              </div>

              {/* Quick try options */}
              <div className="pt-2">
                <span className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">
                  Available virtual QR tags at monument sites
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(VIRTUAL_CODES).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleQuickCode(key)}
                      className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-theme-border/20 text-theme-text hover:bg-theme-accent/20 hover:text-theme-accent border border-theme-border transition-all duration-200"
                    >
                      {key} ({VIRTUAL_CODES[key].state})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Unlocked monument information */}
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                  ✓ Code Decoded Successfully
                </span>
                <h3 className="text-xl font-bold mt-2 text-theme-accent">{unlockedData.name}</h3>
                <p className="text-xs text-theme-muted font-medium">{unlockedData.state}</p>
              </div>

              <div className="p-4 bg-theme-border/10 border border-theme-border rounded-xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-theme-border/30">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-theme-accent" />
                    <span className="text-sm font-semibold">{unlockedData.title}</span>
                  </div>
                  <span className="text-xs font-mono text-theme-muted bg-theme-border/20 px-2 py-0.5 rounded">
                    Audio Guide: {unlockedData.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-theme-muted">Listen to local archaeologists' recordings</span>
                  <button
                    onClick={() => setPlayingAudio(!playingAudio)}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-theme-accent hover:bg-theme-accent-hover text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 duration-200"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{playingAudio ? 'Stop Preview' : 'Play Audio Guide'}</span>
                  </button>
                </div>

                {playingAudio && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2 text-center"
                  >
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: [8, 20, 8] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 bg-theme-accent rounded"
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-theme-accent mt-2 font-mono tracking-wider animate-pulse">
                      STREAMING SIMULATED EXCLUSIVE AUDIO GUIDE...
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Guide Diary */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-theme-muted">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Guide's Journal Log</span>
                </div>
                <p className="text-sm italic leading-relaxed text-theme-text/90 font-serif border-l-2 border-theme-accent/50 pl-3">
                  "{unlockedData.diary}"
                </p>
              </div>

              {/* Explorer tip */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-lg">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">💡 Local Expert Tip:</span>
                <p className="text-xs text-amber-700 dark:text-amber-400/90 mt-0.5">{unlockedData.tip}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setUnlockedData(null)
                    setCode('')
                    setPlayingAudio(false)
                  }}
                  className="flex-1 py-2.5 border border-theme-border hover:bg-theme-border/20 text-theme-text text-sm font-semibold rounded-lg transition-all active:scale-95 duration-200"
                >
                  Scan Another Code
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white text-sm font-semibold rounded-lg shadow-md transition-all active:scale-95 duration-200"
                >
                  Return to Exploration
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
