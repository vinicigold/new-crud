'use client';
import React, { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/app/components/navside';

type Employee = {
    id: number
    firstname:string
    lastname:string
    age:number
    phone:number
    department:string
}

export default function Employee() {

    const router = useRouter()
    const [empinfo, setempinfo] = useState<Employee[]>([])

    const handleEditUser = () => {
        router.push('/dashboard/loguser/edituser')
    }

    useEffect(() => {
        const fetchEmp = async () => {
            try{
                const response = await fetch('http://localhost:3002/getemps')
                const data = await response.json()
                setempinfo(data)
            }catch(error){
                console.error('error',error)
            }
        }
        fetchEmp()
    },[])
    // const dummyData = [
    // { firstName: 'John', lastName: 'Dutton', age: 30, phone: '09123456789', department: 'IT' },
    // { firstName: 'Jane', lastName: 'Doe', age: 25, phone: '09123456788', department: 'IT' },  
    // { firstName: 'Alice', lastName: 'Smith', age: 28, phone: '09123456787', department: 'IT' },
    // { firstName: 'Bob', lastName: 'Johnson', age: 35, phone: '09123456786', department: 'IT' },
    // { firstName: 'Charlie', lastName: 'Brown', age: 22, phone: '09123456785', department: 'IT' },
    // { firstName: 'David', lastName: 'Wilson', age: 40, phone: '09123456784', department: 'IT' },]
    return(
        <div className="min-h-screen flex bg-gray-100">
            <Nav header='EMPLOYEE'/>
            <main className='flex-1 p-8'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>EMPLOYEE INFORMAMATION</h2>
                <button className='block mx-auto text-black hover:bg-blue-500 mb-4 rounded bg-blue-300 p-2'
                onClick={() => router.push('/dashboard/employee/addemplo')}>ADD EMPLOYEE
                </button>
                <div className="overflow-x-auto"> 
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">First Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone Number</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {empinfo.map((emp: Employee) => (
                                <tr key={emp.id}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.firstname}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.lastname}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.age}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.phone}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.department}</td>
                                    <td className="px-4 py-2">
                                        <button className='text-red-500 hover:underline ml-2' onClick={handleEditUser}>Edit</button>
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

