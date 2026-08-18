import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      // Ignore if directory already exists
    }

    // Generate a unique filename to prevent overwrites
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = path.join(uploadsDir, filename);
    
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
