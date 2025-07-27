"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/components/user-provider"
import { ArrowRight } from "lucide-react"

export default function IntroPage() {
  const [name, setName] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isVisible, setIsVisible] = useState(false)
  const { setUserName, setLanguage, setIntroComplete } = useUser()
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (name.trim()) {
      setUserName(name.trim())
      setLanguage(selectedLanguage as "en" | "id")
      setIntroComplete(true)
      router.push("/home")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full space-y-8 transition-all duration-1000 ${isVisible ? "fade-up" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-display font-bold gradient-text">Hello</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6 fade-up-delay">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="What's Your Name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center text-lg py-6 border-2 focus:border-gray-400 transition-colors font-roboto"
              onKeyPress={(e) => e.key === "Enter" && handleNext()}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 font-roboto">
              Choose Your Language
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="py-6 border-2 font-roboto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleNext}
            disabled={!name.trim()}
            className="w-full py-6 text-lg font-medium group transition-all duration-300 hover:scale-105 font-roboto"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
