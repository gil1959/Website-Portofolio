// app/admin/dashboard/page.tsx
'use client'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

export default function AdminDashboard() {
  const sections = [
    { href: '/admin/ratings', label: 'Ratings' },
    { href: '/admin/experience', label: 'Experience' },
    { href: '/admin/education', label: 'Education' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/certificates', label: 'Certificates' },
    { href: '/admin/projects', label: 'Projects' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(sec => (
          <Link key={sec.href} href={sec.href}>
            <Card className="group flex items-center justify-between p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary">
                {sec.label}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
