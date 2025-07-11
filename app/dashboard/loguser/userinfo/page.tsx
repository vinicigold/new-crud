'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/app/components/navside';

    type User = {
        id: number
        firstname:string
        lastname:string
        age:number
        phone:number
    }

export default function UserInfo() {

    const router = useRouter();
    const [userinfo, setuserinfo ] = useState<User[]>([])
    
    const handleEditUser = () => {
        router.push('/dashboard/loguser/edituser')
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3002/getusers')
                const data = await response.json()
                setuserinfo(data)
            }
            catch(error){
                console.error('error', error)
            }
        }

        fetchUsers()
    },[])

    const deleteuser = async (user: User) => {
        try{
            const res = await fetch('http://localhost:3002/deluser',{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(user),
            })
            if(res.ok) {
                setuserinfo(userinfo.filter(u => u.id !== user.id))
            }else{
                console.error('failed to delete user')
            }
        }catch (error) {
            console.error('error', error)
        }
    }

    return(
        <div className="min-h-screen flex bg-gray-100">
            <Nav header='User Information'/>
            <main className='flex-1 p-8'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>USER INFORMATION</h2>
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
                                        <button className='text-red-500 hover:underline ml-2' onClick={handleEditUser}>Edit</button>
                                        <button className='text-red-500 hover:underline ml-2' onClick={() => deleteuser(user)}>Delete</button>
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

