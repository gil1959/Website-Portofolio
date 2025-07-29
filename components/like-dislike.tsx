'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThumbsUp, ThumbsDown, Heart, TrendingUp } from 'lucide-react'

interface LikeDislikeProps {
  /** unique id of whatever you’re rating (e.g. project._id or post.slug) */
  targetId: string
}

export function LikeDislike({ targetId }: LikeDislikeProps) {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null)
  const [isAnimating, setAnimating] = useState<'like' | 'dislike' | null>(null)

  const likePercentage =
    likes + dislikes > 0
      ? Math.round((likes / (likes + dislikes)) * 100)
      : 0

  // load counts from backend
  async function load() {
    try {
      const res = await fetch(`/api/likes?targetId=${encodeURIComponent(targetId)}`)
      if (res.ok) {
        const { likes, dislikes } = await res.json() as { likes: number; dislikes: number }
        setLikes(likes)
        setDislikes(dislikes)
      }
    } catch { }
  }

  useEffect(() => {
    if (targetId) load()
  }, [targetId])

  // send a vote
  async function vote(action: 'like' | 'dislike') {
    setAnimating(action)
    await fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetId, action }),
    })
    await load()
    setUserVote(action)
    setTimeout(() => setAnimating(null), 600)
  }

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
        {/* LIKE */}
        <div className="text-center space-y-2">
          <Button
            variant={userVote === 'like' ? 'default' : 'outline'}
            size="lg"
            onClick={() => vote('like')}
            className={`group relative overflow-hidden transition-all duration-300 ${isAnimating === 'like' ? 'scale-110' : ''
              } ${userVote === 'like'
                ? 'bg-green-600 hover:bg-green-700'
                : 'hover:bg-green-50 dark:hover:bg-green-950'
              }`}
          >
            <ThumbsUp
              className={`h-5 w-5 transition-all duration-300 ${userVote === 'like'
                  ? 'text-white'
                  : 'text-green-600 group-hover:scale-110'
                }`}
            />
            {isAnimating === 'like' && (
              <div className="absolute inset-0 bg-green-400/20 animate-ping rounded-md" />
            )}
          </Button>
          <div className="space-y-1">
            <div
              className={`text-2xl font-bold font-display ${userVote === 'like' ? 'text-green-600' : ''
                }`}
            >
              {likes}
            </div>
            <div className="text-xs text-muted-foreground">Likes</div>
          </div>
        </div>

        <div className="h-16 w-px bg-border" />

        {/* DISLIKE */}
        <div className="text-center space-y-2">
          <Button
            variant={userVote === 'dislike' ? 'default' : 'outline'}
            size="lg"
            onClick={() => vote('dislike')}
            className={`group relative overflow-hidden transition-all duration-300 ${isAnimating === 'dislike' ? 'scale-110' : ''
              } ${userVote === 'dislike'
                ? 'bg-red-600 hover:bg-red-700'
                : 'hover:bg-red-50 dark:hover:bg-red-950'
              }`}
          >
            <ThumbsDown
              className={`h-5 w-5 transition-all duration-300 ${userVote === 'dislike'
                  ? 'text-white'
                  : 'text-red-600 group-hover:scale-110'
                }`}
            />
            {isAnimating === 'dislike' && (
              <div className="absolute inset-0 bg-red-400/20 animate-ping rounded-md" />
            )}
          </Button>
          <div className="space-y-1">
            <div
              className={`text-2xl font-bold font-display ${userVote === 'dislike' ? 'text-red-600' : ''
                }`}
            >
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
            {likes + dislikes} vote{likes + dislikes !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
            style={{ width: `${likePercentage}%` }}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground font-roboto">
          {userVote === 'like' && 'Thanks for your support! 🎉'}
          {userVote === 'dislike' && 'Your feedback helps me improve! 💪'}
          {!userVote && 'What do you think of my portfolio?'}
        </p>
      </div>
    </Card>
  )
}
