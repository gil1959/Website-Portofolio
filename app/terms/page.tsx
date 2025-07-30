'use client'

import React from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function TermsOfServicePage() {
    return (
        <>
            <Navigation />
            <main className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 flex-grow font-sans transition-all">
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <Card className="p-10 border bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 shadow-md transition-all duration-300 hover:shadow-xl rounded-2xl">
                        <article className="space-y-6">
                            <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
                            <p className="text-gray-600 dark:text-gray-400">Last updated: July 30, 2025</p>

                            <p>By accessing and using this site, you agree to the following terms:</p>

                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <strong>Content Ownership:</strong> All assets (text, images, animations) belong to me. Please don’t copy without permission.
                                </li>
                                <li>
                                    <strong>Reviews:</strong> Be kind. Hate speech, spam, or trashy content will be removed. Admin dashboard is watching 👀.
                                </li>
                                <li>
                                    <strong>Admin Access:</strong> Private and personal. Unauthorized access is a no-go.
                                </li>
                                <li>
                                    <strong>Changes:</strong> I may update stuff here anytime. Stay tuned, better UX is the goal.
                                </li>
                            </ol>

                            <div className="pt-6">
                                <Link href="/home" className="text-blue-600 dark:text-blue-400 hover:underline transition">
                                    ← Back to Home
                                </Link>
                            </div>
                        </article>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    )
}
