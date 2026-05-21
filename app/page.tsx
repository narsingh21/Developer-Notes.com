import { Button } from './_component/Button';
import { Header } from './_component/Header';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center py-12'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to Developer Notes</h1>
        <p className='text-lg text-gray-600 mb-6'>
          Your go-to resource for coding tutorials and insights.
        </p>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
