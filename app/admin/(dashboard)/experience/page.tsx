'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Experience = {
    _id: string
    title: string
    company: string
    location: string
    period: string
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance'
    description?: string
    achievements: string[]
    technologies: string[]
    website?: string
}

export default function AdminExperiencePage() {
    const [items, setItems] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState<Omit<Experience, '_id'>>({
        title: '',
        company: '',
        location: '',
        period: '',
        type: 'Full-time',
        description: '',
        achievements: [],
        technologies: [],
        website: '',
    })
    const [achievementsText, setAchievementsText] = useState('')
    const [techText, setTechText] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)

    // load existing
    useEffect(() => {
        fetch('/api/experience')
            .then(r => r.json())
            .then(data => {
                setItems(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to load experiences')
                setLoading(false)
            })
    }, [])

    // submit create/update
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const payload = {
            ...form,
            achievements: achievementsText
                .split('\n')
                .map(a => a.trim())
                .filter(a => a),
            technologies: techText
                .split('\n')
                .map(t => t.trim())
                .filter(t => t),
        }

        const method = editingId ? 'PUT' : 'POST'
        const body = editingId ? { id: editingId, ...payload } : payload

        const res = await fetch('/api/experience', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (!res.ok) {
            setError(`${method} experience failed`)
            return
        }
        // reset & reload
        setForm({
            title: '',
            company: '',
            location: '',
            period: '',
            type: 'Full-time',
            description: '',
            achievements: [],
            technologies: [],
            website: '',
        })
        setAchievementsText('')
        setTechText('')
        setEditingId(null)
        const updated = await fetch('/api/experience').then(r => r.json())
        setItems(updated)
    }

    // edit existing
    function handleEdit(exp: Experience) {
        setEditingId(exp._id)
        setForm({
            title: exp.title,
            company: exp.company,
            location: exp.location,
            period: exp.period,
            type: exp.type,
            description: exp.description || '',
            achievements: exp.achievements,
            technologies: exp.technologies,
            website: exp.website || '',
        })
        setAchievementsText(exp.achievements.join('\n'))
        setTechText(exp.technologies.join('\n'))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // delete
    async function handleDelete(id: string) {
        if (!confirm('Yakin hapus pengalaman ini?')) return
        await fetch(`/api/experience?id=${id}`, { method: 'DELETE' })
        setItems(items.filter(i => i._id !== id))
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin – Experience</h1>
            {error && <p className="text-red-600">{error}</p>}
            {loading ? (
                <p>Loading…</p>
            ) : (
                <>
                    <Card className="p-6 space-y-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Position</label>
                                <Input
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="Senior Frontend Developer"
                                    required
                                />
                            </div>
                            {/* Company */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Company</label>
                                <Input
                                    value={form.company}
                                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                                    placeholder="Tech Innovations Inc."
                                    required
                                />
                            </div>
                            {/* Period */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Period</label>
                                <Input
                                    value={form.period}
                                    onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
                                    placeholder="2023 - Present"
                                    required
                                />
                            </div>
                            {/* Location */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Location</label>
                                <Input
                                    value={form.location}
                                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                                    placeholder="Jakarta, Indonesia"
                                    required
                                />
                            </div>
                            {/* Type */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Employment Type</label>
                                <select
                                    className="input"
                                    value={form.type}
                                    onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))}
                                >
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                    <option>Freelance</option>
                                </select>
                            </div>
                            {/* Website */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1">Company Website</label>
                                <Input
                                    type="url"
                                    value={form.website}
                                    onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                                    placeholder="https://techinnovations.com"
                                />
                            </div>
                            {/* Description */}
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium mb-1">Description</label>
                                <Textarea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Leading frontend development..."
                                />
                            </div>
                            {/* Achievements */}
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium mb-1">
                                    Key Achievements <span className="text-xs text-muted-foreground">(one per line)</span>
                                </label>
                                <Textarea
                                    value={achievementsText}
                                    onChange={e => setAchievementsText(e.target.value)}
                                    placeholder={`Improved application performance by 40%\nLed team of 5 developers\nImplemented design system used across 10+ projects`}
                                />
                            </div>
                            {/* Technologies */}
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium mb-1">
                                    Technologies <span className="text-xs text-muted-foreground">(one per line)</span>
                                </label>
                                <Textarea
                                    value={techText}
                                    onChange={e => setTechText(e.target.value)}
                                    placeholder={`React\nNext.js\nTypeScript\nTailwind CSS\nGraphQL`}
                                />
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
                                                title: '', company: '', location: '', period: '',
                                                type: 'Full-time', description: '',
                                                achievements: [], technologies: [], website: '',
                                            })
                                            setAchievementsText('')
                                            setTechText('')
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>

                    <ul className="space-y-4">
                        {items.map(exp => (
                            <Card key={exp._id} className="p-4 hover-lift flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold">{exp.title} @ {exp.company}</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {exp.period} &bull; {exp.location} &bull; {exp.type}
                                    </p>
                                    {exp.description && <p className="mt-1 text-sm">{exp.description}</p>}
                                    {exp.achievements.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {exp.achievements.map((a, i) => (
                                                <Badge key={i} variant="outline">{a}</Badge>
                                            ))}
                                        </div>
                                    )}
                                    {exp.technologies.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {exp.technologies.map((t, i) => (
                                                <Badge key={i} variant="secondary">{t}</Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Button size="sm" onClick={() => handleEdit(exp)}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(exp._id)}>Delete</Button>
                                </div>
                            </Card>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
