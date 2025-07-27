"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, ExternalLink, Eye } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

const certificatesData = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-CSA-2024-001",
    description: "Validates expertise in designing distributed systems on AWS platform.",
    image: "/placeholder.svg?height=300&width=400",
    verifyUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Architecture", "AWS Services", "Security", "Scalability"],
  },
  {
    id: 2,
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
    credentialId: "GCP-PD-2023-002",
    description: "Demonstrates ability to build scalable applications on Google Cloud Platform.",
    image: "/placeholder.svg?height=300&width=400",
    verifyUrl: "https://cloud.google.com/certification",
    skills: ["GCP Services", "Kubernetes", "DevOps", "Microservices"],
  },
  {
    id: 3,
    title: "Meta Frontend Developer Professional",
    issuer: "Meta (Facebook)",
    date: "2023",
    credentialId: "META-FE-2023-003",
    description: "Comprehensive program covering modern frontend development practices.",
    image: "/placeholder.svg?height=300&width=400",
    verifyUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    skills: ["React", "JavaScript", "HTML/CSS", "UI/UX Design"],
  },
  {
    id: 4,
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "2022",
    credentialId: "AZ-900-2022-004",
    description: "Foundation-level knowledge of cloud services and Microsoft Azure.",
    image: "/placeholder.svg?height=300&width=400",
    verifyUrl: "https://docs.microsoft.com/en-us/learn/certifications/",
    skills: ["Azure Services", "Cloud Computing", "Security", "Compliance"],
  },
  {
    id: 5,
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2023",
    credentialId: "CKA-2023-005",
    description: "Validates skills in Kubernetes administration and management.",
    image: "/placeholder.svg?height=300&width=400",
    verifyUrl: "https://www.cncf.io/certification/cka/",
    skills: ["Kubernetes", "Container Orchestration", "DevOps", "Linux"],
  },
  {
    id: 6,
    title: "MongoDB Certified Developer",
    issuer: "MongoDB Inc.",
    date: "2022",
    credentialId: "MDB-DEV-2022-006",
    description: "Expertise in MongoDB database design and development.",
    image: "/placeholder.svg?height=300&width=400",
    verifyUrl: "https://university.mongodb.com/certification",
    skills: ["MongoDB", "NoSQL", "Database Design", "Aggregation"],
  },
]

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">Certificates</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and continuous learning achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificatesData.map((cert, index) => (
              <Card
                key={cert.id}
                className="overflow-hidden hover-lift group cursor-pointer fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
              >
                <div className="relative">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-start">
                      <Award className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {cert.date}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {cert.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{cert.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {selectedCert === cert.id && (
                    <div className="space-y-3 pt-4 border-t scale-in">
                      <div className="text-sm">
                        <span className="font-medium">Credential ID: </span>
                        <span className="text-muted-foreground">{cert.credentialId}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm font-medium">All Skills:</span>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Verify Certificate
                        </a>
                      </Button>
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
