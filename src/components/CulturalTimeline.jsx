import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Compass, Feather, History } from 'lucide-react'

const TIMELINE_ERAS = [
  {
    id: 'ancient',
    eraName: 'Ancient Period',
    timeSpan: 'Up to 800 CE',
    headline: 'The Era of Rock-Cut Caves & Monolithic Architecture',
    medium: 'Cave Frescoes, Stucco, Bas-relief carvings on granite/basalt cliffs.',
    focus: 'Buddhist Monastic cave temples (Ajanta & Ellora) and the Stupas of Sanchi. Art was driven by deep contemplation, with monks carving directly into mountain ranges by oil lamp light.',
    monumentId: 'AC-404'
  },
  {
    id: 'medieval',
    eraName: 'Medieval Golden Age',
    timeSpan: '800 CE - 1500 CE',
    headline: 'The Zenith of Sandstone Nagara & Dravidian Granite Temples',
    medium: 'Interlocking granite architecture, high-relief sandstone carvings, Bronze metal casting.',
    focus: 'Construction of towering structural temples like the Khajuraho Temples, Odisha’s Sun Temple, and the massive Dravidian Brihadisvara granite wonder. Math, science, and sculpture merged into complex stone works.',
    monumentId: 'KH-101'
  },
  {
    id: 'colonial',
    eraName: 'Colonial Confluence',
    timeSpan: '1500 CE - 1947 CE',
    headline: 'Confluence of Indo-Islamic & European Indo-Saracenic Styles',
    medium: 'White Makrana Marble, Red Sandstone, stained glass, brick arches.',
    focus: 'Synthesized architectural styles blending Persian, Islamic, Hindu, and Gothic elements. Prominent structures include the Taj Mahal, Hawa Mahal, and Victoria Memorial, representing global trades and design exchange.',
    monumentId: 'RK-202'
  },
  {
    id: 'modern',
    eraName: 'Modern Revival',
    timeSpan: 'Post 1947',
    headline: 'Secular Conservation & Native Tribal Art Safeguarding',
    medium: 'Digital 3D Lidar scans, oral history recording, community festivals.',
    focus: 'Focus on documenting tribal customs (like the Hornbill Festival) and restoring ancient monuments using digital preservation. Modern art synthesizes ancient styles with contemporary global messages.',
    monumentId: 'FE-606'
  }
]

export default function CulturalTimeline() {
  const [selectedEra, setSelectedEra] = useState('medieval')

  const activeEraData = TIMELINE_ERAS.find((era) => era.id === selectedEra)

  return (
    <section id="cultural-timeline" className="py-20 bg-theme-bg/60 border-b border-theme-border/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-theme-accent mb-2">
            <History className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Historical Record</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Cultural Timeline</h2>
          <p className="text-theme-muted mt-3 text-sm leading-relaxed">
            Trace the evolutionary epochs of Indian art and architecture. Select an era to explore key developments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Era Navigation Buttons */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto scrollbar-none pb-4 lg:pb-0">
            {TIMELINE_ERAS.map((era) => {
              const isSelected = selectedEra === era.id
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(era.id)}
                  className={`w-full text-left p-4 rounded-xl border whitespace-nowrap lg:whitespace-normal transition-all duration-200 ${
                    isSelected
                      ? 'border-theme-accent bg-theme-accent/5 text-theme-text shadow-sm'
                      : 'border-theme-border hover:border-theme-accent/30 text-theme-muted hover:text-theme-text bg-theme-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-theme-accent uppercase tracking-wider">
                      {era.timeSpan}
                    </span>
                    <Calendar className={`w-4 h-4 hidden md:block ${isSelected ? 'text-theme-accent' : 'text-theme-border'}`} />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight mt-1">{era.eraName}</h3>
                </button>
              )
            })}
          </div>

          {/* Era Details Presentation Panel */}
          <div className="lg:col-span-8 bg-theme-card border border-theme-border/60 rounded-3xl p-6 md:p-8 shadow-sm min-h-[350px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEra}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-theme-accent font-mono">
                    Timeline Milestone • {activeEraData.timeSpan}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-1 text-theme-text">
                    {activeEraData.headline}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-theme-border/30">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-theme-accent flex items-center space-x-1.5 mb-2">
                      <Feather className="w-3.5 h-3.5" />
                      <span>Artistic Mediums Used</span>
                    </h4>
                    <p className="text-xs text-theme-text leading-relaxed bg-theme-bg/50 p-3 rounded-lg border border-theme-border/40">
                      {activeEraData.medium}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-theme-accent flex items-center space-x-1.5 mb-2">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Historical Focus</span>
                    </h4>
                    <p className="text-xs text-theme-muted leading-relaxed">
                      {activeEraData.focus}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-4 border-t border-theme-border/20 flex items-center justify-between text-xs text-theme-muted">
              <span>* Timeline entries reflect verified archaeological facts.</span>
              <a
                href="#heritage-explorer"
                className="text-theme-accent hover:underline font-bold flex items-center space-x-1"
              >
                <span>View catalog sites</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
