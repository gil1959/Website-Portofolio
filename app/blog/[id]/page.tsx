"use client"

import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

// This would typically come from a database or CMS
const getBlogPost = (id: string) => {
  const posts = [
    {
      id: 1,
      title: "Building Modern Web Applications with Next.js 14",
      content: `
        <h2>Introduction</h2>
        <p>Next.js 14 brings exciting new features that revolutionize how we build web applications. In this comprehensive guide, we'll explore the latest additions and how they can enhance your development workflow.</p>
        
        <h2>Key Features</h2>
        <p>The new App Router provides a more intuitive way to structure your applications, while Server Components offer unprecedented performance benefits.</p>
        
        <h3>Server Components</h3>
        <p>Server Components allow you to render components on the server, reducing the JavaScript bundle size and improving initial page load times.</p>
        
        <h3>Improved Performance</h3>
        <p>With optimizations in bundling and rendering, Next.js 14 delivers faster build times and better runtime performance.</p>
        
        <h2>Getting Started</h2>
        <p>To start using Next.js 14, simply create a new project with the latest version and explore the new features.</p>
        
        <h2>Conclusion</h2>
        <p>Next.js 14 represents a significant step forward in web development, offering developers powerful tools to build faster, more efficient applications.</p>
      `,
      date: "2024-01-20",
      readTime: "8 min read",
      category: "Development",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["Next.js", "React", "Web Development"],
    },
    // Add more posts as needed
  ]

  return posts.find((post) => post.id === Number.parseInt(id))
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const post = getBlogPost(params.id as string)

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Button onClick={() => router.push("/blog")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => router.push("/blog")} className="mb-8 fade-up">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          <article className="space-y-8">
            <header className="space-y-6 fade-up">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">{post.title}</h1>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Published on{" "}
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </header>

            <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden fade-up-delay">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div
              className="prose prose-gray dark:prose-invert max-w-none fade-up-delay-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
