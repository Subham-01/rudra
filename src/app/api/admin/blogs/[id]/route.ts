import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Blog } from '@/lib/models';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const data = await request.json();
    // Remove immutable fields to prevent update conflicts
    if (data._id) delete data._id;
    if (data.status) data.status = data.status.toLowerCase();

    await connectToDatabase();
    const blog = await Blog.findByIdAndUpdate(resolvedParams.id, data, { new: true });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await connectToDatabase();
    const blog = await Blog.findByIdAndDelete(resolvedParams.id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
