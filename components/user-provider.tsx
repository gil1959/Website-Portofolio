"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "id"

type UserContextType = {
  userName: string
  language: Language
  setUserName: (name: string) => void
  setLanguage: (lang: Language) => void
  isIntroComplete: boolean
  setIntroComplete: (complete: boolean) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

const translations = {
  en: {
    hello: "Hello",
    welcome: "Welcome",
    home: "Home",
    education: "Education",
    experience: "Experience",
    certificates: "Certificates",
    ratings: "Ratings",
    blog: "Blog",
    projects: "Projects",
    addReview: "Add Review",
    submit: "Submit",
    name: "Name",
    review: "Review",
    rating: "Rating",
  },
  id: {
    hello: "Halo",
    welcome: "Selamat Datang",
    home: "Beranda",
    education: "Pendidikan",
    experience: "Pengalaman",
    certificates: "Sertifikat",
    ratings: "Penilaian",
    blog: "Blog",
    projects: "Proyek",
    addReview: "Tambah Ulasan",
    submit: "Kirim",
    name: "Nama",
    review: "Ulasan",
    rating: "Penilaian",
  },
}

export function useTranslation() {
  const { language } = useUser()
  return translations[language]
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("")
  const [language, setLanguage] = useState<Language>("en")
  const [isIntroComplete, setIntroComplete] = useState(false)

  return (
    <UserContext.Provider
      value={{
        userName,
        language,
        setUserName,
        setLanguage,
        isIntroComplete,
        setIntroComplete,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
