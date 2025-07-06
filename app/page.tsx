'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleStart = () => {
        router.push('/welcome/signin');
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.jpg')` }}>
      <div className='mb-4'>
        <button type='submit' onClick={handleStart} className=' bg-blue-300 text-black p-2 rounded w-full max-w-
      hover:bg-blue-600 transition duration-200'>START</button>
        </div>
    </div>
  );
}