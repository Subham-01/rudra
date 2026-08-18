import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Blog } from '@/lib/models';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectToDatabase();
    
    // Generate a simple slug if not provided
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    // Remove _id if it's empty to prevent Mongoose cast errors
    if (!data._id) delete data._id;
    if (data.status) data.status = data.status.toLowerCase();
    if (!data.content) data.content = ' ';

    const blog = new Blog(data);
    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Blog creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
