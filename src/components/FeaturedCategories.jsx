import { Compass, CalendarDays, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FeaturedCategories() {
  const categories = [
    {
      id: 'heritage-explorer',
      title: 'Heritage Explorer',
      description: 'Discover monuments, art, and traditions.',
      icon: Compass,
      color: 'from-amber-500/10 to-orange-500/10 text-theme-accent'
    },
    {
      id: 'cultural-timeline',
      title: 'Cultural Timeline',
      description: "Explore India's past through time.",
      icon: CalendarDays,
      color: 'from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400'
    },
    {
      id: 'community-stories',
      title: 'Community Stories',
      description: 'Read and share real cultural stories.',
      icon: BookOpen,
      color: 'from-amber-600/10 to-yellow-500/10 text-amber-700 dark:text-amber-400'
    }
  ]

  const handleScrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // offset for Sticky Navbar
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
    <section className="py-12 bg-theme-bg/60 border-b border-theme-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleScrollTo(category.id)}
                className="group cursor-pointer p-6 bg-theme-card border border-theme-border/60 hover:border-theme-accent/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-theme-accent/40"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleScrollTo(category.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} transition-colors duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-theme-text group-hover:text-theme-accent transition-colors duration-200">
                      {category.title}
                    </h3>
                    <p className="text-sm text-theme-muted mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
