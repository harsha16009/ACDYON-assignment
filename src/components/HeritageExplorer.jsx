import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Info, ArrowRight, Eye, Calendar, Sparkles, X, Heart } from 'lucide-react'

const HERITAGE_DATA = [
  {
    id: 'KH-101',
    title: 'Khajuraho Group of Monuments',
    location: 'Madhya Pradesh',
    stateId: 'mp',
    category: 'Monuments',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned for their Nagara-style architectural symbolism and expressive stone carvings. Built between 950 and 1050 CE by the Chandela Dynasty, these temples are a celebration of spiritual and physical harmony.',
    detailedDescription: 'The Khajuraho temples are famous for their intricate and rich sandstone reliefs, which represent the apex of medieval temple architecture in Central India. Although famous for their erotic sculptures, these represent less than 10% of the carvings, which mainly depict daily life, mythology, music, dance, and spiritual values.',
    history: 'Built by the Chandela rulers, the temples were active places of worship until the 13th century. They were later engulfed by the forests, which preserved them until they were rediscovered by British officer T.S. Burt in 1838.',
    visitorTips: 'Hire an ASI-certified guide to explain the rich iconographical stories. The evening Light and Sound show is highly recommended.',
    tags: ['UNESCO Site', 'Sandstone Art', 'Nagara Architecture']
  },
  {
    id: 'RK-202',
    title: 'Rani ki Vav (The Queen’s Stepwell)',
    location: 'Gujarat',
    stateId: 'gujarat',
    category: 'Monuments',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'An exceptional example of an inverted temple stepwell built in the 11th century. Designed to honor the sanctity of water, it features over 500 principal sculptures detailing Vishnu avatars.',
    detailedDescription: 'Built by Queen Udayamati in memory of her husband King Bhima I, Rani ki Vav is structured as a subterranean temple. It is divided into seven levels of stairs and pillared galleries, illustrating the Maru-Gurjara architectural style with unmatched precision.',
    history: 'The stepwell was flooded by the nearby Saraswati river shortly after its construction. It lay buried under silt for nearly a millennium, which kept the delicate carvings in pristine condition until excavation in the 1980s.',
    visitorTips: 'Go early in the morning when the sun shines directly into the lower shafts, lighting up the carvings beautifully.',
    tags: ['UNESCO Site', 'Subterranean Temple', 'Stepwell Engineering']
  },
  {
    id: 'KS-303',
    title: 'Konark Sun Temple',
    location: 'Odisha',
    stateId: 'odisha',
    category: 'Monuments',
    image: 'https://images.unsplash.com/photo-1623940176466-267923769c36?auto=format&fit=crop&w=800&q=80',
    description: 'A monumental 13th-century stone chariot dedicated to the Sun God, Surya. Features 24 intricately carved stone wheels acting as sundials, pulled by seven horses.',
    detailedDescription: 'Konark Sun Temple represents the high point of Kalinga architecture. Built by King Narasimhadeva I of the Eastern Ganga Dynasty, it was constructed using three types of stone. The wheels are not just decorative; they are precise sundials capable of telling the time down to the minute.',
    history: 'The main temple sanctuary collapsed in the 19th century due to structural fatigue and ocean breeze erosion. The remaining audience hall and dance halls were preserved, standing as a testament to early Indian astronomical science.',
    visitorTips: 'Observe the shadow of the central hub on the wheel spokes to calculate local time. Avoid visiting in midday during summer as the stone deck gets hot.',
    tags: ['UNESCO Site', 'Astronomical Wheel', 'Kalinga Architecture']
  },
  {
    id: 'AC-404',
    title: 'Ajanta Cave Paintings',
    location: 'Maharashtra',
    stateId: 'maharashtra',
    category: 'Art & Dance',
    image: 'https://images.unsplash.com/photo-1608958416738-489bf711467a?auto=format&fit=crop&w=800&q=80',
    description: '30 rock-cut Buddhist cave monuments containing ancient fresco murals. Painted using natural minerals by monks between the 2nd century BCE and 480 CE.',
    detailedDescription: 'The frescoes of Ajanta depict the Jataka tales (previous lives of the Buddha) and courtly life. The paint was made by grinding local minerals, clay, and lapis lazuli, mixed with vegetable glue, and applied over plaster in dark cave chambers lit only by oil lamps.',
    history: 'Abandonment occurred as Buddhism declined in the region around the 6th century CE. The caves were hidden by dense jungle until 1819 when John Smith, a British cavalry officer, stumbled upon cave 10 during a tiger hunt.',
    visitorTips: 'Bring a pocket flashlight. Do not use flash photography inside the caves to protect the ancient organic colors from fading.',
    tags: ['Ancient Frescoes', 'Buddhist Murals', 'Rock-Cut Architecture']
  },
  {
    id: 'BT-505',
    title: 'Brihadisvara Great Temple',
    location: 'Tamil Nadu',
    stateId: 'tn',
    category: 'Monuments',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'A 1,000-year-old architectural masterpiece built entirely of granite. Its 216-foot central tower is crowned by a massive 80-ton monolithic stone dome.',
    detailedDescription: 'Built by Chola Emperor Rajaraja I in 1010 CE, the Brihadisvara temple stands as the supreme example of Dravidian architecture. It features massive pillared corridors, towering Gopurams, and frescoes that detail Chola history and mythologies.',
    history: 'The temple was constructed using over 130,000 tons of granite, transported by elephants from quarries over 50 miles away. It remains an active place of daily Shaivite worship and a cultural center.',
    visitorTips: 'Remove shoes at the gate. The stone floors can get extremely hot by late morning, so plan to walk the courtyards before 9:30 AM.',
    tags: ['Granite Wonder', 'Chola Dynasty', 'Dravidian Vimana']
  },
  {
    id: 'FE-606',
    title: 'Hornbill Cultural Festival',
    location: 'Nagaland',
    stateId: 'nagaland',
    category: 'Festivals',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    description: 'The "Festival of Festivals" celebrating the rich cultural diversity of Nagaland’s 17 major indigenous tribes. Showcases traditional songs, dances, and crafts.',
    detailedDescription: 'Organized annually in December, the Hornbill Festival brings together all the tribes of Nagaland to promote cultural tourism. Located at Naga Heritage Village in Kisama, it is a living exhibition of colorful war attire, folk dances, archery, and traditional herbal remedies.',
    history: 'Initiated by the State Government in 2000 to foster inter-tribal interaction and safeguard the rich oral lore, songs, and indigenous sports that were fading due to modernization.',
    visitorTips: 'Book accommodation in Kohima months in advance, as hotels fill up quickly for the first week of December.',
    tags: ['Tribal Dance', 'Oral Folklore', 'Naga Culture']
  }
]

export default function HeritageExplorer({ searchQuery, activeStateFilter, setActiveStateFilter }) {
  const [selectedTab, setSelectedTab] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [likes, setLikes] = useState(() => {
    try {
      const stored = localStorage.getItem('cs_heritage_likes')
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  // Synchronize state filter changes to clear tab filter if state selected
  useEffect(() => {
    if (activeStateFilter) {
      setSelectedTab('All')
    }
  }, [activeStateFilter])

  const handleLike = (id, e) => {
    e.stopPropagation()
    const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 }
    setLikes(newLikes)
    localStorage.setItem('cs_heritage_likes', JSON.stringify(newLikes))
  }

  // Filter logic combining Search Bar + Tabs + Map State selection
  const filteredData = HERITAGE_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab = selectedTab === 'All' || item.category === selectedTab
    const matchesState = !activeStateFilter || item.stateId === activeStateFilter

    return matchesSearch && matchesTab && matchesState
  })

  return (
    <section id="heritage-explorer" className="py-20 bg-theme-bg">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-theme-accent mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest font-mono">Curated Collections</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Heritages</h2>
            <p className="text-theme-muted mt-2 max-w-xl text-sm leading-relaxed">
              Explore handpicked archaeological sites and living traditions representing India's vast historical timeline.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            {activeStateFilter && (
              <button
                onClick={() => setActiveStateFilter(null)}
                className="px-3 py-1.5 rounded-lg border border-theme-accent/50 text-theme-accent bg-theme-accent/10 hover:bg-theme-accent/20 text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200"
              >
                <span>State: {activeStateFilter.toUpperCase()}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-xs font-mono text-theme-muted">
              Showing {filteredData.length} of {HERITAGE_DATA.length} Sites
            </span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-theme-border/60 mb-8 overflow-x-auto scrollbar-none">
          {['All', 'Monuments', 'Art & Dance', 'Festivals'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedTab(tab)
                setActiveStateFilter(null) // clear state filter when tab clicked
              }}
              className={`px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all duration-200 -mb-px ${
                selectedTab === tab && !activeStateFilter
                  ? 'border-theme-accent text-theme-accent font-bold'
                  : 'border-transparent text-theme-muted hover:text-theme-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid List */}
        {filteredData.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-theme-border rounded-2xl bg-theme-card">
            <p className="text-theme-muted text-sm">No heritage locations found matching your selection.</p>
            <button
              onClick={() => {
                setSelectedTab('All')
                setActiveStateFilter(null)
              }}
              className="mt-4 text-xs font-bold text-theme-accent hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-theme-card border border-theme-border/60 hover:border-theme-accent/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative h-56 overflow-hidden bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0F1115]/80 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-theme-accent" />
                        <span>{item.location}</span>
                      </div>
                      
                      {/* Heart Count Overlay */}
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-[#0F1115]/80 hover:bg-[#0F1115] text-white flex items-center space-x-1.5 transition-colors focus:ring-2 focus:ring-theme-accent"
                        title="Upvote Site"
                      >
                        <Heart className={`w-3.5 h-3.5 ${likes[item.id] ? 'fill-red-500 text-red-500' : 'text-stone-300'}`} />
                        <span className="text-[10px] font-mono font-bold">{likes[item.id] || 0}</span>
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="p-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-theme-accent font-mono">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold tracking-tight mt-1 text-theme-text group-hover:text-theme-accent transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-sm text-theme-muted mt-2 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-theme-border/20 mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-theme-border/30 text-theme-text font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-theme-accent group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-[#0F1115]/70 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl bg-theme-card border border-theme-border rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] z-10 text-theme-text scrollbar-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-theme-border/20 text-theme-muted hover:text-theme-text transition-all duration-200"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Hero Image */}
                <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-6 bg-stone-100">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-[#0F1115]/85 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-theme-accent" />
                    <span>{selectedItem.location}</span>
                  </div>
                </div>

                {/* Header Information */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-theme-accent font-mono">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1">{selectedItem.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-theme-border/40 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description sections */}
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-theme-accent flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>Overview & Significance</span>
                    </h4>
                    <p className="text-sm text-theme-text/90 mt-2 leading-relaxed">
                      {selectedItem.detailedDescription}
                    </p>
                  </div>

                  <div className="border-t border-theme-border/30 pt-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-theme-accent flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Historical Origin & Lore</span>
                    </h4>
                    <p className="text-sm text-theme-text/90 mt-2 leading-relaxed font-serif italic border-l-2 border-theme-accent/50 pl-3">
                      "{selectedItem.history}"
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl">
                    <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center space-x-1">
                      <Info className="w-4 h-4" />
                      <span>Local Expert Traveler Tips</span>
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-400/90 mt-1 leading-relaxed">
                      {selectedItem.visitorTips}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2.5 bg-theme-border/30 hover:bg-theme-border/50 text-theme-text text-xs font-bold rounded-xl transition-all duration-200 active:scale-95"
                  >
                    Back to Catalog
                  </button>
                  <button
                    onClick={(e) => handleLike(selectedItem.id, e)}
                    className="px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-2 transition-all duration-200 active:scale-95"
                  >
                    <Heart className={`w-4 h-4 ${likes[selectedItem.id] ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>Upvote Monument ({likes[selectedItem.id] || 0})</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
