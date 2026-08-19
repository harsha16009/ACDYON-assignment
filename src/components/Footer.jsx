import { Globe } from 'lucide-react'

export default function Footer() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-theme-card border-t border-theme-border/60 py-16 px-6 relative overflow-hidden text-theme-text transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center space-x-2.5 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="CulturaSphere Home"
        >
          <div className="w-8 h-8 rounded-lg bg-theme-accent flex items-center justify-center text-white shadow-sm shadow-theme-accent/15">
            <Globe className="w-4.5 h-4.5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-theme-text group-hover:text-theme-accent transition-colors">
            CulturaSphere
          </span>
        </div>

        {/* Middle: Clean Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-theme-muted">
          <button 
            onClick={() => handleScrollTo('heritage-explorer')} 
            className="hover:text-theme-accent transition-colors font-semibold"
          >
            Heritage
          </button>
          <button 
            onClick={() => handleScrollTo('map')} 
            className="hover:text-theme-accent transition-colors font-semibold"
          >
            Map
          </button>
          <button 
            onClick={() => handleScrollTo('cultural-timeline')} 
            className="hover:text-theme-accent transition-colors font-semibold"
          >
            Timeline
          </button>
          <button 
            onClick={() => handleScrollTo('community-stories')} 
            className="hover:text-theme-accent transition-colors font-semibold"
          >
            Stories
          </button>
          <span className="text-theme-border hidden sm:inline">|</span>
          <span className="text-xs text-theme-muted font-mono tracking-tight select-none">
            DEMO VERSION ONLY
          </span>
        </div>

        {/* Right Side: Copyright */}
        <div className="text-center md:text-right text-xs text-theme-muted font-mono">
          <p>© 2026 CulturaSphere. All rights reserved.</p>
          <p className="mt-1 text-[10px]">Built for Acdyon Technologies Engineering Challenge</p>
        </div>

      </div>
    </footer>
  )
}
