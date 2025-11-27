import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse/lib/pdf-parse.js';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Extract text from PDF
        const data = await pdf(buffer);
        const text = data.text;

        if (!text || text.trim().length === 0) {
            return NextResponse.json(
                { error: 'No text found in PDF' },
                { status: 400 }
            );
        }

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error('PDF extraction error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to extract PDF text' },
            { status: 500 }
        );
    }
}
