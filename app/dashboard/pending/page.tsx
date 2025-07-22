'use client';
import React, { useState } from 'react';
import Nav from '@/app/components/navside';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    return(
        <div className="min-h-screen flex bg-[#f4f6f7]">
            <Nav header="PENDING TASK" isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} `}>
               <form className='w-full bg-white p-4 rounded-lg shadow-md bg-opacity-90 mb-6'>
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold text-[#0b4d2a]">PENDING TASK</h2>
                        <button type='button' className="text-[#e5e7eb] hover:bg-[#093e22] rounded bg-[#0b4d2a] px-4 py-2" >
                            ADD TASK
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                        <h3 className="text-lg font-medium">Departments</h3>
                        <p className="text-3xl font-bold mt-2">3</p>
                    </div>
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                        <h3 className="text-lg font-medium">Pending Tasks</h3>
                        <p className="text-3xl font-bold mt-2">69</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

