import { H1 } from '@/components/typography/h1';
import BlogCard from '@/features/blogs/components/blog-card';

const blogs = [
  {
    id: 1,
    name: 'Blog 1',
    description: 'This is the description for Blog 1.',
  },
];

const Page = () => {
  return (
    <div className='min-h-screen flex flex-col items-center  px-18'>
      <H1>Blogs</H1>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} />
      ))}
    </div>
  );
};

export default Page;
