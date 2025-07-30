'use client'

import React from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
    return (
        <>
            <Navigation />
            <main className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 flex-grow font-sans transition-all">
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <Card className="p-10 border bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 shadow-md transition-all duration-300 hover:shadow-xl rounded-2xl">
                        <article className="space-y-6">
                            <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
                            <p className="text-gray-600 dark:text-gray-400">Last updated: July 30, 2025</p>

                            <p>
                                Hey there! This portfolio site was crafted by me, Ragil Kurniawan. When you interact here,
                                you might share a bit of your info like name, photo, or a review.
                            </p>

                            <h2 className="text-xl font-semibold">What data do we collect?</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Your name (if you leave a review)</li>
                                <li>Your photo (if uploaded)</li>
                                <li>Your rating/message</li>
                            </ul>

                            <h2 className="text-xl font-semibold">Why do we collect it?</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>To display your feedback in the review section</li>
                                <li>To let others know how awesome this portfolio is 😄</li>
                            </ul>

                            <h2 className="text-xl font-semibold">How is it handled?</h2>
                            <p>
                                Your data is stored securely and not shared with any third parties.
                                Need something deleted? Hit me up in the contact section.
                            </p>

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
