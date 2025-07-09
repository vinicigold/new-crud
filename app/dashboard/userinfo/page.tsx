'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserInfo() {

    const router = useRouter();
    const [userinfo, setuserinfo ] = useState<User[]>([])

    const handleAddUser = () => {
        router.push('/dashboard/userinfo/adduser');
    };

    type User = {
        id: number
        firstname:string
        lastname:string
        age:number
        phone:number
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3002/users')
                const data = await response.json()
                setuserinfo(data)
            }
            catch(error){
                console.error('error', error)
            }
        }

        fetchUsers()
    },[])

    // const dummyData = [
    //     { firstName: 'John', lastName: 'Dutton', age: 30, phone: '09123456789' },
    //     { firstName: 'Jane', lastName: 'Doe', age: 25, phone: '09123456788' },
    //     { firstName: 'Alice', lastName: 'Smith', age: 28, phone: '09123456787' },
    //     { firstName: 'Bob', lastName: 'Johnson', age: 35, phone: '09123456786' },
    //     { firstName: 'Charlie', lastName: 'Brown', age: 22, phone: '09123456785' },
    //     { firstName: 'David', lastName: 'Wilson', age: 40, phone: '09123456784' },]

    return(
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-white shadow-md px-4 py-6">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                <nav className="space-y-4">
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/dashboard')}>
                        Home
                    </button>
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/dashboard/userinfo')}>
                        User Information
                    </button>
                    <button className='text-red-500 hover:text-blue-500 block' onClick={() => router.push('/welcome/signin')}>
                        Logout
                    </button>
                </nav>
            </aside>
            <main className='flex-1 p-8'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>USER INFORMATION</h2>
                <div className='flex justify-center items-center mb-4'>
                    <button className='text-black hover:bg-blue-500 mb-4 rounded bg-blue-300 p-2' onClick={handleAddUser}>ADD USER
                    </button>
                </div>
                <div className="overflow-x-auto"> 
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">First Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone Number</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {userinfo.map((user: User) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.firstname}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.lastname}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.age}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.phone}</td>
                                    <td className="px-4 py-2">
                                        <button className='text-blue-500 hover:underline'>Edit</button>
                                        <button className='text-red-500 hover:underline ml-2'>Delete</button>
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

