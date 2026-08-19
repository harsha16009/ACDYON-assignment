import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, User, Send, Heart, Sparkles, MessageSquare, AlertCircle } from 'lucide-react'

const INITIAL_STORIES = [
  {
    id: 1,
    author: 'Anjali Sharma',
    site: 'Ajanta Cave Paintings',
    title: 'The Whispers of Cave 1',
    content: 'I visited Ajanta on a rainy Tuesday. Inside Cave 1, as the natural light outside dimmed, the Bodhisattva Padmapani seemed to glow from the wall. The local guide explained that the paint was made from crushed lapis lazuli and copper ore, mixed with glue. Realizing monks painted this 1,500 years ago using only simple oil lamps is deeply humbling.',
    likes: 24,
    date: 'Aug 12, 2026'
  },
  {
    id: 2,
    author: 'Debashis Roy',
    site: 'Konark Sun Temple',
    title: "Konark's Silent Sundial",
    content: 'Standing next to the main chariot wheel at exactly 10:00 AM, our guide placed a small wooden twig at the center of the wheel. The shadow cast by the twig pointed directly to the second bead on the spoke. I checked my phone—it was exactly 10:02 AM. The mathematical genius of these 13th-century stonemasons is absolutely mind-blowing.',
    likes: 18,
    date: 'Jul 28, 2026'
  },
  {
    id: 3,
    author: 'Siddharth Mani',
    site: 'Brihadisvara Temple',
    title: 'Barefoot on Granite',
    content: 'Walking the granite courtyard of Thanjavur at 8:00 AM, the stone was cool and soft. By 11:00 AM, it becomes too hot to touch. Running my fingers over the thousands of Tamil inscriptions recording the names of donors, dancers, and guards who walked these same stones 1,000 years ago connects you directly to the stream of history.',
    likes: 31,
    date: 'Jun 19, 2026'
  }
]

export default function CommunityStories() {
  const [stories, setStories] = useState(() => {
    try {
      const stored = localStorage.getItem('cs_community_stories')
      return stored ? JSON.parse(stored) : INITIAL_STORIES
    } catch {
      return INITIAL_STORIES
    }
  })

  const [author, setAuthor] = useState('')
  const [site, setSite] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [likedStories, setLikedStories] = useState(() => {
    try {
      const stored = localStorage.getItem('cs_liked_stories')
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('cs_community_stories', JSON.stringify(stories))
  }, [stories])

  useEffect(() => {
    localStorage.setItem('cs_liked_stories', JSON.stringify(likedStories))
  }, [likedStories])

  const handleLike = (storyId) => {
    const isLiked = likedStories[storyId]
    setLikedStories({ ...likedStories, [storyId]: !isLiked })
    
    setStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId
          ? { ...story, likes: isLiked ? story.likes - 1 : story.likes + 1 }
          : story
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!author.trim() || !site.trim() || !title.trim() || !content.trim()) {
      setError('Please fill in all fields before submitting your story.')
      return
    }

    if (content.length < 30) {
      setError('Your story must be at least 30 characters long.')
      return
    }

    setError('')

    const newStory = {
      id: Date.now(),
      author: author.trim(),
      site: site.trim(),
      title: title.trim(),
      content: content.trim(),
      likes: 0,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }

    setStories([newStory, ...stories])
    
    // Reset form
    setAuthor('')
    setSite('')
    setTitle('')
    setContent('')
  }

  return (
    <section id="community-stories" className="py-20 bg-theme-bg">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-theme-accent mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Shared Chronicles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Community Stories</h2>
          <p className="text-theme-muted mt-3 text-sm leading-relaxed">
            Read authentic logs shared by travelers and local guides, or share your own personal experience visiting Indian heritage sites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Stories List Board */}
          <div className="lg:col-span-7 space-y-6 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin">
            <AnimatePresence mode="popLayout">
              {stories.map((story) => {
                const isLiked = likedStories[story.id]
                return (
                  <motion.div
                    key={story.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 bg-theme-card border border-theme-border/60 rounded-2xl shadow-sm space-y-4 hover:border-theme-accent/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-theme-accent/10 text-theme-accent font-mono">
                          {story.site}
                        </span>
                        <h3 className="text-lg font-bold tracking-tight text-theme-text mt-1">
                          {story.title}
                        </h3>
                      </div>
                      <span className="text-xs text-theme-muted">{story.date}</span>
                    </div>

                    <p className="text-sm text-theme-text/90 italic font-serif leading-relaxed pl-3 border-l-2 border-theme-accent/40">
                      "{story.content}"
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-theme-border/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-theme-border/40 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-theme-muted" />
                        </div>
                        <span className="text-xs font-semibold text-theme-muted">
                          By {story.author}
                        </span>
                      </div>

                      <button
                        onClick={() => handleLike(story.id)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          isLiked
                            ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/20 dark:border-red-900/30'
                            : 'border-theme-border text-theme-muted hover:text-theme-text hover:border-theme-accent/50'
                        }`}
                        aria-label={`Upvote story by ${story.author}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{story.likes} Upvotes</span>
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Story Contribution Form */}
          <div className="lg:col-span-5 bg-theme-card border border-theme-border/60 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center space-x-2 text-theme-accent mb-4">
              <MessageSquare className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Share Your Chronicle</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="author-name" className="block text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="author-name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Rajan Patel"
                  className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-accent/40 text-theme-text"
                />
              </div>

              <div>
                <label htmlFor="site-select" className="block text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1.5">
                  Heritage Site
                </label>
                <input
                  type="text"
                  id="site-select"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  placeholder="e.g. Hampi, Karnataka"
                  className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-accent/40 text-theme-text"
                />
              </div>

              <div>
                <label htmlFor="story-title" className="block text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1.5">
                  Chronicle Title
                </label>
                <input
                  type="text"
                  id="story-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. A Sunrise Over the Ruins"
                  className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-accent/40 text-theme-text"
                />
              </div>

              <div>
                <label htmlFor="story-content" className="block text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1.5">
                  Your Experience (Min. 30 chars)
                </label>
                <textarea
                  id="story-content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe what you saw, felt, or learned at the heritage site..."
                  className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-accent/40 text-theme-text leading-relaxed"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-start space-x-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-semibold">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-theme-accent hover:bg-theme-accent-hover text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 duration-200 flex items-center justify-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Publish Story</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-theme-border/20 text-center">
              <span className="text-[10px] text-theme-muted flex items-center justify-center space-x-1">
                <Sparkles className="w-3 h-3 text-theme-accent" />
                <span>Published stories are saved locally to your device.</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
