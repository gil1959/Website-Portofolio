"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js 14",
    excerpt:
      "Explore the latest features in Next.js 14 and how they can improve your development workflow and application performance.",
    content: "Full blog post content here...",
    date: "2024-01-20",
    readTime: "8 min read",
    category: "Development",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    id: 2,
    title: "The Art of Clean Code: Best Practices for Developers",
    excerpt:
      "Learn essential principles and practices for writing maintainable, readable, and efficient code that stands the test of time.",
    content: "Full blog post content here...",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "Best Practices",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Clean Code", "Programming", "Best Practices"],
  },
  {
    id: 3,
    title: "Mastering CSS Grid and Flexbox for Modern Layouts",
    excerpt:
      "A comprehensive guide to creating responsive and flexible layouts using CSS Grid and Flexbox with practical examples.",
    content: "Full blog post content here...",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "CSS",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["CSS", "Layout", "Responsive Design"],
  },
  {
    id: 4,
    title: "TypeScript Tips and Tricks for Better Development",
    excerpt:
      "Discover advanced TypeScript features and patterns that will make your code more type-safe and developer-friendly.",
    content: "Full blog post content here...",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "TypeScript",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["TypeScript", "JavaScript", "Development"],
  },
  {
    id: 5,
    title: "Optimizing React Performance: A Complete Guide",
    excerpt:
      "Learn how to identify performance bottlenecks and implement optimization strategies for faster React applications.",
    content: "Full blog post content here...",
    date: "2023-12-28",
    readTime: "15 min read",
    category: "React",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 6,
    title: "Getting Started with Serverless Architecture",
    excerpt:
      "An introduction to serverless computing and how to build scalable applications using serverless technologies.",
    content: "Full blog post content here...",
    date: "2023-12-20",
    readTime: "9 min read",
    category: "Architecture",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Serverless", "Cloud", "Architecture"],
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = !selectedCategory || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development and technology
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12 fade-up-delay">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <Card className="mb-12 overflow-hidden hover-lift fade-up-delay-2">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={filteredPosts[0].image || "/placeholder.svg"}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{filteredPosts[0].category}</Badge>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(filteredPosts[0].date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {filteredPosts[0].readTime}
                      </div>
                    </div>

                    <h2 className="text-2xl font-display font-bold">{filteredPosts[0].title}</h2>

                    <p className="text-muted-foreground leading-relaxed">{filteredPosts[0].excerpt}</p>

                    <div className="flex flex-wrap gap-2">
                      {filteredPosts[0].tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/blog/${filteredPosts[0].id}`}>
                      <Button className="group">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <Card
                key={post.id}
                className="overflow-hidden hover-lift group fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" className="group">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No posts found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
