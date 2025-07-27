"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/components/user-provider"
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Send, Heart, ArrowUp, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const t = useTranslation()
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubscribing(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed! 🎉",
        description: "Thank you for subscribing to my newsletter.",
      })
      setEmail("")
      setIsSubscribing(false)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@portfolio.com", label: "Email" },
  ]

  const quickLinks = [
    { href: "/home", label: t.home },
    { href: "/projects", label: t.projects },
    { href: "/education", label: t.education },
    { href: "/experience", label: t.experience },
  ]

  const services = ["Web Development", "UI/UX Design", "Mobile Apps", "Consulting"]

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold gradient-text">Portfolio</h3>
                <p className="text-muted-foreground font-roboto leading-relaxed">
                  Creative developer passionate about crafting exceptional digital experiences with modern technologies
                  and innovative solutions.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold font-roboto">Connect With Me</h4>
                <div className="flex space-x-3">
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
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-semibold font-roboto">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 font-roboto flex items-center group"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="font-semibold font-roboto">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-muted-foreground font-roboto">{service}</span>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="space-y-3 pt-4">
                <h4 className="font-semibold font-roboto">Get In Touch</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>ragilkurniawan174@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+62 857 0927 1847</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Bengkulu, Indonesia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-semibold font-roboto">Stay Updated</h4>
                <p className="text-sm text-muted-foreground font-roboto">
                  Subscribe to get the latest updates on my projects and blog posts.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-12 font-roboto"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubscribing}
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                  >
                    {isSubscribing ? <div className="loading-spinner w-4 h-4" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </form>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-background/50 rounded-lg">
                  <div className="text-lg font-bold font-display">50+</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-3 bg-background/50 rounded-lg">
                  <div className="text-lg font-bold font-display">3+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground font-roboto">
              <span>© 2025 Ragil Kurniawan. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>in Indonesia</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-roboto"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-roboto"
              >
                Terms of Service
              </Link>

              {/* Scroll to Top Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={scrollToTop}
                className="hover:scale-110 transition-transform duration-300 bg-transparent"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
    </footer>
  )
}
