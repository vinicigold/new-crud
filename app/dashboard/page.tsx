'use client';
import React, { useEffect, useState } from 'react';
import Nav from '@/app/components/navside';

export default function Dashboard() {
    const [count, setCount] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

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
  }, []);

    return(
        <div className="min-h-screen flex bg-[#f4f6f7]">
            <Nav header="HOME" isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <h2 className='text-3xl font-semibold text-[#1f2937] mb-4'>
                    WELCOME
                </h2>
                <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ background: '#4caf50', color: 'white', padding: 20, borderRadius: 8, flex: 1 }}>
                        <h3>Total Employee</h3>
                        <p style={{ fontSize: 28, fontWeight: 'bold' }}>{count}</p>
                    </div>
                <div style={{ background: '#2196f3', color: 'white', padding: 20, borderRadius: 8, flex: 1 }}>
                    <h3>Departments</h3>
                    <p style={{ fontSize: 28, fontWeight: 'bold' }}>3</p>
                </div>
                <div style={{ background: '#ff9800', color: 'white', padding: 20, borderRadius: 8, flex: 1 }}>
                    <h3>Pending Tasks</h3>
                    <p style={{ fontSize: 28, fontWeight: 'bold' }}>12</p>
                </div>
                    </div>
            </main>
        </div>
    );
}

