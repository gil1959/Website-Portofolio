'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  ChevronRight, 
  FolderKanban, 
  Award, 
  Briefcase, 
  GraduationCap, 
  PenTool, 
  Star,
  Users,
  Activity,
  PlusCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Stats {
  projects: number;
  certificates: number;
  experiences: number;
  reviews: number;
  blogs: number;
}

interface RecentReview {
  _id: string;
  name: string;
  role: string;
  text: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data.stats)
          setRecentReviews(data.recentReviews)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  const sections = [
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban, count: stats?.projects },
    { href: '/admin/certificates', label: 'Certificates', icon: Award, count: stats?.certificates },
    { href: '/admin/experience', label: 'Experience', icon: Briefcase, count: stats?.experiences },
    { href: '/admin/education', label: 'Education', icon: GraduationCap, count: null },
    { href: '/admin/blog', label: 'Blog', icon: PenTool, count: stats?.blogs },
    { href: '/admin/ratings', label: 'Reviews & Ratings', icon: Star, count: stats?.reviews },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your portfolio dashboard.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            <FolderKanban className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats?.projects || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Showcased in your portfolio</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Blog Articles</CardTitle>
            <PenTool className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{isLoading ? "..." : stats?.blogs || 0}</div>
             <p className="text-xs text-muted-foreground mt-1">Published posts</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
            <Star className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{isLoading ? "..." : stats?.reviews || 0}</div>
             <p className="text-xs text-muted-foreground mt-1">From clients & colleagues</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Visitors</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold text-primary">--</div>
             <p className="text-xs text-primary/80 mt-1">Connect Analytics to view</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Management Links */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Quick Management
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map(sec => (
              <Link key={sec.href} href={sec.href}>
                <Card className="group flex items-center justify-between p-5 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                       <sec.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                        {sec.label}
                      </span>
                      {sec.count !== null && sec.count !== undefined && (
                        <p className="text-xs text-muted-foreground">{sec.count} items</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity / Reviews Sidebar */}
        <div className="space-y-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>Latest testimonials from your page</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentReviews.length > 0 ? (
                <div className="space-y-6">
                  {recentReviews.map(review => (
                    <div key={review._id} className="flex flex-col gap-1 border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm">{review.name}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="text-xs text-primary">{review.role}</span>
                      <p className="text-xs text-muted-foreground line-clamp-2 italic">"{review.text}"</p>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full text-xs">
                     <Link href="/admin/ratings">View All Reviews</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm flex flex-col items-center gap-2">
                  <Star className="w-8 h-8 opacity-20" />
                  <p>No reviews yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
