import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { analyzeResumeWithAI } from '@/lib/src/lib/openai'
import { extractResumeText, parseResumeContent } from '@/lib/src/lib/resume-parser'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Extract text from resume
    const resumeText = await extractResumeText(file)
    
    // Parse resume content
    const parsedContent = parseResumeContent(resumeText)

    // Analyze with AI
    const aiAnalysis = await analyzeResumeWithAI(resumeText)

    // Combine results
    const result = {
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
      analysis: {
        ...aiAnalysis,
        parsed: parsedContent,
        fullText: resumeText.substring(0, 500), // First 500 chars for preview
      }
    }

    // Store in database (optional - add your DB logic here)
    const { error: dbError } = await supabase
      .from('resume_analyses')
      .insert({
        user_id: user.id,
        file_name: file.name,
        ats_score: aiAnalysis.atsScore,
        analysis_data: result.analysis,
        created_at: new Date().toISOString(),
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue even if DB insert fails
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Resume analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}
