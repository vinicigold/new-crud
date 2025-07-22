'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Nav from '@/app/components/navside';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [count, setCount] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [currentDT, setcurrentDT] = useState(new Date())

    const handleClickEmp = () => {
        router.push('/dashboard/employee')
    }

    useEffect(() => {

    const timer = setInterval(() => {
        setcurrentDT(new Date())
    },1000)

    const fetchcount = async () => {
        try{
            const res = await fetch('http://localhost:3002/countemp')
            const data = await res.json()
            setCount(data.count)
    }catch(error) {
        console.error('error', error)
    }
    }
    fetchcount()
    return () => clearInterval(timer)
    }, [])

    const formattedDT = currentDT.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    return(
        <div className="min-h-screen flex bg-[#f4f6f7]">
            <Nav header="DASHBOARD" isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} `}>
                <form className='w-full bg-white p-4 rounded-lg shadow-md bg-opacity-90 mb-6'>
                    <div className="flex items-center justify-between">
                        <h2 className='text-3xl font-semibold text-[#0b4d2a]'>
                        DASHBOARD
                        </h2>
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <button onClick={handleClickEmp}>
                        <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out text-left">
                            <h3 className="text-lg font-medium">Total Employees</h3>
                            <p className="text-3xl font-bold mt-2">{count ?? '...'}</p>
                        </div>
                    </button>
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                        <h3 className="text-lg font-medium">Departments</h3>
                        <p className="text-3xl font-bold mt-2">3</p>
                    </div>
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                        <h3 className="text-lg font-medium">Pending Tasks</h3>
                        <p className="text-3xl font-bold mt-2">69</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3   gap-6 items-start mb-6">
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out md:col-span-2">
                        <h3 className="text-lg font-medium">Graph</h3>
                        <div className="mt-4 h-80 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                            <Image src="/graph.png" alt="Graph" fill style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                        <h3 className="text-lg font-medium">Date</h3>
                        <p className="text-3xl font-bold mt-2">{formattedDT}</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

