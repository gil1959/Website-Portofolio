'use client';
import { useEffect, useState } from 'react';

type Education = {
    _id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate?: string;
    description?: string;
};

export default function AdminEducationPage() {
    const [items, setItems] = useState<Education[]>([]);
    const [form, setForm] = useState<Omit<Education, '_id'>>({
        institution: '', degree: '', startDate: '', endDate: '', description: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    async function load() {
        const res = await fetch('/api/education');
        setItems(await res.json());
    }
    useEffect(() => { load() }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const payload = editingId ? { id: editingId, ...form } : form;
        await fetch('/api/education', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        setForm({ institution: '', degree: '', startDate: '', endDate: '', description: '' });
        setEditingId(null);
        load();
    }

    function onEdit(ed: Education) {
        setEditingId(ed._id);
        setForm({
            institution: ed.institution,
            degree: ed.degree,
            startDate: ed.startDate,
            endDate: ed.endDate || '',
            description: ed.description || ''
        });
    }

    async function onDelete(id: string) {
        if (!confirm('Yakin hapus?')) return;
        await fetch(`/api/education?id=${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Admin: Education</h1>
            <form onSubmit={onSubmit} className="space-y-2">
                <input
                    className="input"
                    placeholder="Institution"
                    value={form.institution}
                    onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                    required
                />
                <input
                    className="input"
                    placeholder="Degree"
                    value={form.degree}
                    onChange={e => setForm(f => ({ ...f, degree: e.target.value }))}
                    required
                />
                <input
                    className="input"
                    type="date"
                    value={form.startDate}
                    onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                    required
                />
                <input
                    className="input"
                    type="date"
                    value={form.endDate}
                    onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                />
                <textarea
                    className="textarea"
                    placeholder="Description"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
                <button type="submit" className="btn">
                    {editingId ? 'Update' : 'Create'}
                </button>
            </form>

            <ul className="space-y-3">
                {items.map(ed => (
                    <li key={ed._id} className="border p-3 rounded">
                        <h2 className="font-semibold">{ed.institution}</h2>
                        <p className="text-sm">{ed.degree} ({ed.startDate} – {ed.endDate || 'Now'})</p>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => onEdit(ed)} className="btn-sm">Edit</button>
                            <button onClick={() => onDelete(ed._id)} className="btn-sm btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
