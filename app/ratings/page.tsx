// app/ratings/page.tsx
'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

interface Review {
  _id: string
  name: string
  role: string
  company: string
  text: string
  avatar?: string
  createdAt: string
}

export default function RatingsPage() {
  // 1) reviews selalu array, bukan undefined
  const [reviews, setReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [text, setText] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const PAGE_SIZE = 3

  async function fetchPage(p: number) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/ratings?page=${p}&limit=${PAGE_SIZE}`)
      if (!res.ok) throw new Error(`Failed to load reviews (${res.status})`)

      // 2) Ambil properti yang benar dari JSON
      const json = (await res.json()) as {
        data?: Review[]
        reviews?: Review[]
        page: number
        limit: number
        total: number
      }

      const list = json.data ?? json.reviews ?? []
      setReviews(list)
      setPage(json.page)
      setPages(Math.ceil(json.total / PAGE_SIZE))
      setTotal(json.total)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPage(1)
  }, [])

  async function uploadAvatar(file: File): Promise<string> {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const { url } = await res.json()
    setUploading(false)
    return url
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    let avatarUrl = ''
    if (avatarFile) {
      try {
        avatarUrl = await uploadAvatar(avatarFile)
      } catch {
        setError('Gagal upload avatar')
        return
      }
    }
    try {
      const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, company, text, avatar: avatarUrl }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || 'Gagal menambah review')

      // reset form & reload
      setName('')
      setRole('')
      setCompany('')
      setText('')
      setAvatarFile(null)
      setShowForm(false)
      fetchPage(page)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Ratings &amp; Reviews
          </h1>

          {error && (
            <div className="bg-red-800 text-red-200 p-3 rounded mb-6 text-center">
              {error}
            </div>
          )}

          {!showForm && (
            <div className="text-center mb-8">
              <Button onClick={() => setShowForm(true)}>Add Review</Button>
            </div>
          )}

          {showForm && (
            <Card className="bg-gray-800 p-6 mb-12">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="bg-gray-700 text-white"
                  />
                  <Input
                    placeholder="Role"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    required
                    className="bg-gray-700 text-white"
                  />
                </div>
                <Input
                  placeholder="Company"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  required
                  className="bg-gray-700 text-white"
                />
                <Textarea
                  placeholder="Write your review…"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                  className="bg-gray-700 text-white"
                />
                <div>
                  <label className="block mb-1 font-medium">
                    Avatar (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      e.target.files?.[0] && setAvatarFile(e.target.files[0])
                    }
                    disabled={uploading}
                    className="block w-full text-sm text-gray-400 bg-gray-800 border border-gray-700 p-2 rounded"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading…' : 'Submit Review'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center">Belum ada review.</p>
            ) : (
              reviews.map(r => (
                <Card key={r._id} className="bg-gray-800 p-6 flex space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 relative">
                    {r.avatar && (
                      <Image
                        src={r.avatar}
                        alt={r.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{r.name}</h3>
                    <p className="text-sm text-gray-400">
                      {r.role}, {r.company}
                    </p>
                    <p className="mt-2">{r.text}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => fetchPage(page - 1)}
              className="text-gray-300"
            >
              Previous
            </Button>
            <span className="font-medium">
              {page} / {pages} · {total} reviews
            </span>
            <Button
              variant="outline"
              disabled={page >= pages}
              onClick={() => fetchPage(page + 1)}
              className="text-gray-300"
            >
              Next
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
