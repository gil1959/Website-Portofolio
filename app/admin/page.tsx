// app/admin/page.tsx
import { redirect } from 'next/navigation'

export default function AdminIndex() {
    // setiap hit /admin → kirim ke /admin/login
    redirect('/admin/login')
}
