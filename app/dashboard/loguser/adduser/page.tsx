'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import Form from '@/app/components/form';


const Add = () => {

    const router = useRouter();

    const onPress = () => {
        router.push('/dashboard/userinfo');
    };
    const backBtn = () => {
        router.push('/dashboard/userinfo');
    };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.jpg')` }}>
      <div className='mb-4'>
        <Form onBack={backBtn} button='Add' onPress={onPress} header='Add User'>
        </Form>
      </div>
    </div>
    
  )
}

export default Add;