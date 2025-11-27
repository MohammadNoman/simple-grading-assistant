import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

interface Criterion {
    name: string;
    maxPoints: number;
    description: string;
}

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'Missing Google API Key. Please check your .env.local file.' },
                { status: 500 }
            );
        }

        const { text, rubric }: { text: string; rubric: Criterion[] } = await request.json();

        if (!text || !rubric || rubric.length === 0) {
            return NextResponse.json(
                { error: 'Missing text or rubric' },
                { status: 400 }
            );
        }

        // Create rubric description for AI
        const rubricDescription = rubric
            .map((c) => `- ${c.name} (${c.maxPoints} points): ${c.description}`)
            .join('\n');

        const totalPoints = rubric.reduce((sum, c) => sum + c.maxPoints, 0);

        // AI Grading Prompt
        const prompt = `You are an expert teacher grading assistant. Evaluate this student work fairly and provide constructive feedback.

GRADING RUBRIC (Total: ${totalPoints} points):
${rubricDescription}

STUDENT SUBMISSION:
${text}

INSTRUCTIONS:
1. Evaluate the submission against each rubric criterion
2. Assign a fair score for each criterion (be rigorous but encouraging)
3. Provide specific, actionable feedback for each criterion
4. Give an overall summary with strengths and areas for improvement

Respond in this exact JSON format:
{
  "results": [
    {
      "criterion": "criterion name",
      "score": number,
      "maxPoints": number,
      "feedback": "specific feedback with examples from the text"
    }
  ],
  "overallFeedback": "2-3 sentences summarizing performance, highlighting strengths and key areas for improvement",
  "totalScore": sum of all scores
}`;

        // Use Gemini 2.0 Flash (available to user)
        // Maximum determinism settings to ensure consistent grading
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.0,
                topK: 1, // Only consider the #1 most likely token (Greedy Decoding)
                topP: 1.0,
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        const parsedResult = JSON.parse(textResponse);

        return NextResponse.json(parsedResult);

    } catch (error: any) {
        console.error('Grading error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to grade assignment' },
            { status: 500 }
        );
    }
}
