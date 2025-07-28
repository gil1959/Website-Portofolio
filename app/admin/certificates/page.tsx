'use client';
import { useEffect, useState } from 'react';

type Certificate = {
    _id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
};

export default function AdminCertificatesPage() {
    const [items, setItems] = useState<Certificate[]>([]);
    const [form, setForm] = useState<Omit<Certificate, '_id'>>({
        title: '', issuer: '', issueDate: '', credentialUrl: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    async function load() {
        const res = await fetch('/api/certificates');
        setItems(await res.json());
    }
    useEffect(() => { load() }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const payload = editingId ? { id: editingId, ...form } : form;
        await fetch('/api/certificates', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        setForm({ title: '', issuer: '', issueDate: '', credentialUrl: '' });
        setEditingId(null);
        load();
    }

    function onEdit(c: Certificate) {
        setEditingId(c._id);
        setForm({
            title: c.title,
            issuer: c.issuer,
            issueDate: c.issueDate,
            credentialUrl: c.credentialUrl || ''
        });
    }

    async function onDelete(id: string) {
        if (!confirm('Yakin hapus?')) return;
        await fetch(`/api/certificates?id=${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Admin: Certificates</h1>
            <form onSubmit={onSubmit} className="space-y-2">
                <input
                    className="input"
                    placeholder="Title"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    required
                />
                <input
                    className="input"
                    placeholder="Issuer"
                    value={form.issuer}
                    onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))}
                    required
                />
                <input
                    className="input"
                    type="date"
                    value={form.issueDate}
                    onChange={e => setForm(f => ({ ...f, issueDate: e.target.value }))}
                    required
                />
                <input
                    className="input"
                    placeholder="Credential URL"
                    value={form.credentialUrl}
                    onChange={e => setForm(f => ({ ...f, credentialUrl: e.target.value }))}
                />
                <button type="submit" className="btn">
                    {editingId ? 'Update' : 'Create'}
                </button>
            </form>

            <ul className="space-y-3">
                {items.map(c => (
                    <li key={c._id} className="border p-3 rounded">
                        <h2 className="font-semibold">{c.title}</h2>
                        <p className="text-sm">{c.issuer} — {new Date(c.issueDate).toLocaleDateString()}</p>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => onEdit(c)} className="btn-sm">Edit</button>
                            <button onClick={() => onDelete(c._id)} className="btn-sm btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
