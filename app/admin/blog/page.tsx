// app/admin/blog/page.tsx
'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type BlogForm = {
    title: string
    slug: string
    excerpt: string
    content: string
    image: string
    category: string
    readTime: string
    date: string
    tags: string
}

type BlogPost = BlogForm & { _id: string; tags: string[] }

const CATEGORIES = [
    'Development',
    'Best Practices',
    'CSS',
    'TypeScript',
    'React',
    'Architecture',
]

export default function AdminBlogPage() {
    const [items, setItems] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    const [form, setForm] = useState<BlogForm>({
        title: '', slug: '', excerpt: '', content: '',
        image: '', category: CATEGORIES[0],
        readTime: '', date: '', tags: '',
    })

    // load
    useEffect(() => {
        fetch('/api/blog')
            .then(r => r.json())
            .then((data: any[]) => {
                setItems(data.map(d => ({
                    ...d,
                    tags: Array.isArray(d.tags) ? d.tags : []
                })))
            })
            .catch(() => setError('Load failed'))
            .finally(() => setLoading(false))
    }, [])

    // reload helper
    async function reload() {
        const data = await fetch('/api/blog').then(r => r.json())
        setItems(data)
    }

    // generic form field setter
    function handleChange<K extends keyof BlogForm>(
        key: K, value: BlogForm[K]
    ) {
        setForm(f => ({ ...f, [key]: value }))
    }

    // file upload handler (updated)
    async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setError(null)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({ error: res.statusText }))
                throw new Error(err.error || res.statusText)
            }

            const { url } = await res.json()
            handleChange('image', url)
        } catch (err: any) {
            console.error('Upload failed:', err)
            setError('Image upload failed: ' + err.message)
        } finally {
            setUploading(false)
        }
    }

    // create or update
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        const payload = {
            ...form,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            date: form.date,
        }
        const method = editingId ? 'PUT' : 'POST'
        const url = '/api/blog'
        const body = editingId
            ? { id: editingId, ...payload }
            : payload

        const res = await fetch(url, {
            method, headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Bad' }))
            setError(err.error)
            return
        }
        // reset
        setForm({
            title: '', slug: '', excerpt: '', content: '',
            image: '', category: CATEGORIES[0],
            readTime: '', date: '', tags: '',
        })
        setEditingId(null)
        reload()
    }

    // populate form for editing
    function onEdit(p: BlogPost) {
        setEditingId(p._id)
        setForm({
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            content: p.content,
            image: p.image || '',
            category: p.category,
            readTime: p.readTime,
            date: p.date.slice(0, 10),  // yyyy‑mm‑dd
            tags: p.tags.join(','),
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // delete endpoint call
    async function onDelete(id: string) {
        if (!confirm('Hapus post ini?')) return
        const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' })
        if (!res.ok) {
            setError('Hapus gagal')
            return
        }
        setItems(items.filter(i => i._id !== id))
    }

    if (loading) return <p>Loading…</p>

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin – Blog Posts</h1>
            {error && <p className="text-red-600">{error}</p>}

            <Card className="p-6">
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div className="col-span-2">
                        <label className="block mb-1">Title</label>
                        <Input
                            value={form.title}
                            onChange={e => handleChange('title', e.target.value)}
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block mb-1">Slug</label>
                        <Input
                            value={form.slug}
                            onChange={e => handleChange('slug', e.target.value)}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1">Category</label>
                        <select
                            className="input"
                            value={form.category}
                            onChange={e => handleChange('category', e.target.value)}
                        >
                            {CATEGORIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Excerpt */}
                    <div className="col-span-2">
                        <label className="block mb-1">Excerpt</label>
                        <Textarea
                            value={form.excerpt}
                            onChange={e => handleChange('excerpt', e.target.value)}
                            required
                        />
                    </div>

                    {/* Content */}
                    <div className="col-span-2">
                        <label className="block mb-1">Content</label>
                        <Textarea
                            rows={6}
                            value={form.content}
                            onChange={e => handleChange('content', e.target.value)}
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className="col-span-2">
                        <label className="block mb-1">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                            className="block w-full"
                        />
                        {form.image && (
                            <div className="mt-2 w-32 h-20 relative">
                                <Image src={form.image} fill alt="preview" className="object-cover rounded" />
                            </div>
                        )}
                    </div>

                    {/* Read Time */}
                    <div>
                        <label className="block mb-1">Read Time</label>
                        <Input
                            value={form.readTime}
                            onChange={e => handleChange('readTime', e.target.value)}
                            required
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-1">Date</label>
                        <Input
                            type="date"
                            value={form.date}
                            onChange={e => handleChange('date', e.target.value)}
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div className="col-span-2">
                        <label className="block mb-1">Tags (comma‑sep.)</label>
                        <Input
                            value={form.tags}
                            onChange={e => handleChange('tags', e.target.value)}
                        />
                    </div>

                    {/* Submit / Cancel */}
                    <div className="col-span-2 flex space-x-2">
                        <Button type="submit">
                            {editingId ? 'Update' : 'Create'}
                        </Button>
                        {editingId && (
                            <Button variant="outline" onClick={() => {
                                setEditingId(null)
                                setForm({
                                    title: '', slug: '', excerpt: '', content: '',
                                    image: '', category: CATEGORIES[0],
                                    readTime: '', date: '', tags: ''
                                })
                            }}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </Card>

            <ul className="space-y-4">
                {items.map(p => (
                    <li key={p._id} className="border p-4 rounded grid grid-cols-[1fr,auto] gap-4">
                        <div>
                            <h2 className="font-semibold text-lg">{p.title}</h2>
                            <p className="text-sm text-gray-600">{p.excerpt}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {p.tags.map(t => (
                                    <span key={t} className="px-2 py-1 bg-gray-200 rounded text-xs">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            {p.image && (
                                <div className="w-24 h-16 relative">
                                    <Image src={p.image} fill alt={p.title} className="object-cover rounded" />
                                </div>
                            )}
                            <div className="space-x-2">
                                <Button size="sm" onClick={() => onEdit(p)}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => onDelete(p._id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
