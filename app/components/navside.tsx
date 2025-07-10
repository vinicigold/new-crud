import React from "react";
import { useRouter } from 'next/navigation';


interface NavProps {
    header:string
}

const Nav: React.FC<NavProps> = ({header}: NavProps) => {

    const router = useRouter();

    return(
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-white shadow-md px-4 py-6">
                <h2 className="text-xl font-bold mb-6">{header}</h2>
                <nav className="space-y-4">
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/dashboard')}>
                        Home
                    </button>
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/dashboard/loguser')}>
                        User Information
                    </button>
                    <button className='text-gray-700 hover:text-blue-500 block' onClick={() => router.push('/dashboard/employee')}>
                        Employee
                    </button>
                    <button className='text-red-500 hover:text-blue-500 block' onClick={() => router.push('/welcome/signin')}>
                        Logout
                    </button>
                </nav>
            </aside>
        </div>
    )
}

export default Nav;