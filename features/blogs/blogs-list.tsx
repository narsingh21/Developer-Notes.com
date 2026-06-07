import { H1 } from '@/components/typography/h1';
import BlogCard from './components/blog-card';
import { BlogCardProps } from './types/blogs.type';
import { blogsList } from './constants/blogs.constant';

const BlogsList = () => {
  return (
    <div className='w-full max-w-4xl mx-auto py-8 space-y-6'>
      <H1>Blogs</H1>
      {blogsList.map((blog: BlogCardProps) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
};

export default BlogsList;
