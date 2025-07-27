"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  const handleSave = (section: string) => {
    toast({
      title: "Success",
      description: `${section} saved successfully!`,
    })
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="education" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="education" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add Education Entry</h2>
                <Button onClick={() => handleSave("Education")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" placeholder="Bachelor of Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" placeholder="University Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Country" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Input id="period" placeholder="2020 - 2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input id="gpa" placeholder="3.8/4.0" />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description..." />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add Experience Entry</h2>
                <Button onClick={() => handleSave("Experience")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" placeholder="Senior Frontend Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Company Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exp-location">Location</Label>
                  <Input id="exp-location" placeholder="City, Country" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exp-period">Period</Label>
                  <Input id="exp-period" placeholder="2023 - Present" />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="exp-description">Description</Label>
                <Textarea id="exp-description" placeholder="Job description..." />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add Certificate</h2>
                <Button onClick={() => handleSave("Certificate")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cert-title">Certificate Title</Label>
                  <Input id="cert-title" placeholder="AWS Certified Solutions Architect" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuer</Label>
                  <Input id="issuer" placeholder="Amazon Web Services" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-date">Date</Label>
                  <Input id="cert-date" placeholder="2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credential">Credential ID</Label>
                  <Input id="credential" placeholder="AWS-CSA-2024-001" />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="cert-description">Description</Label>
                <Textarea id="cert-description" placeholder="Certificate description..." />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add Project</h2>
                <Button onClick={() => handleSave("Project")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input id="project-title" placeholder="E-Commerce Platform" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-category">Category</Label>
                    <select
                      id="project-category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="website">Website</option>
                      <option value="ml">Machine Learning</option>
                      <option value="academic">Academic Writing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-status">Status</Label>
                    <select
                      id="project-status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-date">Date</Label>
                    <Input id="project-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-github">GitHub URL</Label>
                    <Input id="project-github" placeholder="https://github.com/username/project" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-live">Live URL</Label>
                    <Input id="project-live" placeholder="https://project-demo.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Short Description</Label>
                  <Textarea id="project-description" placeholder="Brief project description..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-long-description">Detailed Description</Label>
                  <Textarea
                    id="project-long-description"
                    rows={4}
                    placeholder="Comprehensive project description with features and technical details..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-technologies">Technologies (comma separated)</Label>
                    <Input id="project-technologies" placeholder="React, Next.js, TypeScript, Tailwind CSS" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-image">Image URL</Label>
                    <Input id="project-image" placeholder="https://example.com/project-image.jpg" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Project Metrics (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="project-stars">GitHub Stars</Label>
                      <Input id="project-stars" type="number" placeholder="124" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-views">Views</Label>
                      <Input id="project-views" type="number" placeholder="2500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-downloads">Downloads</Label>
                      <Input id="project-downloads" type="number" placeholder="890" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="project-featured" className="rounded" />
                  <Label htmlFor="project-featured">Mark as Featured Project</Label>
                </div>
              </div>
            </Card>

            {/* Existing Projects List */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Existing Projects</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">E-Commerce Platform</h4>
                    <p className="text-sm text-muted-foreground">Full-stack e-commerce solution with modern UI</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Website</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Completed</span>
                      <span>⭐ Featured</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">AI Image Recognition System</h4>
                    <p className="text-sm text-muted-foreground">
                      Deep learning model for multi-class image classification
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Machine Learning</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Completed</span>
                      <span>⭐ Featured</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Research on Sustainable Computing</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive study on energy-efficient algorithms</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Academic</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Completed</span>
                      <span>⭐ Featured</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add Blog Post</h2>
                <Button onClick={() => handleSave("Blog Post")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="blog-title">Title</Label>
                  <Input id="blog-title" placeholder="Blog post title..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Development" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="read-time">Read Time</Label>
                    <Input id="read-time" placeholder="8 min read" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea id="excerpt" placeholder="Brief excerpt..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" rows={10} placeholder="Full blog post content..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="React, Next.js, Web Development" />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
