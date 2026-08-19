const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({}, { strict: false });
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function checkBlogs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const blogs = await Blog.find({});
    console.log(`Found ${blogs.length} blogs.`);
    
    for (const blog of blogs) {
      console.log(`\nBlog: ${blog.title}`);
      console.log(`- imageUrl: ${blog.imageUrl ? blog.imageUrl.substring(0, 50) + '...' : 'None'}`);
      
      const imgMatch = blog.content ? blog.content.match(/<img[^>]+src="([^">]+)"/g) : null;
      if (imgMatch) {
        console.log(`- Content Images: ${imgMatch.length}`);
        imgMatch.forEach(img => {
          const src = img.match(/src="([^">]+)"/)[1];
          console.log(`  - src: ${src.substring(0, 50)}...`);
        });
      } else {
        console.log('- Content Images: None');
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

checkBlogs();
