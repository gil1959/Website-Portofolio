"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Heart, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LikeDislike() {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)
  const [isAnimating, setIsAnimating] = useState<"like" | "dislike" | null>(null)
  const { toast } = useToast()

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem("portfolio-likes")
    const savedDislikes = localStorage.getItem("portfolio-dislikes")
    const savedUserVote = localStorage.getItem("portfolio-user-vote")

    if (savedLikes) setLikes(Number.parseInt(savedLikes))
    if (savedDislikes) setDislikes(Number.parseInt(savedDislikes))
    if (savedUserVote) setUserVote(savedUserVote as "like" | "dislike")
  }, [])

  const handleLike = () => {
    if (userVote === "like") {
      // Remove like
      const newLikes = likes - 1
      setLikes(newLikes)
      setUserVote(null)
      localStorage.setItem("portfolio-likes", newLikes.toString())
      localStorage.removeItem("portfolio-user-vote")
      toast({
        title: "Like removed",
        description: "Thanks for your feedback!",
      })
    } else {
      // Add like (and remove dislike if exists)
      const newLikes = likes + 1
      let newDislikes = dislikes

      if (userVote === "dislike") {
        newDislikes = dislikes - 1
        setDislikes(newDislikes)
        localStorage.setItem("portfolio-dislikes", newDislikes.toString())
      }

      setLikes(newLikes)
      setUserVote("like")
      setIsAnimating("like")

      localStorage.setItem("portfolio-likes", newLikes.toString())
      localStorage.setItem("portfolio-user-vote", "like")

      toast({
        title: "Thanks for the like! ❤️",
        description: "Your feedback helps me improve!",
      })

      setTimeout(() => setIsAnimating(null), 600)
    }
  }

  const handleDislike = () => {
    if (userVote === "dislike") {
      // Remove dislike
      const newDislikes = dislikes - 1
      setDislikes(newDislikes)
      setUserVote(null)
      localStorage.setItem("portfolio-dislikes", newDislikes.toString())
      localStorage.removeItem("portfolio-user-vote")
      toast({
        title: "Dislike removed",
        description: "Thanks for reconsidering!",
      })
    } else {
      // Add dislike (and remove like if exists)
      const newDislikes = dislikes + 1
      let newLikes = likes

      if (userVote === "like") {
        newLikes = likes - 1
        setLikes(newLikes)
        localStorage.setItem("portfolio-likes", newLikes.toString())
      }

      setDislikes(newDislikes)
      setUserVote("dislike")
      setIsAnimating("dislike")

      localStorage.setItem("portfolio-dislikes", newDislikes.toString())
      localStorage.setItem("portfolio-user-vote", "dislike")

      toast({
        title: "Feedback received",
        description: "Thanks for your honest opinion. I'll work on improvements!",
      })

      setTimeout(() => setIsAnimating(null), 600)
    }
  }

  const likePercentage = likes + dislikes > 0 ? Math.round((likes / (likes + dislikes)) * 100) : 0

  return (
    <Card className="p-6 space-y-4 rounded-none bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center font-display">
          <Heart className="mr-2 h-5 w-5 text-red-500" />
          Rate My Portfolio
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>{likePercentage}% positive</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <div className="text-center space-y-2">
          <Button
            variant={userVote === "like" ? "default" : "outline"}
            size="lg"
            onClick={handleLike}
            className={`group relative overflow-hidden transition-all duration-300 ${isAnimating === "like" ? "scale-110" : ""
              } ${userVote === "like" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50 dark:hover:bg-green-950"}`}
          >
            <ThumbsUp
              className={`h-5 w-5 transition-all duration-300 ${userVote === "like" ? "text-white" : "text-green-600 group-hover:scale-110"
                }`}
            />
            {isAnimating === "like" && <div className="absolute inset-0 bg-green-400/20 animate-ping rounded-md"></div>}
          </Button>
          <div className="space-y-1">
            <div className={`text-2xl font-bold font-display ${userVote === "like" ? "text-green-600" : ""}`}>
              {likes}
            </div>
            <div className="text-xs text-muted-foreground">Likes</div>
          </div>
        </div>

        <div className="h-16 w-px bg-border"></div>

        <div className="text-center space-y-2">
          <Button
            variant={userVote === "dislike" ? "default" : "outline"}
            size="lg"
            onClick={handleDislike}
            className={`group relative overflow-hidden transition-all duration-300 ${isAnimating === "dislike" ? "scale-110" : ""
              } ${userVote === "dislike" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50 dark:hover:bg-red-950"}`}
          >
            <ThumbsDown
              className={`h-5 w-5 transition-all duration-300 ${userVote === "dislike" ? "text-white" : "text-red-600 group-hover:scale-110"
                }`}
            />
            {isAnimating === "dislike" && (
              <div className="absolute inset-0 bg-red-400/20 animate-ping rounded-md"></div>
            )}
          </Button>
          <div className="space-y-1">
            <div className={`text-2xl font-bold font-display ${userVote === "dislike" ? "text-red-600" : ""}`}>
              {dislikes}
            </div>
            <div className="text-xs text-muted-foreground">Dislikes</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Overall Rating</span>
          <span>
            {likes + dislikes} vote{likes + dislikes !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
            style={{ width: `${likePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground font-roboto">
          {userVote === "like" && "Thanks for your support! 🎉"}
          {userVote === "dislike" && "Your feedback helps me improve! 💪"}
          {!userVote && "What do you think of my portfolio?"}
        </p>
      </div>
    </Card>
  )
}
