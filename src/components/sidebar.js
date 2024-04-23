import { useRouter } from 'next/router'
import { FaBars, FaBookMedical, FaHandHoldingMedical, FaUserGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { MdMedicalServices } from "react-icons/md";
import { RiAdminFill, RiLogoutBoxFill } from "react-icons/ri";
import Api from '../pages/api/hello';

export default function Sidebar() {
    const router = useRouter()
    const [name, setName] = useState()
    const [role, setRole] = useState()
    
    // const fetch = async () => {
    //     try {
    //         const response = await Api.Fetch(localStorage.getItem('token'))
    //         console.log(response)
    //         setName(response.data.username)
    //         setRole(response.data.role)
    //     } catch (error) {
    //         console.log(error)
    //         router.push('/')
    //     }
    // }

    // useEffect(() => {
    //     fetch()
    // }, [])
  return (
    <div className='bg-[#353A40] text-white w-[288px] py-[30px]'>
        <div className='flex items-center justify-around px-[24px] text-[14px] mb-[50px] border-b pb-4'>
            <div className='w-[46px] h-[46px] rounded-full bg-slate-300 flex items-center justify-center'>
                <RiAdminFill className='text-black text-xl' />
            </div>
            <h1>{role} - {name} </h1>
        </div>
        <div className='space-y-[8px]'>
            <button onClick={() => router.push('/dashboard')} className={`${router.pathname === '/dashboard' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <FaHome />
                <h1 className='text-start'>Dashboard</h1>
            </button>
            <button onClick={() => router.push('/pasien')} className={`${router.pathname === '/pasien' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <FaHandHoldingMedical />
                <h1 className='text-start'>Pasien</h1>
            </button>
            <button onClick={() => router.push('/rekam-medis')} className={`${router.pathname === '/rekam-medis' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <FaBookMedical />
                <h1 className='text-start'>Rekam Medis</h1>
            </button>
            <button onClick={() => router.push('/pelayanan')} className={`${router.pathname === '/pelayanan' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <MdMedicalServices />
                <h1 className='text-start'>Pelayanan</h1>
            </button>
            <button onClick={() => router.push('/user-management')} className={`${router.pathname === '/user-management' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <FaUserGear />
                <h1 className='text-start'>User</h1>
            </button>
        </div>
        <button onClick={() => router.push('/auth/login')} className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2 mt-48 '>
            <RiLogoutBoxFill />
            <h1 className='text-start'>Log Out</h1>
        </button>
    </div>
  )
}
