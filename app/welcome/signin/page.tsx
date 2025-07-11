'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

 type User = {
        id: number
        firstname:string
        lastname:string
        age:number
        phone:number
        username:string
        password:string
    }

export default function SignInPage() {

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

    const handleSignUp = () => {
        router.push('/welcome/signup');
    };

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

    const handlesubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const user = userinfo.find(user => user.username === username)

        if (user && user.password === password){
            router.push('/dashboard')
        }else{
            alert('Invalid user or pass')
            setUsername('')
            setPassword('')
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.jpg')` }}>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-md">
                <form className='w-full bg-white p-6 rounded-lg shadow-md border bg-opacity-90'
                    onSubmit={handlesubmit}>
                    <div className='mb-4'>
                        <h1 className='text-3xl mb-4 text-center font-bold'>WELCOME</h1>
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
                    <div className='text-center'>
                        <span className='text-sm'>Dont have an account?</span>
                        <button type='button' onClick={handleSignUp} className='text-blue-500 hover:underline ml-1'>signup</button>
                    </div>
                </form>
            </main>
        </div>
    );
}