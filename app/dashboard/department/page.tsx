'use client';
import React, { useEffect, useState } from 'react';
import Nav from '@/app/components/navside';
import { useRouter } from 'next/navigation';

type Dept = {
    id: number
    department: string
}

export default function Dashboard() {
    const [count, setCount] = useState<number | null>(null)
    const [deptInfo, setDeptInfo] = useState<Dept[]>([])
      const [selected, setSelected] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!selected) return;

        const fetchCountByDept = async () => {
            try {
            const res = await fetch(`http://localhost:3002/countdepemp?department=${selected}`);
            const data = await res.json();
            setCount(data.count);
            } catch (error) {
            console.error('Error fetching department count:', error);
            setCount(null)
            }
        }

        fetchCountByDept();
        }, [selected])


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
        }, [])

    useEffect(() => {
    
        const fetchdep = async () => {
            try{
                const res = await fetch('http://localhost:3002/getdep')
                const data = await res.json()
                setDeptInfo(data)
        }catch(error) {
            console.error('error', error)
        }
        }
    fetchdep()
    }, [])

    return(
        <div className="min-h-screen flex bg-[#f4f6f7]">
            <Nav header="DEPARTMENT" isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} `}>
               <form className='w-full bg-white p-4 rounded-lg shadow-md bg-opacity-90 mb-6'>
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold text-[#0b4d2a]">DEPARTMENT</h2>
                        <button type='button' className="text-[#e5e7eb] hover:bg-[#093e22] rounded bg-[#0b4d2a] px-4 py-2" >
                            ADD DEPARTMENT
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out text-left">
                        <h3 className="text-lg font-medium">Total Employees</h3>
                        <p className="text-3xl font-bold mt-2">{count ?? '...'}</p>
                    </div>
                    <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
                        <h3 className="text-lg font-medium">Departments</h3>
                        <select id='department' name='department' value={selected} onChange={(e) => setSelected(e.target.value)}
                        className=" p-2 rounded w-full max-w-s">
                            <option value=''>Select Department</option>
                            {deptInfo.map((dept) => 
                            <option key={dept.id} value={dept.department}>
                                {dept.department}
                            </option>
                            )}
                        </select>
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

