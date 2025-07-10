'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import Form from '@/app/components/form';


const Edit = () => {

    const router = useRouter();

    const onPress = () => {
        router.push('/dashboard/loguser/userinfo');
    };
    const backBtn = () => {
        router.push('/dashboard/loguser/userinfo');
    };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.jpg')` }}>
      <div className='mb-4'>
        <Form onBack={backBtn} button='Save' onPress={onPress} header='Edit User'>
        </Form>
      </div>
    </div>
    
  )
}

export default Edit;