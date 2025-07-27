"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Github,
  ExternalLink,
  Brain,
  FileText,
  Calendar,
  Star,
  Eye,
  Download,
  Play,
  Code,
  X,
} from "lucide-react"
import Image from "next/image"

type Project = {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: "website" | "ml" | "academic"
  featured: boolean
  status: "completed" | "in-progress" | "planned"
  date: string
  githubUrl?: string
  liveUrl?: string
  downloadUrl?: string
  demoUrl?: string
  metrics?: {
    stars?: number
    views?: number
    downloads?: number
  }
}

const projectsData: Project[] = [
  // Website Projects
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with modern UI and advanced features",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js, featuring user authentication, payment integration, inventory management, and admin dashboard. Includes real-time notifications, advanced search, and mobile-responsive design.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    category: "website",
    featured: true,
    status: "completed",
    date: "2024-01-15",
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    metrics: { stars: 124, views: 2500 },
  },
  {
    id: 2,
    title: "Portfolio Website Builder",
    description: "Drag-and-drop portfolio builder with customizable templates",
    longDescription:
      "An intuitive portfolio builder that allows users to create professional portfolios without coding. Features include drag-and-drop interface, multiple templates, custom domains, and analytics dashboard.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "MongoDB", "AWS S3", "Socket.io"],
    category: "website",
    featured: false,
    status: "completed",
    date: "2023-11-20",
    githubUrl: "https://github.com/username/portfolio-builder",
    liveUrl: "https://portfolio-builder.com",
    metrics: { stars: 89, views: 1800 },
  },
  {
    id: 3,
    title: "Real Estate Platform",
    description: "Modern real estate listing platform with advanced search and filters",
    longDescription:
      "A comprehensive real estate platform featuring property listings, advanced search filters, virtual tours, mortgage calculator, and agent management system. Built with performance and SEO in mind.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "Mapbox", "Cloudinary"],
    category: "website",
    featured: true,
    status: "in-progress",
    date: "2024-02-01",
    githubUrl: "https://github.com/username/real-estate",
    metrics: { stars: 67, views: 1200 },
  },

  // Machine Learning Projects
  {
    id: 4,
    title: "AI Image Recognition System",
    description: "Deep learning model for multi-class image classification",
    longDescription:
      "Advanced computer vision system using CNN architecture for real-time image classification. Trained on custom dataset with 95% accuracy. Includes web interface for easy testing and API for integration.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "Docker"],
    category: "ml",
    featured: true,
    status: "completed",
    date: "2023-12-10",
    githubUrl: "https://github.com/username/image-recognition",
    demoUrl: "https://image-ai-demo.com",
    metrics: { stars: 156, downloads: 890 },
  },
  {
    id: 5,
    title: "Natural Language Processing Chatbot",
    description: "Intelligent chatbot with sentiment analysis and context understanding",
    longDescription:
      "Advanced NLP chatbot capable of understanding context, sentiment analysis, and providing intelligent responses. Trained on large conversational datasets with transformer architecture.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "PyTorch", "Transformers", "NLTK", "FastAPI"],
    category: "ml",
    featured: false,
    status: "completed",
    date: "2023-10-05",
    githubUrl: "https://github.com/username/nlp-chatbot",
    demoUrl: "https://chatbot-demo.com",
    metrics: { stars: 203, downloads: 1200 },
  },
  {
    id: 6,
    title: "Predictive Analytics Dashboard",
    description: "Machine learning dashboard for business intelligence and forecasting",
    longDescription:
      "Comprehensive analytics dashboard using machine learning algorithms for business forecasting, trend analysis, and predictive modeling. Features interactive visualizations and automated reporting.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "Scikit-learn", "Plotly", "Streamlit", "Pandas"],
    category: "ml",
    featured: true,
    status: "in-progress",
    date: "2024-01-20",
    githubUrl: "https://github.com/username/predictive-analytics",
    metrics: { stars: 78, views: 950 },
  },

  // Academic Writing Projects
  {
    id: 7,
    title: "Research on Sustainable Computing",
    description: "Comprehensive study on energy-efficient algorithms and green computing",
    longDescription:
      "In-depth research paper examining the environmental impact of computing systems and proposing novel energy-efficient algorithms. Published in IEEE conference with significant citations.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["LaTeX", "MATLAB", "Python", "Statistical Analysis"],
    category: "academic",
    featured: true,
    status: "completed",
    date: "2023-09-15",
    downloadUrl: "https://ieee.org/paper/sustainable-computing",
    metrics: { downloads: 450, views: 2100 },
  },
  {
    id: 8,
    title: "Machine Learning in Healthcare",
    description: "Analysis of ML applications in medical diagnosis and treatment",
    longDescription:
      "Comprehensive review of machine learning applications in healthcare, focusing on diagnostic accuracy, treatment optimization, and patient outcome prediction. Includes case studies and future research directions.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["R", "Python", "Statistical Modeling", "Data Visualization"],
    category: "academic",
    featured: false,
    status: "completed",
    date: "2023-07-20",
    downloadUrl: "https://journal.com/ml-healthcare",
    metrics: { downloads: 320, views: 1800 },
  },
  {
    id: 9,
    title: "Blockchain Technology Survey",
    description: "Systematic review of blockchain applications in various industries",
    longDescription:
      "Systematic literature review analyzing blockchain technology implementations across different industries, examining benefits, challenges, and future opportunities. Includes comparative analysis and recommendations.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["LaTeX", "Systematic Review", "Data Analysis"],
    category: "academic",
    featured: true,
    status: "in-progress",
    date: "2024-01-10",
    metrics: { views: 890 },
  },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "website" | "ml" | "academic">("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === "all" ? projectsData : projectsData.filter((project) => project.category === selectedCategory)

  const featuredProjects = projectsData.filter((project) => project.featured)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "website":
        return <Globe className="h-5 w-5" />
      case "ml":
        return <Brain className="h-5 w-5" />
      case "academic":
        return <FileText className="h-5 w-5" />
      default:
        return <Code className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-yellow-500"
      case "planned":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">Projects</h1>
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
              {featuredProjects.slice(0, 2).map((project, index) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover-lift group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
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
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold font-display group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground font-roboto">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(project.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {project.metrics?.stars && (
                          <div className="flex items-center">
                            <Star className="mr-1 h-3 w-3" />
                            {project.metrics.stars}
                          </div>
                        )}
                        {project.metrics?.views && (
                          <div className="flex items-center">
                            <Eye className="mr-1 h-3 w-3" />
                            {project.metrics.views}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Project Categories */}
          <Tabs defaultValue="websites" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3 mx-auto">
              <TabsTrigger value="websites" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Websites</span>
              </TabsTrigger>
              <TabsTrigger value="ml" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Machine Learning</span>
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Academic Writing</span>
              </TabsTrigger>
            </TabsList>

            {/* Website Projects */}
            <TabsContent value="websites" className="space-y-8">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-display font-bold">Web Development</h2>
                <p className="text-muted-foreground font-roboto">
                  Modern web applications built with cutting-edge technologies
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData
                  .filter((p) => p.category === "website")
                  .map((project, index) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden hover-lift group cursor-pointer fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
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
                        <p className="text-sm text-muted-foreground font-roboto line-clamp-2">{project.description}</p>

                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {project.liveUrl && (
                              <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                          {project.metrics?.stars && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="mr-1 h-3 w-3" />
                              {project.metrics.stars}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Machine Learning Projects */}
            <TabsContent value="ml" className="space-y-8">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-display font-bold">Machine Learning</h2>
                <p className="text-muted-foreground font-roboto">
                  AI and ML projects showcasing data science and intelligent systems
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData
                  .filter((p) => p.category === "ml")
                  .map((project, index) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden hover-lift group cursor-pointer fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            <Brain className="h-3 w-3 mr-1" />
                            AI/ML
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold font-display group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-roboto line-clamp-2">{project.description}</p>

                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {project.demoUrl && (
                              <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <Play className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            {project.metrics?.stars && (
                              <div className="flex items-center">
                                <Star className="mr-1 h-3 w-3" />
                                {project.metrics.stars}
                              </div>
                            )}
                            {project.metrics?.downloads && (
                              <div className="flex items-center">
                                <Download className="mr-1 h-3 w-3" />
                                {project.metrics.downloads}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Academic Writing Projects */}
            <TabsContent value="academic" className="space-y-8">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-display font-bold">Academic Writing</h2>
                <p className="text-muted-foreground font-roboto">
                  Research papers and academic publications in technology and computer science
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsData
                  .filter((p) => p.category === "academic")
                  .map((project, index) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden hover-lift group cursor-pointer fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            <FileText className="h-3 w-3 mr-1" />
                            Research
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold font-display group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-roboto line-clamp-3">{project.description}</p>

                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            {project.downloadUrl && (
                              <Button asChild>
                                <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(project.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
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
                  <h2 className="text-3xl font-display font-bold">{selectedProject.title}</h2>
                  <Badge variant="secondary" className="flex items-center">
                    {getCategoryIcon(selectedProject.category)}
                    <span className="ml-1 capitalize">{selectedProject.category}</span>
                  </Badge>
                </div>

                <p className="text-muted-foreground font-roboto leading-relaxed">{selectedProject.longDescription}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  {selectedProject.githubUrl && (
                    <Button asChild>
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.demoUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.downloadUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  {new Date(selectedProject.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}
