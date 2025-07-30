"use client"
import Link from "next/link";
import { useRouter } from "next/navigation"
import TextType from "@/components/TextType/TextType"
import ProfileCard from "@/components/ProfileCard/ProfileCard"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useUser, useTranslation } from "@/components/user-provider"
import { Button } from "@/components/ui/button"
import { Star, Zap } from "lucide-react"
import Image from "next/image"
import { ChessGame } from "@/components/chess-game"
import { LikeDislike } from "@/components/like-dislike";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Send, Heart, ArrowUp, ExternalLink } from "lucide-react"


export default function HomePage() {
  const project = { _id: "abc123", title: "My Portfolio" }
  const { userName } = useUser()
  const t = useTranslation()
  const router = useRouter()
  const socialLinks = [
    { icon: Github, href: "https://github.com/gil1959", label: "GitHub" },
    { icon: Linkedin, href: "www.linkedin.com/in/ragilkurniawan", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ragilkurniawan174@gmail.com", label: "TwitEmail" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50"></div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-36 items-center relative z-10">
            <div className="space-y-8 fade-up ">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-display font-bold gradient-text">
                  {t.welcome}, {userName}
                </h1>
                <h1 className="text-2xl font-display font-bold gradient-text">
                  My Name is <span></span>Ragil Kurniawan
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed font-roboto">
                  Code Chef & Life Debugger whipping up dreams with AI sauce and zero sleep.
                </p>
              </div>
              <div className="flex gap-2 flex-col">


                <div>
                  <TextType
                    text={["Creative Web Developer", "AI-Powered Developer", "Machine Learning Explorer"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className="text-2xl font-display font-bold gradient-text h1"
                  />
                </div>


              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group font-roboto font-medium"
                  onClick={() => router.push("/projects")}>
                  View My Work
                  <Zap className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-roboto font-medium bg-transparent"
                >
                  <a
                    href="https://www.linkedin.com/in/ragilkurniawan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get In Touch
                  </a>
                </Button>
              </div>

              <div>
                <div className="flex space-x-3 ">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="icon"
                      className="hover:scale-110 transition-transform duration-300 bg-transparent"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <social.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground font-roboto">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span>5.0 Rating</span>
                </div>
                <div>50+ Projects</div>
                <div>3+ Years Experience</div>
              </div>
            </div>



            <div className="space-y-6 fade-up-delay">
              {/* Profile Photo Placeholder */}
              <div className="relative mt-5">


                <ProfileCard
                  name="Ragil Kurniawan"
                  title="Website Developer"
                  handle="ragil9675"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/pp.png"

                  showUserInfo={true}
                  behindGradient="undefined"
                  mobileTiltSensitivity={10}
                  enableTilt={true}
                  enableMobileTilt={false}
                  showBehindGradient={true}
                  onContactClick={() => console.log('Contact clicked')}
                />



              </div>




            </div>
          </div>
        </section>



        {/* Chess Game */}
        <ChessGame />

        {/* Quick Stats */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
          <div className="max-w-6xl mx-auto ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Projects", value: "50+" },
                { label: "Clients", value: "25+" },
                { label: "Awards", value: "10+" },
                { label: "Experience", value: "3+" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center space-y-2 fade-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-roboto">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Like/Dislike Feature */}
        <div className="fade-up-delay-2">
          <LikeDislike targetId="abc123" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
