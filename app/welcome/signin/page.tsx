'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {

    const router = useRouter();

    const [signIn, setSignIn] = useState ({
        username:'',
        password:''
    })

    const [modal, setmodal] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{name,value} = e.target
        setSignIn({...signIn, [name]:value})
    }

    const handleSignUp = () => {
        router.push('/welcome/signup')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try{
            const res = await fetch('http://localhost:3002/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(signIn)
            })
            if(res.ok) {
                router.push('/dashboard')
            }else{
                setmodal(true)
                setSignIn({
                    username:'',
                    password:''
                })
            }
        }catch(error){
            console.error('error', error)
        }
    }
    console.log(signIn)

    const closemodal = () => {
        setmodal(false)
    }

    return (
        <div className='relative w-screen h-screen flex items-center justify-start bg-cover bg-center'>
            <div className={`${modal ? 'blur-sm pointer-events-none select-none' : ''} w-screen h-screen flex items-center justify-start bg-cover bg-center px-30`}
            style={{ backgroundImage: `url('/backtest.jpg')` }}>
                <div className="relative z-10 w-full flex items-center justify-start pl-1 sm:pl-15">
                    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-sm">
                    <form style={{ background: '#f9fafb'}} className='p-8 rounded-lg shadow-md w-full max-w-lg' onSubmit={handleSubmit}>
                        <div className=' '>
                            <h1 style={{ color: '#0b4d2a'}} className='text-3xl mb-4 text-center font-bold'>LOGIN</h1>
                            <div className="mb-4">
                                <label style={{ color: '#0b4d2a'}} className="block mb-2" htmlFor="username">Username</label>
                                <input type='text' value={signIn.username} id='username' name='username' placeholder='Enter your username'
                                onChange={handleChange} className='border border-gray-300 p-2 rounded w-full'>   
                                </input>
                            </div>
                            <div className="mb-4">
                                <label style={{ color: '#0b4d2a'}} className="block mb-2" htmlFor="password">Password</label>
                                <input type='password' value={signIn.password} id='password' name='password' placeholder='Enter your password' required
                                onChange={handleChange} className='border border-gray-300 p-2 rounded w-full'></input> 
                            </div>
                            <div className='mb-4 flex justify-center'>
                                <button type='submit' className=' bg-[#0b4d2a] text-white p-2 rounded-full w-full max-w-sm
                                hover:bg-green-800 transition duration-200'>Login</button>
                            </div>
                            <div className='text-center'>
                                <span className='text-sm'>Dont have an account?</span>
                                <button type='button' onClick={handleSignUp} style={{color: '#006666'}} className='hover:underline ml-1'>Create Account</button>
                            </div>
                        </div>
                    </form>
                </main>
                </div>    
            </div>
            {modal && (
                <div className='fixed inset-0 bg-opacity-40 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg text-center w-[300px]'>
                        <Image src="/wrongtest.png" alt="Start Button" width={440} height={55} />
                        <p className='text-[#0b4d2a] mb-4'>INVALID USERNAME & PASSWORD</p>
                        <button  onClick={closemodal}
                        className="mt-2 bg-[#0b4d2a] text-white w-40 py-2 rounded-full hover:bg-green-800 transition duration-200 ">OK</button>
                    </div>
                </div>
            )}
        </div>
    )
}