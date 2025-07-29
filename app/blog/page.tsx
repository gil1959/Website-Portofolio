'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Globe } from 'lucide-react'  // atau icon lain jika mau

type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt: string
  image?: string
  category: string
  date: string
  readTime: string
  tags: string[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'All' | string>('All')

  const categories = [
    'Development', 'Best Practices', 'CSS', 'TypeScript', 'React', 'Architecture'
  ]

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(setPosts)
      .finally(() => setLoading(false))
  }, [])

  // apply search + filter
  const filtered = posts.filter(p => {
    return (
      (filter === 'All' || p.category === filter)
      && p.title.toLowerCase().includes(search.toLowerCase())
    )
  })

  // first two as featured
  const featured = filtered.slice(0, 2)
  const rest = filtered.slice(2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-3 py-1 rounded-full border ${filter === cat
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featured.map((p, idx) => (
            <Card
              key={p._id}
              className={`flex overflow-hidden hover:shadow-xl transition ${idx === 0 ? 'flex-col lg:flex-row' : 'flex-col-reverse lg:flex-row-reverse'
                }`}
            >
              {/* Gambar */}
              {p.image ? (
                <div className="relative h-64 lg:h-auto lg:w-1/2">
                  <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="bg-gray-200 w-full h-64 lg:w-1/2" />
              )}

              {/* Konten */}
              <div className="p-6 flex flex-col justify-between space-y-4">
                <Badge variant="secondary">{p.category}</Badge>
                <h2 className="text-2xl font-bold">{p.title}</h2>
                <p className="line-clamp-3 text-muted-foreground">{p.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>{new Date(p.date).toLocaleDateString()} · {p.readTime}</div>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map(p => (
            <Card key={p._id} className="hover:shadow-lg transition">
              {p.image && (
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                </div>
              )}
              <div className="p-4 space-y-2">
                <Badge variant="secondary">{p.category}</Badge>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
