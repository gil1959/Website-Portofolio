'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type Project = {
    _id: string
    title: string
    description: string
    url: string
    image?: string
    category: 'website' | 'ml' | 'academic'
    githubUrl?: string
    liveUrl?: string
    featured: boolean    // ← tambahkan ke type
    status: 'planned' | 'in-progress' | 'completed'  // ← tambahkan
}

export default function AdminProjectsPage() {
    const [items, setItems] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState<Omit<Project, '_id'>>({
        title: '',
        description: '',
        url: '',
        image: '',
        category: 'website',
        githubUrl: '',
        liveUrl: '',
        featured: false,       // ← state awal
        status: 'planned',     // ← state awal
    })
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    // Load existing
    useEffect(() => {
        fetch('/api/projects')
            .then(r => r.json())
            .then(data => { setItems(data); setLoading(false) })
            .catch(() => { setError('Gagal load'); setLoading(false) })
    }, [])

    // Upload image
    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return
        const data = new FormData()
        data.append('file', e.target.files[0])
        setUploading(true)
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: data })
            const { url } = await res.json()
            setForm(f => ({ ...f, image: url }))
        } catch {
            setError('Upload gagal')
        } finally {
            setUploading(false)
        }
    }

    // Submit create/update
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        const method = editingId ? 'PUT' : 'POST'
        const payload = editingId ? { id: editingId, ...form } : form

        try {
            const res = await fetch('/api/projects', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error('Gagal')
            // reset & reload
            setForm({
                title: '', description: '', url: '', image: '',
                category: 'website', githubUrl: '', liveUrl: '',
                featured: false, status: 'planned',
            })
            setEditingId(null)
            const updated = await fetch('/api/projects').then(r => r.json())
            setItems(updated)
        } catch {
            setError(`${method} project gagal`)
        }
    }

    // Edit
    function handleEdit(p: Project) {
        setEditingId(p._id)
        setForm({ ...p })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Delete
    async function handleDelete(id: string) {
        if (!confirm('Yakin?')) return
        await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
        setItems(items.filter(i => i._id !== id))
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin – Projects</h1>
            {error && <p className="text-red-600">{error}</p>}
            {loading ? <p>Loading…</p> : (
                <>
                    <Card className="p-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Title</label>
                                <Input
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Category</label>
                                <select
                                    className="input"
                                    value={form.category}
                                    onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))}
                                >
                                    <option value="website">Website</option>
                                    <option value="ml">Machine Learning</option>
                                    <option value="academic">Academic</option>
                                </select>
                            </div>

                            {/* Featured */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                                />
                                <label className="font-medium">Featured?</label>
                            </div>

                            {/* Status */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Status</label>
                                <select
                                    className="input"
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
                                >
                                    <option value="planned">Planned</option>
                                    <option value="in-progress">In‑Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            {/* GitHub URL */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">GitHub URL</label>
                                <Input
                                    type="url"
                                    value={form.githubUrl}
                                    onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                                />
                            </div>

                            {/* Live Demo URL */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Live Demo URL</label>
                                <Input
                                    type="url"
                                    value={form.liveUrl}
                                    onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium mb-1">Description</label>
                                <Textarea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    required
                                />
                            </div>

                            {/* URL (live) */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Project URL</label>
                                <Input
                                    type="url"
                                    value={form.url}
                                    onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                                    required
                                />
                            </div>

                            {/* Image */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={uploading}
                                    className="block w-full text-sm text-gray-600"
                                />
                                {form.image && (
                                    <div className="mt-2 w-32 h-20 relative">
                                        <Image src={form.image} alt="preview" fill className="object-cover rounded" />
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-end space-x-2">
                                <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
                                {editingId && (
                                    <Button variant="outline" onClick={() => {
                                        setEditingId(null)
                                        setForm({
                                            title: '', description: '', url: '', image: '',
                                            category: 'website', githubUrl: '', liveUrl: '',
                                            featured: false, status: 'planned'
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
                            <li key={p._id} className="border p-4 rounded flex justify-between">
                                <div>
                                    <h2 className="font-semibold">{p.title}</h2>
                                    <p className="text-sm text-gray-600">{p.description}</p>
                                </div>
                                <div className="space-x-2">
                                    <Button size="sm" onClick={() => handleEdit(p)}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
