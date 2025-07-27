"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/components/user-provider"
import { Star, Plus, Upload } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Footer } from "@/components/footer"

type Review = {
  id: number
  name: string
  rating: number
  review: string
  image: string
  date: string
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review:
      "Exceptional work! The website exceeded all our expectations. Professional, responsive, and delivered on time.",
    image: "/placeholder.svg?height=60&width=60",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    review:
      "Outstanding developer with great attention to detail. The project was completed flawlessly and communication was excellent throughout.",
    image: "/placeholder.svg?height=60&width=60",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 4,
    review:
      "Very satisfied with the results. Clean code, modern design, and great user experience. Would definitely recommend!",
    image: "/placeholder.svg?height=60&width=60",
    date: "2024-01-05",
  },
]

export default function RatingsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    review: "",
    image: "",
  })
  const t = useTranslation()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.review.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newReview: Review = {
      id: Date.now(),
      name: formData.name,
      rating: formData.rating,
      review: formData.review,
      image: formData.image || "/placeholder.svg?height=60&width=60",
      date: new Date().toISOString().split("T")[0],
    }

    setReviews([newReview, ...reviews])
    setFormData({ name: "", rating: 5, review: "", image: "" })
    setShowForm(false)

    toast({
      title: "Success",
      description: "Your review has been added successfully!",
    })
  }

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16 fade-up">
            <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text">{t.ratings}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">What clients say about working with me</p>

            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
              {renderStars(Math.round(averageRating))}
              <div className="text-muted-foreground">({reviews.length} reviews)</div>
            </div>
          </div>

          <div className="flex justify-center mb-12 fade-up-delay">
            <Button onClick={() => setShowForm(!showForm)} className="group" size="lg">
              <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
              {t.addReview}
            </Button>
          </div>

          {showForm && (
            <Card className="p-6 mb-12 scale-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold">Add Your Review</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Image (Optional)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Image URL"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.rating} *</Label>
                  {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review">{t.review} *</Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Share your experience working with me..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit">{t.submit}</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="space-y-8">
            {reviews.map((review, index) => (
              <Card key={review.id} className="p-6 hover-lift fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start space-x-4">
                  <Image
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex items-center space-x-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{review.review}</p>
                  </div>
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
