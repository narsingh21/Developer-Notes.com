import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { BlogCardProps } from '../types/blogs.type';

const BlogCard = ({ image, title, description }: BlogCardProps) => {
  return (
    <Card className='w-full h-auto bg-background/80 rounded-lg p-4 flex flex-row gap-4'>
      <Image
        src={image}
        alt={title}
        width={100}
        height={192}
        className='w-40  rounded-md shrink-0'
      />
      <div className='flex-1 flex flex-col'>
        <CardHeader className='flex-1 pb-2'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className='pt-2'>
          <span className='text-sm text-muted-foreground'>07 MAR 2026</span>
        </CardFooter>
      </div>
    </Card>
  );
};
export default BlogCard;
