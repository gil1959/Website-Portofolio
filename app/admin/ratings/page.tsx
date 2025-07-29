'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Review {
    _id: string
    name: string
    role: string
    company: string
    text: string
    avatar?: string
    createdAt: string
}

export default function AdminRatingsPage() {
    const [items, setItems] = useState<Review[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // load semua reviews
    async function fetchAll() {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/ratings?page=1&limit=1000')
            if (!res.ok) throw new Error(`Fetch gagal (${res.status})`)
            const json = await res.json() as {
                data: Review[]
                page: number
                limit: number
                total: number
            }
            setItems(json.data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAll()
    }, [])

    // hapus satu review
    async function handleDelete(id: string) {
        if (!confirm('Yakin ingin menghapus review ini?')) return

        try {
            const res = await fetch(`/api/ratings?id=${id}`, {
                method: 'DELETE',
            })
            const body = await res.json().catch(() => ({}))
            if (!res.ok) {
                // tampilkan error detail dari server
                alert(`Delete gagal: ${body.error || res.status}`)
                return
            }
            // kalau sukses, reload daftar
            fetchAll()
        } catch (err: any) {
            alert(`Delete gagal: ${err.message}`)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading…</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-6">Admin – Reviews</h1>

            {error && <div className="mb-4 text-red-600">{error}</div>}

            {items.length === 0 ? (
                <p>Tidak ada review.</p>
            ) : (
                <ul className="space-y-4">
                    {items.map(r => (
                        <li key={r._id}>
                            <Card className="p-4 flex justify-between items-center">
                                <div>
                                    <strong>{r.name}</strong> — {r.role}, {r.company}
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(r._id)}
                                >
                                    Delete
                                </Button>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
