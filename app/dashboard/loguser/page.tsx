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
        username:string
        password:string
    }

export default function LoginUser() {

    const router = useRouter();
    const [userinfo, setuserinfo ] = useState<User[]>([])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

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

    const handlesubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const user = userinfo.find(user => user.username === username)

        if (user && user.password === password){
            router.push('/dashboard/loguser/userinfo')
        }else{
            alert('Invalid user or pass')
            setUsername('')
            setPassword('')
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Nav header='USER INFORMATION'/>
            <main className='w-screen h-screen flex flex-col items-center justify-center'>
                <form className='bg-white p-6 rounded-lg shadow-md border bg-opacity-90'
                    onSubmit={handlesubmit}>
                    <div className='mb-4'>
                        <h1 className='text-3xl mb-4 text-center font-bold'>ADMIN</h1>
                        <label className="block mb-2" htmlFor="username">Username</label>
                        <input type='text' value={username} id='username' name='username' placeholder='Enter your username'
                        onChange={handleUsername} className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input type='password' value={password} id='password' name='password' placeholder='Enter your password' required
                        onChange={handlePassword} className='border border-gray-300 p-2 rounded w-full max-w-s'></input> 
                    </div>
                    <div className='mb-4 flex justify-center'>
                        <button type='submit' className=' bg-blue-300 text-black p-2 rounded-4xl w-3xs max-w-s
                        hover:bg-blue-600 transition duration-200'>Login</button>
                    </div>
                </form>
            </main>
        </div>
    );
}