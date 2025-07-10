'use client';

import { useRouter } from 'next/navigation';
import Button from './components/button';

export default function Home() {
  const router = useRouter();
  const handleStart = () => {
        router.push('/welcome/signin');
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.jpg')` }}>
      <div className='mb-4'>
        <Button button='START' variants="secondary" onClick={handleStart}></Button>
        <Button button='click here' variants="danger" onClick={handleStart}>
        </Button>
        <Button button='watdahil' variants="primary" onClick={handleStart}>
        </Button>
      </div>
      <div className='mb-4'>
      </div>
      <div className='flex flex-col gap-4 justify-center items-center'>
      </div>
    </div>
  );
}