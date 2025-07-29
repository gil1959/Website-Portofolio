'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'

type Experience = {
  _id: string
  title: string
  company: string
  location: string
  period: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance'
  description?: string
  achievements: string[]
  technologies: string[]
  website?: string
}

export default function ExperiencePage() {
  const [data, setData] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/experience')
      .then(r => r.json())
      .then(arr => { setData(arr); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading experience…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">
              Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-roboto">
              My professional journey and accomplishments
            </p>
          </div>

          <div className="relative">
            <div className="timeline-line"></div>
            <div className="space-y-12">
              {data.map((exp, idx) => (
                <div
                  key={exp._id}
                  className="relative fade-up"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="timeline-dot"></div>
                  <div className="ml-12">
                    <Card className="p-6 hover-lift">
                      <div className="space-y-4">
                        {/* Title & Company */}
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                          <div className="space-y-1">
                            <h3 className="text-xl font-semibold font-roboto flex items-center">
                              <Briefcase className="mr-2 h-5 w-5 text-primary" />
                              {exp.title}
                            </h3>
                            <p className="text-lg text-muted-foreground font-medium font-roboto">
                              {exp.company}
                            </p>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground font-roboto">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              {exp.period}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              {exp.location}
                            </div>
                            <div className="flex items-center">
                              <Badge variant="outline">{exp.type}</Badge>
                            </div>
                          </div>
                        </div>

                        {/* Website */}
                        {exp.website && (
                          <p>
                            <ExternalLink className="inline-block mr-1 h-4 w-4" />
                            <a
                              href={exp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Company Website
                            </a>
                          </p>
                        )}

                        {/* Description */}
                        {exp.description && (
                          <p className="text-muted-foreground leading-relaxed font-roboto">
                            {exp.description}
                          </p>
                        )}

                        {/* Achievements */}
                        {exp.achievements.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium font-roboto">Key Achievements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.achievements.map((ach, i) => (
                                <Badge key={i} variant="outline">
                                  {ach}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        {exp.technologies.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium font-roboto">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
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
