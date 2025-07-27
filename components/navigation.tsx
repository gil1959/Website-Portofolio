"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/user-provider"
import { useLoading } from "@/components/loading-provider"
import { Moon, Sun, Menu, X, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const t = useTranslation()
  const { resolvedTheme, setTheme } = useTheme()
  const { setLoading } = useLoading()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/home", label: t.home },
    { href: "/projects", label: t.projects },
    { href: "/education", label: t.education },
    { href: "/experience", label: t.experience },
    { href: "/certificates", label: t.certificates },
    { href: "/ratings", label: t.ratings },
    { href: "/blog", label: t.blog },
  ]

  const handleNavClick = (href: string) => {
    if (pathname !== href) {
      setLoading(true)
    }
    setIsOpen(false)
  }

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-display text-xl font-bold gradient-text">Portfolio</div>
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-effect-strong shadow-lg" : "glass-effect"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/home"
            className="group flex items-center space-x-2 font-poppins text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            <div className="relative">
              <Sparkles className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            </div>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent font-extrabold tracking-tight">
              GilPorto
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-4 py-2 text-sm font-medium font-inter transition-all duration-300 rounded-full group ${pathname === item.href
                  ? "text-primary bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
              >
                <span className="relative z-10">{item.label}</span>
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-full animate-pulse"></div>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full transition-all duration-300"></div>
              </Link>
            ))}

            {/* Theme Toggle */}
            <div className="ml-4 pl-4 border-l border-border/50">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative group rounded-full hover:bg-primary/10 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <div className="relative">
                  {resolvedTheme === "dark" ? (
                    <Moon className="h-5 w-5 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 text-blue-600" />

                  ) : (
                    <Sun className="h-5 w-5 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110 text-yellow-500" />
                  )}
                  <div className="absolute inset-0 bg-current/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Moon className="h-5 w-5 transition-all duration-300 text-blue-600" />
              ) : (
                <Sun className="h-5 w-5 transition-all duration-300 text-yellow-500" />

              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full hover:bg-primary/10 transition-all duration-300"
            >
              <div className="relative">
                {isOpen ? (
                  <X className="h-5 w-5 transition-all duration-300 rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 transition-all duration-300" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border/50 rounded-b-2xl">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium font-inter transition-all duration-300 rounded-xl ${pathname === item.href
                  ? "text-primary bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                onClick={() => handleNavClick(item.href)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${pathname === item.href ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                  ></div>
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
