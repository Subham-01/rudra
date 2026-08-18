import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarDaysIcon } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import { Blog } from '@/lib/models';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug: resolvedParams.slug, status: 'published' }).lean();
  
  if (!blog) {
    return { title: 'Not Found' };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription,
    keywords: blog.tags?.join(', ') || blog.focusKeyword,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug: resolvedParams.slug, status: 'published' }).lean() as any;
  
  if (!blog) {
    notFound();
  }

  const formattedDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently';

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-500/30">
      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400 transition hover:text-amber-200 mb-12">
          <ArrowLeftIcon className="size-4" />
          Back to Blogs
        </Link>
        
        <article>
          <header className="mb-12 border-b border-white/10 pb-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="inline-flex rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-200">
                {blog.category || 'Updates'}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                <CalendarDaysIcon className="size-4" />
                <time>{formattedDate}</time>
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl text-white">
              {blog.title}
            </h1>
            
            {blog.imageUrl && (
              <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}
          </header>
          
          <div 
            className="blog-content prose-invert max-w-none pb-24 text-lg leading-relaxed text-neutral-300
              [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6
              [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mt-10 [&>h3]:mb-4
              [&>p]:mb-6
              [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2
              [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2
              [&>a]:text-amber-400 [&>a]:underline hover:[&>a]:text-amber-300
              [&>blockquote]:border-l-4 [&>blockquote]:border-amber-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-neutral-400 [&>blockquote]:my-8
              [&>img]:rounded-2xl [&>img]:my-8 [&>img]:border [&>img]:border-white/10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </main>
    </div>
  );
}
