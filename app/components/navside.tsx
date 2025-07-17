import React from "react";
import { useRouter } from 'next/navigation';

interface NavProps {
    header: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<NavProps> = ({ header, isOpen, setIsOpen }) => {
    const router = useRouter();

    const navigate = (path: string) => {
        router.push(path);
        setIsOpen(false);
    };

    return (
        <div className="relative" style={{background: '#126544'}}>
            {!isOpen && (
                <aside 
                    onMouseEnter={() => setIsOpen(true)}
                    className="p-2 m-4 w-10 h-10 flex flex-col justify-between items-center text-black rounded cursor-pointer z-20">
                    <span className="block w-6 h-0.5 bg-white"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                </aside>
            )}
            {isOpen && (
                <aside
                    onMouseLeave={() => setIsOpen(false)}
                    style={{background: '#126544'}} className="fixed left-0 top-0 w-64 h-full bg-white shadow-md px-4 py-6 z-10"
                >
                    <h2 className="text-xl font-bold mb-6 text-[#ffffff]">{header}</h2>
                    <nav className="space-y-5">
                        <button className="text-[#e5e7eb] hover:text-[#0e3618] block" onClick={() => navigate('/dashboard')}>
                            Home
                        </button>
                        <button className="text-[#e5e7eb] hover:text-[#0e3618] block" onClick={() => navigate('/dashboard/employee')}>
                            Employee
                        </button>
                        <button className="text-[#e5e7eb] hover:text-[#0e3618] block" >
                            Department
                        </button>
                        <button className="text-[#e5e7eb] hover:text-[#0e3618] block">
                            Pending Task
                        </button>
                        <button className="text-[#dc2626] hover:text-[#0e3618] block" onClick={() => navigate('/welcome/signin')}>
                            Logout
                        </button>
                    </nav>
                </aside>
            )}
        </div>
    );
};

export default Nav;
