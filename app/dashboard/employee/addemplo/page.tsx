'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddEmployee() {
  const router = useRouter()

  const [ addemp, setaddemp] = useState({
    firstname:'',
    lastname:'',
    username:'',
    age:'',
    phone:'',
    department:''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name,value} = e.target
    setaddemp({...addemp, [name]:value})
  }

  const onPress = async(e: React.FormEvent) => {
    e.preventDefault()

    const change = {
        ...addemp,
        age: Number(addemp.age),
        phone: Number(addemp.phone)
    }

    try{
        const res = await fetch('http://localhost:3002/addemp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(change)
        })
        if (res.ok) {
        router.push('/dashboard/employee')
    }else{
        alert('add employee failed')
    }
    }catch(error){
        console.error('error', error)
    }   
  }

  const backBtn = () => {
    router.push('/dashboard/employee')
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
        <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border bg-opacity-90" onSubmit={onPress}>
                <div className='mb-4 flex items-center justify-between'>
                    <button type='button' onClick={backBtn} className='hover:underline mb-4'>
                        ←
                    </button>
                <h1 className='text-3xl mb-4 text-center font-bold flex-1'>ADD EMPLOYEE</h1>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="firstname">First Name</label>
                    <input type='text' id='firstname' name='firstname' placeholder='Enter your first name' required onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                    </input>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="lastname">Last Name</label>
                    <input type='text' id='lastname' name='lastname' placeholder='Enter your last name' required onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                    </input>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="age">Age</label>
                    <input type='text' id='age' name='age' placeholder='Enter your age' required onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                        </input>
                </div>
                <div className='mb-4'>
                    <label className="block mb-2" htmlFor="phone">Phone</label>
                    <input type='tel' id='phone' name='phone' placeholder='Enter your phone no.' required onChange={handleChange}
                    className='border border-gray-300 p-2 rounded w-full max-w-s'>   
                    </input>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="department">Department</label>
                    <select id='department' name='department' required onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full max-w-s">
                        <option value='' disabled hidden>Select Department</option>
                        <option value='IT'>IT</option>
                        <option value='HR'>HR</option>
                        <option value='ACCOUNTING'>ACCOUNTING</option>
                    </select>
                </div>
                <div>
                    <button type='submit' className=' bg-blue-300 text-black p-2 rounded-4xl w-full max-w-s
                    hover:bg-blue-600 transition duration-200'>SUBMIT
                </button>
                </div> 
            </form>
    </div>
  )
}
