'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {

    const router = useRouter();
    return(
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-white shadow-md px-4 py-6">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                <nav className="space-y-4">
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/dashboard')}>
                        Home
                    </button>
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/dashboard/info')}>
                        User Information
                    </button>
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/welcome/signin')}>
                        Logout
                    </button>
                </nav>
            </aside>
        </div>
    );
}

