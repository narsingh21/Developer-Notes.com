import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

const BlogCard = () => {
  return (
    <Card className='w-full h-48 bg-backgroud/80 rounded-lg p-4'>
      <div>
        <Image
          src='/blog-placeholder.png'
          alt='Blog Image'
          width={400}
          height={200}
          className='w-full h-full object-cover rounded-md'
        />
      </div>
      <CardHeader>
        <CardTitle>Blog Title</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Blog Description</CardDescription>
      </CardContent>
    </Card>
  );
};
export default BlogCard;
