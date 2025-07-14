'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/app/components/navside';

type Employee = {
    id: number
    firstname: string
    lastname: string
    age: number
    phone: number
    department: string
}

export default function Employee() {
    const router = useRouter();
    const [empinfo, setempinfo] = useState<Employee[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchEmp = async () => {
            try {
                const response = await fetch('http://localhost:3002/getemps')
                const data = await response.json()
                setempinfo(data)
            } catch (error) {
                console.error('error', error)
            }
        }
        fetchEmp()
    }, [])

    const handleEditUser = () => {
        router.push('/dashboard/loguser/edituser')
    }

    const deleteuser = async (emp: Employee) => {
        try {
            const res = await fetch('http://localhost:3002/delemp', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emp),
            })
            if (res.ok) {
                setempinfo(empinfo.filter((u) => u.id !== emp.id))
            } else {
                console.error('failed to delete user')
            }
        } catch (error) {
            console.error('error', error)
        }
    }

    return (
        <div className="min-h-screen flex bg-[#f4f6f7]">
            <Nav header="EMPLOYEE" isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-semibold text-[#1f2937]">EMPLOYEE INFORMATION</h2>
                    <button
                    className="text-[#e5e7eb] hover:bg-[#093e22] rounded bg-[#0b4d2a] px-4 py-2"
                    onClick={() => router.push('/dashboard/employee/addemplo')}>
                    ADD EMPLOYEE
                    </button>
                </div>   
                <div className="overflow-x-auto rounded-lg shadow-sm border border-[#d1d5db]">
                    <table className="min-w-full divide-y divide-[#d1d5db] border border-[#d1d5db] overflow-hidden shadow-sm">
                        <thead className="bg-[#f1f5f9] text-[#0b4d2a]">
                            <tr >
                                <th className="px-4 py-2 text-left text-sm font-semibold">First Name</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Last Name</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Age</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Phone Number</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Department</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#d1d5db]">
                            {empinfo.map((emp: Employee) => (
                                <tr key={emp.id} className="hover:bg-[#f1f5f9] transition duration-200 shadow-sm">
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.firstname}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.lastname}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.age}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.phone}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.department}</td>
                                    <td className="px-4 py-2">
                                        <button className="text-[#2563eb] hover:underline ml-2" onClick={handleEditUser}>
                                            Edit
                                        </button>
                                        <button className="text-[#dc2626] hover:underline ml-2" onClick={() => deleteuser(emp)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
