'use client';

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const [signup, setsignup]  = useState({
    firstname:'',
    lastname:'',
    username:'',
    age:'',
    phone:'',
    password:''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setsignup({...signup, [name]: value})
  }

  const onPress = async(e: React.FormEvent) => {
      e.preventDefault()

      const change = {
        ...signup,
        age: Number(signup.age),
        phone: Number(signup.phone)
      }

      try{
        const res = await fetch('http://localhost:3002/adduser',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(change)
      })

      if (res.ok) {
        console.log('Success:');
        router.push('/welcome/signin')
      }else{
        alert('signup failed')
      }
      }catch(error){
        console.error('error', error)
      }
  }
    
  const backBtn = () => {
    router.push('/welcome/signin')
  }
  
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
        <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border bg-opacity-90"
        onSubmit={onPress}>
                <div className='mb-4 flex items-center justify-between'>
                    <button type='button' onClick={backBtn} className='hover:underline mb-4'>
                        ←
                    </button>
                <h1 className='text-3xl mb-4 text-center font-bold flex-1'>SIGN UP</h1>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="firstname">First Name</label>
                    <input type='text' id='firstname' name='firstname' placeholder='Enter your first name' required
                    value={signup.firstname} onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                    </input>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="lastname">Last Name</label>
                    <input type='text' id='lastname' name='lastname' placeholder='Enter your last name' required
                    value={signup.lastname} onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                    </input>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="username">Username</label>
                    <input type='text' id='username' name='username' placeholder='Enter your username' required
                    value={signup.username} onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                    </input>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="age">Age</label>
                    <input type='text' id='age' name='age' placeholder='Enter your age' required
                    value={signup.age} onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="phone">Phone</label>
                    <input type='tel' id='phone' name='phone' placeholder='Enter your phone no.' required
                    value={signup.phone} onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                    </input>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input type='password' id='password' name='password' placeholder='Enter your password' required
                    value={signup.password} onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'></input> 
                </div>
                <div>
                    <button type='submit' className=' bg-blue-300 text-black p-2 rounded-4xl w-full max-w-s
                    hover:bg-blue-600 transition duration-200'>SUBMIT
                </button>
                </div> 
            </form>
    </div>
  );
}
