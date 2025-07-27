"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

const experienceData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "Jakarta, Indonesia",
    period: "2023 - Present",
    type: "Full-time",
    description:
      "Leading frontend development for enterprise web applications using React, Next.js, and TypeScript. Mentoring junior developers and establishing best practices.",
    achievements: [
      "Improved application performance by 40%",
      "Led team of 5 developers",
      "Implemented design system used across 10+ projects",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    website: "https://techinnovations.com",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    location: "Jakarta, Indonesia",
    period: "2022 - 2023",
    type: "Full-time",
    description:
      "Developed responsive web applications and collaborated with design teams to create pixel-perfect user interfaces.",
    achievements: [
      "Delivered 15+ client projects on time",
      "Reduced bundle size by 30%",
      "Implemented automated testing pipeline",
    ],
    technologies: ["React", "Vue.js", "JavaScript", "SCSS", "Jest"],
    website: "https://digitalsolutions.com",
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "StartupXYZ",
    location: "Jakarta, Indonesia",
    period: "2021 - 2022",
    type: "Full-time",
    description:
      "Built and maintained company website and internal tools. Gained experience in full-stack development.",
    achievements: [
      "Developed company portfolio website",
      "Created internal project management tool",
      "Optimized SEO resulting in 50% traffic increase",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    website: "https://startupxyz.com",
  },
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">Experience</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              My professional journey and career milestones
            </p>
          </div>

          <div className="relative">
            <div className="timeline-line"></div>

            <div className="space-y-12">
              {experienceData.map((exp, index) => (
                <div key={exp.id} className="relative fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="timeline-dot"></div>

                  <div className="ml-12">
                    <Card className="p-6 hover-lift group">
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold flex items-center">
                              <Briefcase className="mr-2 h-5 w-5 text-primary" />
                              {exp.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <p className="text-lg text-muted-foreground font-medium">{exp.company}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                asChild
                              >
                                <a href={exp.website} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              {exp.period}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              {exp.location}
                            </div>
                            <Badge variant="secondary" className="w-fit">
                              {exp.type}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                        <div className="space-y-3">
                          <h4 className="font-medium">Key Achievements:</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
