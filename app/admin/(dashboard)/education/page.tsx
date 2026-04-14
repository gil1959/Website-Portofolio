'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

type Education = {
    _id: string
    degree: string
    institution: string
    period: string
    location: string
    gpa?: string
    description?: string
    achievements: string[]
}

export default function AdminEducationPage() {
    const [items, setItems] = useState<Education[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState<Omit<Education, '_id'>>({
        degree: '',
        institution: '',
        period: '',
        location: '',
        gpa: '',
        description: '',
        achievements: [],
    })
    const [achievementsText, setAchievementsText] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)

    // load data
    useEffect(() => {
        fetch('/api/education')
            .then(r => r.json())
            .then(data => {
                setItems(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to load')
                setLoading(false)
            })
    }, [])

    // submit
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const payload = {
            ...form,
            achievements: achievementsText
                .split('\n')
                .map(a => a.trim())
                .filter(a => a),
        }
        const method = editingId ? 'PUT' : 'POST'
        const body = editingId ? { id: editingId, ...payload } : payload

        const res = await fetch('/api/education', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (!res.ok) {
            setError(`${method} education failed`)
            return
        }

        // reset & reload
        setForm({ degree: '', institution: '', period: '', location: '', gpa: '', description: '', achievements: [] })
        setAchievementsText('')
        setEditingId(null)
        const updated = await fetch('/api/education').then(r => r.json())
        setItems(updated)
    }

    // edit existing
    function handleEdit(ed: Education) {
        setEditingId(ed._id)
        setForm({
            degree: ed.degree,
            institution: ed.institution,
            period: ed.period,
            location: ed.location,
            gpa: ed.gpa,
            description: ed.description,
            achievements: ed.achievements,
        })
        setAchievementsText(ed.achievements.join('\n'))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // delete
    async function handleDelete(id: string) {
        if (!confirm('Yakin mau hapus?')) return
        await fetch(`/api/education?id=${id}`, { method: 'DELETE' })
        setItems(items.filter(i => i._id !== id))
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin – Education</h1>
            {error && <p className="text-red-600">{error}</p>}
            {loading ? (
                <p>Loading…</p>
            ) : (
                <>
                    <Card className="p-6 space-y-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="font-medium">Degree</label>
                                <Input
                                    value={form.degree}
                                    onChange={e => setForm(f => ({ ...f, degree: e.target.value }))}
                                    placeholder="Bachelor of Computer Science"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Institution</label>
                                <Input
                                    value={form.institution}
                                    onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                                    placeholder="University of Technology"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Period</label>
                                <Input
                                    value={form.period}
                                    onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
                                    placeholder="2020 - 2024"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Location</label>
                                <Input
                                    value={form.location}
                                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                                    placeholder="Jakarta, Indonesia"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">GPA</label>
                                <Input
                                    value={form.gpa}
                                    onChange={e => setForm(f => ({ ...f, gpa: e.target.value }))}
                                    placeholder="3.8/4.0"
                                />
                            </div>
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium">Description</label>
                                <Textarea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Specialized in Software Engineering..."
                                />
                            </div>
                            <div className="md:col-span-2 flex flex-col">
                                <label className="font-medium">Key Achievements<br /><span className="text-xs text-muted-foreground">(one per line)</span></label>
                                <Textarea
                                    value={achievementsText}
                                    onChange={e => setAchievementsText(e.target.value)}
                                    placeholder={`Dean's List\nBest Final Project\nProgramming Competition Winner`}
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end space-x-2">
                                <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
                                {editingId && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setEditingId(null)
                                            setForm({ degree: '', institution: '', period: '', location: '', gpa: '', description: '', achievements: [] })
                                            setAchievementsText('')
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>

                    <ul className="space-y-4">
                        {items.map(ed => (
                            <Card key={ed._id} className="p-4 hover-lift flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold">{ed.degree}</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {ed.institution} &bull; {ed.period} &bull; {ed.location}
                                    </p>
                                    {ed.gpa && (
                                        <Badge variant="secondary" className="mt-1">GPA: {ed.gpa}</Badge>
                                    )}
                                    {ed.description && (
                                        <p className="mt-2 text-sm">{ed.description}</p>
                                    )}
                                    {ed.achievements.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {ed.achievements.map((a, i) => (
                                                <Badge key={i} variant="outline">{a}</Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Button size="sm" onClick={() => handleEdit(ed)}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(ed._id)}>Delete</Button>
                                </div>
                            </Card>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
