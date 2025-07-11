'use client';
import React, { useEffect, useState } from 'react';
import Nav from '@/app/components/navside';

export default function Dashboard() {
    const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchcount = async () => {
        try{
            const res = await fetch('http://localhost:3002/countuser')
            const data = await res.json()
            setCount(data.count)
    }catch(error) {
        console.error('error', error)
    }
    }
      
    fetchcount();
  }, []);

    return(
        <div className="min-h-screen flex bg-gray-100">
            <Nav header='HOME'/>
            <main className='flex-1 p-8'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>
                    WELCOME
                </h2>
                <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ background: '#4caf50', color: 'white', padding: 20, borderRadius: 8, flex: 1 }}>
                        <h3>Total Users</h3>
                        <p style={{ fontSize: 28, fontWeight: 'bold' }}>{count !== null ? count.toLocaleString() : 'Loading...'}</p>
                    </div>
                <div style={{ background: '#2196f3', color: 'white', padding: 20, borderRadius: 8, flex: 1 }}>
                    <h3>New Orders</h3>
                    <p style={{ fontSize: 28, fontWeight: 'bold' }}>56</p>
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

