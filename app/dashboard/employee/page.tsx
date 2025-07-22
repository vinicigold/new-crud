'use client';
import React, { useEffect, useState } from 'react';
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
    const [empInfo, setEmpInfo] = useState<Employee[]>([])
    const [empEdited , setEmpEdited] = useState({
        id: 0,
        firstname: "",
        lastname: "",
        age: 0,
        phone: 0,
        department: ""
    })
    const [addemp, setaddemp] = useState({
        firstname:'',
        lastname:'',
        age:'',
        phone:'',
        department:''
    })
    const [isOpen, setIsOpen] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [addForm, setAddForm] = useState(false)

    const  allowLetters = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z]/g, '')
    }
    const  allowNum = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
    }

    const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name,value} = e.target
        setaddemp({...addemp, [name]:value})
      }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name,value} = e.target
        setEmpEdited({...empEdited, [name]:value})
    }
    const handleAddSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
    
        const change = {
            ...addemp,
            firstname: addemp.firstname.toUpperCase(),
            lastname: addemp.lastname.toUpperCase(),
            age: Number(addemp.age),
            phone: Number(addemp.phone),
            department: addemp.department.toUpperCase()
        }
    
        try{
            const res = await fetch('http://localhost:3002/addemp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(change)
            })

            const data = await res.json()
            if (res.ok) {
                setEmpInfo((ademp) => [...ademp, data])
                setAddForm(!addForm)
        }else{
            alert('add employee failed')
        }
        }catch(error){
            console.error('error', error)
        }   
      }
       console.log(addemp)
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const edemp = {
            ...empEdited,
            firstname: empEdited.firstname.toUpperCase(),
            lastname: empEdited.lastname.toUpperCase(),
            age: Number(empEdited.age),
            phone: Number(empEdited.phone),
            department: empEdited.department.toUpperCase()
        }
        try{
            const res = await fetch('http://localhost:3002/upemp', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(edemp),
            })
            const data = await res.json()
            console.log(data)

            if(res.ok) {
                const updateData = empInfo.map((emp) => {
                    if (emp.id === empEdited.id){
                        return data
                    }else{
                        return emp
                    }
                })
                setEmpInfo(updateData)
                setEditForm(false)
            }else {
                alert('edit employee failed')
            }
        }catch(error){
            console.error('error',error)
        }
    }

    useEffect(() => {
        const fetchEmp = async () => {
        try {
            const response = await fetch('http://localhost:3002/getemps')
            const data = await response.json()
            setEmpInfo(data)
        } catch (error) {
            console.error('error', error)
        }
    }
        fetchEmp()
    }, [])

    const handleEditUser = (emp: Employee) => {
       setEditForm(true)
       setAddForm(false)
       setEmpEdited(emp)
    }   
    console.log(empEdited)
    const handleDelUser = async (emp: Employee) => {
        try {
            const res = await fetch('http://localhost:3002/delemp', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emp),
            })
            if (res.ok) {
                // fetchEmp()
                setEmpInfo(empInfo.filter((u) => u.id !== emp.id))
            } else {
                console.error('failed to delete user')
            }
        } catch (error) {
            console.error('error', error)
        }
    }
    const backBtn = () => {
        setEditForm(false)
        setAddForm(false)
    }

    return (
    <div className="min-h-screen flex bg-[#f4f6f7]">
        {!editForm && !addForm &&
        <>
            <Nav header="EMPLOYEE" isOpen={isOpen} setIsOpen={setIsOpen} />
                <main className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                    <form className='w-full bg-white p-4 rounded-lg shadow-md bg-opacity-90 mb-6'>
                        <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold text-[#0b4d2a]">EMPLOYEE INFORMATION</h2>
                        <button type='button' className="text-[#e5e7eb] hover:bg-[#093e22] rounded bg-[#0b4d2a] px-4 py-2" onClick={() => setAddForm(true)}>
                            ADD EMPLOYEE
                        </button>
                        </div>
                    </form>
                    <div className="overflow-x-auto rounded-lg shadow-sm border border-[#d1d5db]">
                        <table className="min-w-full divide-y divide-[#d1d5db] border border-[#d1d5db] overflow-hidden shadow-sm">
                            <thead className="bg-[#f1f5f9] text-[#0b4d2a]">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">First Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Last Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Age</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Phone Number</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Department</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#d1d5db]">
                                {empInfo.toSorted((a,b) => a.id - b.id).map((emp: Employee) => (
                                    <tr key={emp.id} className="hover:bg-[#f1f5f9] transition duration-200 shadow-sm">
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.firstname}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.lastname}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.age}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.phone}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.department}</td>
                                        <td className="px-4 py-2">
                                            <button className="text-[#2563eb] hover:underline ml-2" onClick={() => handleEditUser(emp)}>
                                                Edit
                                            </button>
                                            <button className="text-[#dc2626] hover:underline ml-2" onClick={() => handleDelUser(emp)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </>
        }
        {addForm &&
            <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[#12664F]">
                <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border bg-opacity-90 border-[#12664F]" onSubmit={handleAddSubmit}>
                    <div className='mb-4 flex items-center justify-between'>
                        <button type='button' onClick={backBtn} className='hover:underline mb-4'>←
                        </button>
                            <h1 style={{color:'#0b4d2a'}} className='text-3xl mb-4 text-center font-bold flex-1'>ADD EMPLOYEE</h1>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="firstname">First Name</label>
                            <input type='text' id='firstname' name='firstname' placeholder='Enter your first name' required onChange={handleAddChange}
                            onInput={allowLetters} className='border p-2 rounded w-full max-w-s focus:ring-2 focus:ring-[#12664F]'>   
                            </input>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="lastname">Last Name</label>
                            <input type='text' id='lastname' name='lastname' placeholder='Enter your last name' required onChange={handleAddChange}
                            onInput={allowLetters} className='border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#12664F]'>   
                        </input>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="age">Age</label>
                            <input type='text' id='age' name='age' placeholder='Enter your age' required onChange={handleAddChange}
                            onInput={allowNum} className='border p-2 rounded w-full max-w-s focus:ring-2 focus:ring-[#12664F]'>   
                            </input>
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="phone">Phone</label>
                            <input type='number' id='phone' name='phone' placeholder='Enter your phone no.' required onChange={handleAddChange}
                            onInput={allowNum} className='border p-2 rounded w-full max-w-s focus:ring-2 focus:ring-[#12664F]'>   
                            </input>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="department">Department</label>
                        <select id='department' name='department' required onChange={handleAddChange}
                        className="border p-2 rounded w-full max-w-s focus:ring-2 focus:ring-[#12664F]">
                            <option value=''>Select Department</option>
                            <option value='IT'>IT</option>
                            <option value='HR'>HR</option>
                            <option value='ACCOUNTING'>ACCOUNTING</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit' className=' bg-[#12664F] text-white p-2 rounded-4xl w-full max-w-s
                        hover:bg-[#0f4c3a] transition duration-200'>SUBMIT
                    </button>
                </div> 
            </form>
        </div>
        }
        {editForm &&
        <div className="min-h-screen w-full flex items-center justify-center bg-[#12664F]">
                <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border bg-opacity-90 border-[#12664F]"
                    onSubmit={handleEditSubmit}>
                    <div className="mb-4 flex items-center justify-between">
                        <button type="button" onClick={backBtn} className="hover:underline mb-4">
                            ←
                        </button>
                        <h1 style={{ color: '#0b4d2a' }} className="text-3xl mb-4 text-center font-bold flex-1">
                            EDIT EMPLOYEE
                        </h1>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="firstname">
                            First Name
                        </label>
                        <input type="text" id="firstname" name="firstname" placeholder="first name" required value={empEdited.firstname} onChange={handleEditChange}
                        onInput={allowLetters} className="border p-2 rounded w-full focus:ring-2 focus:ring-[#12664F]"></input>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="lastname">
                            Last Name
                        </label>
                        <input type="text" id="lastname" name="lastname" placeholder="last name" required value={empEdited.lastname} onChange={handleEditChange}
                        onInput={allowLetters} className="border p-2 rounded w-full focus:ring-2 focus:ring-[#12664F]"></input>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="age">
                            Age
                        </label>
                        <input type="text" id="age" name="age" placeholder="age" required value={empEdited.age} onChange={handleEditChange}
                        onInput={allowNum} className="border p-2 rounded w-full focus:ring-2 focus:ring-[#12664F]"></input>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="phone">
                            Phone
                        </label>
                        <input type="tel" id="phone" name="phone" placeholder="phone no." required value={empEdited.phone} onChange={handleEditChange}
                        onInput={allowNum} className="border p-2 rounded w-full focus:ring-2 focus:ring-[#12664F]"></input>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-[#0b4d2a]" htmlFor="department">
                            Department
                        </label>
                        <select id="department" name="department" required value={empEdited.department} onChange={handleEditChange}
                            className="border p-2 rounded w-full focus:ring-2 focus:ring-[#12664F]">
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="ACCOUNTING">ACCOUNTING</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-[#12664F] text-white p-2 rounded-4xl w-full hover:bg-[#0f4c3a] transition duration-200">
                            UPDATE
                        </button>
                    </div>
                </form>
            </div>
        }
    </div>
)
}
