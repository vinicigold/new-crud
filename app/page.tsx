'use client';

import { useRouter } from 'next/navigation';
import { Button } from './components';

export default function Home() {
  const router = useRouter();
  const handleStart = () => {
        router.push('/welcome/signin');
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.jpg')` }}>
      <div className='mb-4'>
        <Button variants="secondary" onclick={handleStart}>START</Button>
        <Button variants="danger" onclick={handleStart}>
          click here
        </Button>
        <Button variants="primary" onclick={handleStart}>
          watdahil
        </Button>
      </div>
      <div className='flex flex-col gap-4 justify-center items-center'>
        
      </div>
    </div>
  );
}