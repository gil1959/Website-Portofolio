'use client';
import { useEffect, useState } from 'react';

type BlogPost = { _id: string; title: string; slug: string; content: string };

export default function AdminBlogPage() {
    const [items, setItems] = useState<BlogPost[]>([]);
    const [form, setForm] = useState<Omit<BlogPost, '_id'>>({
        title: '', slug: '', content: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    async function load() {
        const res = await fetch('/api/blog');
        setItems(await res.json());
    }
    useEffect(() => { load() }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const payload = editingId ? { id: editingId, ...form } : form;
        await fetch('/api/blog', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        setForm({ title: '', slug: '', content: '' });
        setEditingId(null);
        load();
    }

    function onEdit(b: BlogPost) {
        setEditingId(b._id);
        setForm({ title: b.title, slug: b.slug, content: b.content });
    }

    async function onDelete(id: string) {
        if (!confirm('Yakin hapus?')) return;
        await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Admin: Blog</h1>
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
                    placeholder="Slug"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    required
                />
                <textarea
                    className="textarea"
                    placeholder="Content"
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    required
                />
                <button type="submit" className="btn">
                    {editingId ? 'Update' : 'Create'}
                </button>
            </form>

            <ul className="space-y-3">
                {items.map(b => (
                    <li key={b._id} className="border p-3 rounded">
                        <h2 className="font-semibold">{b.title}</h2>
                        <p className="text-sm italic">{b.slug}</p>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => onEdit(b)} className="btn-sm">Edit</button>
                            <button onClick={() => onDelete(b._id)} className="btn-sm btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
