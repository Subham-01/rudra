import type { MetadataRoute } from "next";
import connectToDatabase from "@/lib/db";
import { Blog } from "@/lib/models";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rudraregency.com";
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/rooms`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/banquet`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/dining`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/conference-room`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified, changeFrequency: "weekly", priority: 0.6 },
  ];

  let dynamicBlogs: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ status: 'published' }).select('slug updatedAt').lean();
    dynamicBlogs = blogs.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap", error);
  }

  return [...staticPages, ...dynamicBlogs];
}