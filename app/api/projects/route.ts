import {getProjects} from '@/api/data/projects'
import {NextResponse} from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const projects = await getProjects()
        return NextResponse.json(projects)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
