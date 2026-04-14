'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

type Certificate = {
    _id: string
    title: string
    issuer: string
    issueDate: string
    description?: string
    credentialId?: string
    skills: string[]
    verifyUrl?: string
    image?: string
}

export default function AdminCertificatesPage() {
    const [items, setItems] = useState<Certificate[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [form, setForm] = useState<Omit<Certificate, '_id'>>({
        title: '',
        issuer: '',
        issueDate: '',
        description: '',
        credentialId: '',
        skills: [],
        verifyUrl: '',
        image: '',
    })
    const [skillsText, setSkillsText] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    // load existing
    useEffect(() => {
        fetch('/api/certificates')
            .then((r) => r.json())
            .then((data) => {
                setItems(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Gagal load certificates')
                setLoading(false)
            })
    }, [])

    // handle file upload
    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return
        const file = e.target.files[0]
        const data = new FormData()
        data.append('file', file)

        setUploading(true)
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: data })
            if (!res.ok) throw new Error('Upload gagal')
            const { url } = await res.json()
            setForm((f) => ({ ...f, image: url }))
        } catch {
            setError('Upload gambar gagal')
        } finally {
            setUploading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        const payload = {
            ...form,
            skills: skillsText
                .split('\n')
                .map((s) => s.trim())
                .filter((s) => s),
        }
        const method = editingId ? 'PUT' : 'POST'
        const body = editingId ? { id: editingId, ...payload } : payload

        const res = await fetch('/api/certificates', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (!res.ok) {
            setError(`${method} certificate gagal`)
            return
        }
        // reset form & reload
        setForm({
            title: '',
            issuer: '',
            issueDate: '',
            description: '',
            credentialId: '',
            skills: [],
            verifyUrl: '',
            image: '',
        })
        setSkillsText('')
        setEditingId(null)
        const updated = await fetch('/api/certificates').then((r) => r.json())
        setItems(updated)
    }

    function handleEdit(c: Certificate) {
        setEditingId(c._id)
        setForm({
            title: c.title,
            issuer: c.issuer,
            issueDate: c.issueDate,
            description: c.description || '',
            credentialId: c.credentialId || '',
            skills: c.skills,
            verifyUrl: c.verifyUrl || '',
            image: c.image || '',
        })
        setSkillsText(c.skills.join('\n'))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function handleDelete(id: string) {
        if (!confirm('Yakin hapus certificate ini?')) return
        await fetch(`/api/certificates?id=${id}`, { method: 'DELETE' })
        setItems(items.filter((i) => i._id !== id))
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin – Certificates</h1>
            {error && <p className="text-red-600">{error}</p>}
            {loading ? (
                <p>Loading…</p>
            ) : (
                <>
                    <Card className="p-6 space-y-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Title</label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                    placeholder="AWS Certified Solutions Architect"
                                    required
                                />
                            </div>

                            {/* Issuer */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Issuer</label>
                                <Input
                                    value={form.issuer}
                                    onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))}
                                    placeholder="Amazon Web Services"
                                    required
                                />
                            </div>

                            {/* Issue Date */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Issue Date</label>
                                <Input
                                    value={form.issueDate}
                                    onChange={(e) => setForm((f) => ({ ...f, issueDate: e.target.value }))}
                                    placeholder="2024"
                                    required
                                />
                            </div>

                            {/* Credential ID */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Credential ID</label>
                                <Input
                                    value={form.credentialId}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, credentialId: e.target.value }))
                                    }
                                    placeholder="AWS-CSA-2024-001"
                                />
                            </div>

                            {/* Verify URL */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Verify URL</label>
                                <Input
                                    type="url"
                                    value={form.verifyUrl}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, verifyUrl: e.target.value }))
                                    }
                                    placeholder="https://aws.amazon.com/verification"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium mb-1">Description</label>
                                <Textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, description: e.target.value }))
                                    }
                                    placeholder="Validates expertise in designing distributed systems on AWS platform."
                                />
                            </div>

                            {/* Skills */}
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium mb-1">
                                    Skills <span className="text-xs text-muted-foreground">(one per line)</span>
                                </label>
                                <Textarea
                                    value={skillsText}
                                    onChange={(e) => setSkillsText(e.target.value)}
                                    placeholder={`Cloud Architecture\nAWS Services\nSecurity\nScalability`}
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Certificate Image</label>
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
                            <div className="md:col-span-2 flex justify-end space-x-2">
                                <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
                                {editingId && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setEditingId(null)
                                            setForm({
                                                title: '',
                                                issuer: '',
                                                issueDate: '',
                                                description: '',
                                                credentialId: '',
                                                skills: [],
                                                verifyUrl: '',
                                                image: '',
                                            })
                                            setSkillsText('')
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>

                    <ul className="space-y-4">
                        {items.map((c) => (
                            <Card key={c._id} className="p-4 hover-lift flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold">{c.title}</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {c.issuer} — {c.issueDate}
                                    </p>
                                    {c.description && <p className="mt-1 text-sm">{c.description}</p>}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {c.skills.map((s, i) => (
                                            <Badge key={i} variant="secondary">
                                                {s}
                                            </Badge>
                                        ))}
                                    </div>
                                    {c.credentialId && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Credential ID: {c.credentialId}
                                        </p>
                                    )}
                                    {c.verifyUrl && (
                                        <a
                                            href={c.verifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Verify Certificate
                                        </a>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Button size="sm" onClick={() => handleEdit(c)}>
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(c._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
