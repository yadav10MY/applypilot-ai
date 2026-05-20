import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { generateCareerRoadmap } from '@/lib/src/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { resumeText, skills, missingSkills, targetRole } = body

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json({ error: 'Skills are required' }, { status: 400 })
    }

    // Generate career roadmap with AI
    const roadmap = await generateCareerRoadmap(
      resumeText || '',
      skills,
      missingSkills || [],
      targetRole
    )

    // Store in database (optional)
    const { error: dbError } = await supabase
      .from('career_roadmaps')
      .insert({
        user_id: user.id,
        target_role: targetRole || roadmap.targetRole,
        current_level: roadmap.currentLevel,
        roadmap_data: roadmap,
        created_at: new Date().toISOString(),
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue even if DB insert fails
    }

    return NextResponse.json(roadmap)
  } catch (error: any) {
    console.error('Roadmap generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate roadmap' },
      { status: 500 }
    )
  }
}
