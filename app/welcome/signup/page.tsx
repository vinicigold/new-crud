'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import Form from '@/app/components/form';

export default function SignUpPage() {

    const router = useRouter();
    const onPress = () => {
        router.push('/welcome/signin');
    }
    const backBtn = () => {
        router.push('/welcome/signin');
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url('/bg.jpg')` }}>
            <div className='mb-4'>
                <Form onBack={backBtn} button='Sign Up' onPress={onPress} header='Sign Up'>
                </Form>
            </div>
        </div>
    );
}