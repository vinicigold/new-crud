'use client';
import React from 'react';
import Nav from '@/app/components/navside';

export default function Dashboard() {


    return(
        <div className="min-h-screen flex bg-gray-100">
            <Nav header='HOME'/>
            <main className='flex-1 p-8'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>
                    WELCOME
                </h2>
            </main>
        </div>
    );
}

