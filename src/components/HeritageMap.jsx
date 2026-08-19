import { motion } from 'framer-motion'
import { Map, MapPin, Sparkles, Filter } from 'lucide-react'

const STATES_INFO = [
  { id: 'gujarat', name: 'Gujarat', monument: 'Rani ki Vav', x: '18%', y: '45%', color: 'fill-amber-500 hover:fill-amber-400' },
  { id: 'mp', name: 'Madhya Pradesh', monument: 'Khajuraho Temple', x: '45%', y: '42%', color: 'fill-orange-500 hover:fill-orange-400' },
  { id: 'maharashtra', name: 'Maharashtra', monument: 'Ajanta Caves', x: '35%', y: '60%', color: 'fill-yellow-500 hover:fill-yellow-400' },
  { id: 'odisha', name: 'Odisha', monument: 'Konark Sun Temple', x: '70%', y: '50%', color: 'fill-red-500 hover:fill-red-400' },
  { id: 'tn', name: 'Tamil Nadu', monument: 'Brihadisvara Temple', x: '45%', y: '85%', color: 'fill-emerald-500 hover:fill-emerald-400' }
]

export default function HeritageMap({ activeState, onSelectState }) {
  const handleStateClick = (stateId) => {
    onSelectState(stateId)
    // Scroll to Heritage Explorer section
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
    <section id="map" className="py-20 bg-theme-bg/40 border-b border-theme-border/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-theme-accent mb-2">
            <Map className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Visual Exploration</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Interactive Heritage Map</h2>
          <p className="text-theme-muted mt-3 text-sm leading-relaxed">
            Click on highlighted cultural hubs on the map below to filter and discover regional monuments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map display */}
          <div className="lg:col-span-8 bg-theme-card border border-theme-border/60 rounded-3xl p-6 shadow-sm relative overflow-hidden flex items-center justify-center">
            {/* Background grids */}
            <div className="absolute inset-0 bg-[radial-gradient(#E8DCCB_1px,transparent_1px)] dark:bg-[radial-gradient(#2D3139_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

            <div className="relative w-full max-w-[450px] aspect-[4/5] z-10 flex items-center justify-center">
              {/* Simplified clean SVG silhouette of India regions */}
              <svg
                viewBox="0 0 400 500"
                className="w-full h-full text-theme-border/40 dark:text-theme-border/20 transition-all duration-300"
                aria-label="Map of India Regions"
              >
                {/* Stylized background boundary paths */}
                <path
                  d="M190,40 L210,42 L240,65 L270,75 L285,110 L250,150 L270,180 L320,180 L350,210 L300,240 L310,270 L280,285 L280,310 L245,340 L235,390 L205,430 L195,460 L180,475 L170,460 L160,400 L140,350 L125,330 L105,320 L75,310 L60,290 L50,280 L75,255 L90,265 L105,255 L115,220 L80,210 L70,190 L95,190 L110,175 L110,140 L135,110 L155,100 L160,75 L180,60 Z"
                  className="fill-theme-border/10 dark:fill-theme-border/5 stroke-theme-border/60 dark:stroke-theme-border/30 stroke-2"
                />

                {/* State Node Circles & Connectors */}
                {STATES_INFO.map((state) => {
                  const isActive = activeState === state.id
                  return (
                    <g key={state.id} className="cursor-pointer" onClick={() => handleStateClick(state.id)}>
                      {/* Connection Line */}
                      <circle
                        cx={state.x}
                        cy={state.y}
                        r={isActive ? "20" : "14"}
                        className={`transition-all duration-300 stroke-2 cursor-pointer ${
                          isActive 
                            ? 'fill-theme-accent/20 stroke-theme-accent' 
                            : 'fill-theme-card stroke-theme-border hover:stroke-theme-accent/50'
                        }`}
                      />
                      {/* Innermost Core Dot */}
                      <circle
                        cx={state.x}
                        cy={state.y}
                        r="6"
                        className={`transition-all duration-300 cursor-pointer ${
                          isActive ? 'fill-theme-accent' : 'fill-theme-muted hover:fill-theme-accent'
                        }`}
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Labels overlay */}
              {STATES_INFO.map((state) => {
                const isActive = activeState === state.id
                return (
                  <button
                    key={state.id}
                    onClick={() => handleStateClick(state.id)}
                    style={{ left: state.x, top: state.y }}
                    className={`absolute transform -translate-x-1/2 -translate-y-9 px-2.5 py-1 text-[10px] font-bold rounded-lg border shadow-sm transition-all duration-300 pointer-events-auto flex items-center space-x-1 ${
                      isActive
                        ? 'bg-theme-accent border-theme-accent text-white scale-105'
                        : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-accent/50 hover:text-theme-accent'
                    }`}
                  >
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{state.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Details Sidebar panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-theme-card border border-theme-border/60 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 text-theme-accent mb-4">
                <Filter className="w-4 h-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Quick State Filters</h3>
              </div>
              <div className="space-y-3">
                {STATES_INFO.map((state) => {
                  const isActive = activeState === state.id
                  return (
                    <button
                      key={state.id}
                      onClick={() => handleStateClick(state.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                        isActive
                          ? 'border-theme-accent bg-theme-accent/5 text-theme-text'
                          : 'border-theme-border hover:border-theme-accent/30 text-theme-muted hover:text-theme-text bg-transparent'
                      }`}
                    >
                      <div>
                        <p className={`text-sm font-bold ${isActive ? 'text-theme-accent' : 'text-theme-text'}`}>
                          {state.name}
                        </p>
                        <p className="text-[11px] text-theme-muted mt-0.5">Featured: {state.monument}</p>
                      </div>
                      <MapPin className={`w-4 h-4 ${isActive ? 'text-theme-accent' : 'text-theme-border'}`} />
                    </button>
                  )
                })}
              </div>

              {activeState && (
                <button
                  onClick={() => onSelectState(null)}
                  className="w-full mt-4 py-2.5 border border-dashed border-theme-border hover:bg-theme-border/10 text-theme-accent text-xs font-semibold rounded-xl text-center transition-colors"
                >
                  Clear State Filter
                </button>
              )}
            </div>

            <div className="bg-theme-card border border-theme-border/60 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">State Explorer Log</h4>
              </div>
              <p className="text-xs text-theme-muted leading-relaxed">
                Each point on the map represents a state that hosts a prominent UNESCO World Heritage monument. Click the map markers to view the architecture, travel diaries, and logs associated with each state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
