'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {

    const router = useRouter();

    const handleBackSignIn = () => {
        router.push('/welcome/signin');
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.jpg')` }}>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-md">
                <form className='w-full bg-white p-6 rounded-lg shadow-md border bg-opacity-90'
                    onSubmit={(e) => {e.preventDefault();
                        router.push('/welcome/signin');
                    }}>
                    <div className='mb-4 flex items-center justify-between'>
                        <button type='button' onClick={handleBackSignIn} className='hover:underline mb-4'>
                            ←
                        </button>
                        <h1 className='text-3xl mb-4 text-center font-bold flex-1'>SIGN UP</h1>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2" htmlFor="fname">First Name</label>
                        <input type='text' id='fname' name='fname' placeholder='Enter your first name' required
                        className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2" htmlFor="lname">Last Name</label>
                        <input type='text' id='lname' name='lname' placeholder='Enter your last name' required
                        className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2" htmlFor="username">Username</label>
                        <input type='text' id='username' name='username' placeholder='Enter your username' required
                        className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2" htmlFor="age">Age</label>
                        <input type='text' id='age' name='age' placeholder='Enter your age' required
                        className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2" htmlFor="phone">Phone</label>
                        <input type='tel' id='phone' name='phone' placeholder='Enter your phone no.' required
                        className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Password</label>
                        <input type='password' id='password' name='password' placeholder='Enter your password' required
                        className='border border-gray-300 p-2 rounded w-full max-w-s'></input> 
                    </div>
                    <div className='mb-4'>
                        <button type='submit' className=' bg-blue-300 text-black p-2 rounded w-full max-w-s
                        hover:bg-blue-600 transition duration-200'>Sign Up</button>
                    </div>
                </form>
            </main>
        </div>
    );
}