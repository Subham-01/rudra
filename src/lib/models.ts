import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. AdminUser Model
export interface IAdminUser extends Document {
  username: string;
  passwordHash: string;
  email?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

export const AdminUser = (mongoose.models.AdminUser as Model<IAdminUser>) || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);

// 2. Blog Model
export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  category?: string;
  status?: 'draft' | 'published';
  seoScore?: number;
  aiScore?: number;
  focusKeyword?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    tags: [{ type: String }],
    category: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    seoScore: { type: Number },
    aiScore: { type: Number },
    focusKeyword: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export const Blog = (mongoose.models.Blog as Model<IBlog>) || mongoose.model<IBlog>('Blog', BlogSchema);

// 3. PageContent Model
export interface IPageContent extends Document {
  pageKey: string; // e.g., 'home', 'about'
  sectionKey: string; // e.g., 'hero', 'services'
  content: string; // JSON string or rich text
}

const PageContentSchema = new Schema<IPageContent>({
  pageKey: { type: String, required: true },
  sectionKey: { type: String, required: true },
  content: { type: String, required: true },
});

PageContentSchema.index({ pageKey: 1, sectionKey: 1 }, { unique: true });

export const PageContent = (mongoose.models.PageContent as Model<IPageContent>) || mongoose.model<IPageContent>('PageContent', PageContentSchema);

// 4. Image Model
export interface IImage extends Document {
  url: string;
  altText?: string;
  createdAt: Date;
}

const ImageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  altText: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Image = (mongoose.models.Image as Model<IImage>) || mongoose.model<IImage>('Image', ImageSchema);

// 5. ContactInquiry Model
export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

export const ContactInquiry = (mongoose.models.ContactInquiry as Model<IContactInquiry>) || mongoose.model<IContactInquiry>('ContactInquiry', ContactInquirySchema);

// 6. SiteSettings Model (for GTM codes, global configs)
export interface ISiteSettings extends Document {
  key: string;
  value: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export const SiteSettings = (mongoose.models.SiteSettings as Model<ISiteSettings>) || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
