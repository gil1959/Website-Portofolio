"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Computer Science",
    institution: "University of Technology",
    location: "Jakarta, Indonesia",
    period: "2020 - 2024",
    gpa: "3.8/4.0",
    description: "Specialized in Software Engineering and Web Development. Graduated Magna Cum Laude.",
    achievements: ["Dean's List", "Best Final Project", "Programming Competition Winner"],
  },
  {
    id: 2,
    degree: "High School Diploma",
    institution: "SMA Negeri 1 Jakarta",
    location: "Jakarta, Indonesia",
    period: "2017 - 2020",
    gpa: "95/100",
    description: "Science track with focus on Mathematics and Physics.",
    achievements: ["Valedictorian", "Science Olympiad Gold Medal", "Student Council President"],
  },
]

export default function EducationPage() {
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
              {educationData.map((edu, index) => (
                <div key={edu.id} className="relative fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
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
                            <p className="text-lg text-muted-foreground font-medium font-roboto">{edu.institution}</p>
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

                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary" className="font-medium">
                            GPA: {edu.gpa}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground leading-relaxed font-roboto">{edu.description}</p>

                        <div className="space-y-2">
                          <h4 className="font-medium font-roboto">Key Achievements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.achievements.map((achievement, i) => (
                              <Badge key={i} variant="outline">
                                {achievement}
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
