import { useState, useEffect } from 'react'
import { Menu, X, Globe, Moon, Sun, ArrowRight } from 'lucide-react'

export default function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect scroll to style Navbar (blur / solid background)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (id) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // offset for Navbar height
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
      isScrolled 
        ? 'bg-theme-card/90 backdrop-blur-md border-b border-theme-border/60 py-3 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center space-x-2.5 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="CulturaSphere Home"
        >
          <div className="w-9 h-9 rounded-xl bg-theme-accent flex items-center justify-center text-white shadow-md shadow-theme-accent/20 group-hover:shadow-theme-accent/35 transition-all duration-300 transform group-hover:rotate-12">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-theme-text group-hover:text-theme-accent transition-colors">
            CulturaSphere
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-bold text-theme-text/80 hover:text-theme-accent transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => handleScrollTo('heritage-explorer')} 
            className="text-sm font-bold text-theme-text/80 hover:text-theme-accent transition-colors"
          >
            Heritage
          </button>
          <button 
            onClick={() => handleScrollTo('map')} 
            className="text-sm font-bold text-theme-text/80 hover:text-theme-accent transition-colors"
          >
            Map
          </button>
          <button 
            onClick={() => handleScrollTo('cultural-timeline')} 
            className="text-sm font-bold text-theme-text/80 hover:text-theme-accent transition-colors"
          >
            Timeline
          </button>
          <button 
            onClick={() => handleScrollTo('community-stories')} 
            className="text-sm font-bold text-theme-text/80 hover:text-theme-accent transition-colors"
          >
            Stories
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Light/Dark Toggle Switch */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-theme-border/60 text-theme-muted hover:text-theme-text hover:bg-theme-border/20 transition-all duration-200"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle light dark theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          <button className="text-sm font-bold text-theme-text/80 hover:text-theme-accent transition-colors px-3 py-2">
            Login
          </button>
          
          <button 
            onClick={() => handleScrollTo('heritage-explorer')}
            className="text-sm font-bold text-white bg-theme-accent hover:bg-theme-accent-hover px-5 py-2.5 rounded-xl shadow-md shadow-theme-accent/15 hover:shadow-theme-accent/25 transition-all duration-200 active:scale-95 flex items-center space-x-1.5"
          >
            <span>Join</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Trigger & Toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-theme-border/60 text-theme-muted hover:text-theme-text"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-stone-700" />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-border/20 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-theme-card border-b border-theme-border/80 py-6 px-6 flex flex-col space-y-4 shadow-xl">
          <button 
            onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="text-left text-base font-bold text-theme-text py-2 border-b border-theme-border/20"
          >
            Home
          </button>
          <button 
            onClick={() => handleScrollTo('heritage-explorer')} 
            className="text-left text-base font-bold text-theme-text py-2 border-b border-theme-border/20"
          >
            Heritage
          </button>
          <button 
            onClick={() => handleScrollTo('map')} 
            className="text-left text-base font-bold text-theme-text py-2 border-b border-theme-border/20"
          >
            Map
          </button>
          <button 
            onClick={() => handleScrollTo('cultural-timeline')} 
            className="text-left text-base font-bold text-theme-text py-2 border-b border-theme-border/20"
          >
            Timeline
          </button>
          <button 
            onClick={() => handleScrollTo('community-stories')} 
            className="text-left text-base font-bold text-theme-text py-2 border-b border-theme-border/20"
          >
            Stories
          </button>
          
          <div className="flex flex-col space-y-3 pt-4">
            <button className="text-center font-bold text-theme-text/80 hover:text-theme-text py-3 border border-theme-border rounded-xl transition-all">
              Login
            </button>
            <button 
              onClick={() => handleScrollTo('heritage-explorer')}
              className="text-center font-bold text-white bg-theme-accent hover:bg-theme-accent-hover py-3 rounded-xl shadow-md transition-all"
            >
              Join
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
