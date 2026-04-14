import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import Project from '@/models/Project'
import Certificate from '@/models/Certificate'
import Experience from '@/models/Experience'
import Review from '@/models/Review'
import Blog from '@/models/Blog'

export async function GET() {
    try {
        await connectToDatabase()

        const [
            projectsCount,
            certificatesCount,
            experiencesCount,
            reviewsCount,
            blogsCount,
            recentReviews
        ] = await Promise.all([
            Project.countDocuments(),
            Certificate.countDocuments(),
            Experience.countDocuments(),
            Review.countDocuments(),
            Blog.countDocuments(),
            Review.find().sort({ createdAt: -1 }).limit(3) // Get 3 most recent reviews
        ])

        return NextResponse.json({
            stats: {
                projects: projectsCount,
                certificates: certificatesCount,
                experiences: experiencesCount,
                reviews: reviewsCount,
                blogs: blogsCount,
            },
            recentReviews
        })
    } catch (error) {
        console.error("Error fetching stats:", error)
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }
}
