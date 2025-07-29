'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

type Education = {
  _id: string
  degree: string
  institution: string
  period: string
  location: string
  gpa?: string
  description?: string
  achievements: string[]
}

export default function EducationPage() {
  const [data, setData] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/education')
      .then(r => r.json())
      .then(arr => { setData(arr); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading education…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">Education</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-roboto">
              My academic journey and continuous learning path
            </p>
          </div>

          <div className="relative">
            <div className="timeline-line"></div>
            <div className="space-y-12">
              {data.map((edu, idx) => (
                <div
                  key={edu._id}
                  className="relative fade-up"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="timeline-dot"></div>
                  <div className="ml-12">
                    <Card className="p-6 hover-lift">
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold flex items-center font-roboto">
                              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                              {edu.degree}
                            </h3>
                            <p className="text-lg text-muted-foreground font-medium font-roboto">
                              {edu.institution}
                            </p>
                          </div>
                          <div className="space-y-2 text-sm text-muted-foreground font-roboto">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              {edu.period}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              {edu.location}
                            </div>
                          </div>
                        </div>

                        {edu.gpa && (
                          <Badge variant="secondary" className="font-medium">
                            GPA: {edu.gpa}
                          </Badge>
                        )}

                        {edu.description && (
                          <p className="text-muted-foreground leading-relaxed font-roboto">
                            {edu.description}
                          </p>
                        )}

                        {edu.achievements.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium font-roboto">Key Achievements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {edu.achievements.map((ach, i) => (
                                <Badge key={i} variant="outline">
                                  {ach}
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
