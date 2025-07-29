'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Award, Calendar, Eye, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { Footer } from '@/components/footer'

type Certificate = {
  _id: string
  title: string
  issuer: string
  issueDate: string
  description?: string
  credentialId?: string
  skills: string[]
  verifyUrl?: string
  image?: string
}

export default function CertificatesPage() {
  const [data, setData] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/certificates')
      .then((r) => r.json())
      .then((arr) => {
        setData(arr)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading certificates…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">
              Certificates
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and continuous learning achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((cert, i) => (
              <Card
                key={cert._id}
                className="overflow-hidden hover-lift group cursor-pointer fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setSelectedId(selectedId === cert._id ? null : cert._id)}
              >
                {cert.image && (
                  <div className="relative">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-start">
                      <Award className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {cert.issueDate}
                  </div>

                  {cert.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((s, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                    {cert.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{cert.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {selectedId === cert._id && (
                    <div className="space-y-3 pt-4 border-t scale-in">
                      {cert.credentialId && (
                        <div className="text-sm">
                          <span className="font-medium">Credential ID: </span>
                          <span className="text-muted-foreground">{cert.credentialId}</span>
                        </div>
                      )}
                      <div className="space-y-2">
                        <span className="text-sm font-medium">All Skills:</span>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((s, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {cert.verifyUrl && (
                        <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Verify Certificate
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
