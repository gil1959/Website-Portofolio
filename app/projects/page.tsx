'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Globe,
  Brain,
  FileText,
  Calendar,
  Star,
  Eye,
  Github,
  ExternalLink,
  Play,
  Download,
  Code,
  X,
} from 'lucide-react'
import Image from 'next/image'

type Project = {
  _id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: 'website' | 'ml' | 'academic'
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
  date: string
  githubUrl?: string
  liveUrl?: string
  downloadUrl?: string
  demoUrl?: string
  metrics?: { stars?: number; views?: number; downloads?: number }
}

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'website' | 'ml' | 'academic'>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { setProjectsData(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading projects…</p>
      </div>
    )
  }

  const featuredProjects = projectsData.filter(p => p.featured)
  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory)

  const getCategoryIcon = (c: string) =>
    c === 'website' ? <Globe className="h-5 w-5" /> :
      c === 'ml' ? <Brain className="h-5 w-5" /> :
        <FileText className="h-5 w-5" />

  const getStatusColor = (s: string) =>
    s === 'completed' ? 'bg-green-500' :
      s === 'in-progress' ? 'bg-yellow-500' :
        'bg-blue-500'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-roboto">
              A showcase of my work across web development, machine learning, and academic research
            </p>
          </div>

          {/* Featured Projects */}
          <section className="mb-16 fade-up-delay">
            <h2 className="text-2xl font-display font-bold mb-8 flex items-center">
              <Star className="mr-2 h-6 w-6 text-yellow-500" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 2).map(project => (
                <Card
                  key={project._id}
                  className="overflow-hidden hover-lift group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative">
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {getCategoryIcon(project.category)}
                        <span className="ml-1 capitalize">{project.category}</span>
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold font-display group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-roboto">
                      {project.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={v => setSelectedCategory(v as any)}
            className="space-y-8"
          >
            <TabsList className="grid grid-cols-4 lg:grid-cols-4 mx-auto w-full lg:w-fit">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="website" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" /><span>Websites</span>
              </TabsTrigger>
              <TabsTrigger value="ml" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" /><span>Machine Learning</span>
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" /><span>Academic Writing</span>
              </TabsTrigger>
            </TabsList>

            {/* All */}
            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, idx) => (
                  <Card
                    key={project._id}
                    className="overflow-hidden hover-lift group cursor-pointer fade-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative">
                      <Image
                        src={project.image || '/placeholder.svg'}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold font-display group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-roboto line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <Button variant="outline" size="sm" asChild onClick={e => e.stopPropagation()}>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button variant="outline" size="sm" asChild onClick={e => e.stopPropagation()}>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Websites */}
            <TabsContent value="website" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData
                  .filter(p => p.category === 'website')
                  .map((project, idx) => (
                    <Card
                      key={project._id}
                      className="overflow-hidden hover-lift group cursor-pointer fade-up"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* same inner markup as “all” */}
                      <div className="relative">
                        <Image
                          src={project.image || '/placeholder.svg'}
                          alt={project.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold font-display group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-roboto line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* ML */}
            <TabsContent value="ml" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData
                  .filter(p => p.category === 'ml')
                  .map((project, idx) => (
                    <Card
                      key={project._id}
                      className="overflow-hidden hover-lift group cursor-pointer fade-up"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* inner markup */}
                      <div className="relative">
                        <Image
                          src={project.image || '/placeholder.svg'}
                          alt={project.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold font-display group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-roboto line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Academic */}
            <TabsContent value="academic" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsData
                  .filter(p => p.category === 'academic')
                  .map((project, idx) => (
                    <Card
                      key={project._id}
                      className="overflow-hidden hover-lift group cursor-pointer fade-up"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* inner markup */}
                      <div className="relative">
                        <Image
                          src={project.image || '/placeholder.svg'}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold font-display group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-roboto line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold">
                    {selectedProject.title}
                  </h2>
                  <Badge variant="secondary" className="flex items-center">
                    {getCategoryIcon(selectedProject.category)}
                    <span className="ml-1 capitalize">{selectedProject.category}</span>
                  </Badge>
                </div>
                <p className="text-muted-foreground font-roboto leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>
              {/* You can add tech badges & action buttons here */}
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}
