import { useRouter } from 'next/router'
import { FaBookMedical, FaHandHoldingMedical, FaUserDoctor, FaUserGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { MdPayments, MdRsvp } from "react-icons/md";
import { RiAdminFill, RiLogoutBoxFill } from "react-icons/ri";
import toast from 'react-hot-toast';
import { withSession } from '@/utils/sessionWrapper';
import routeGuard from '@/utils/routeGuard';
import axios from 'axios';

export default function Sidebar({user}) {
    const router = useRouter()
    const [name, setName] = useState()
    const [role, setRole] = useState()



    const Logout = async () => {
        toast.promise(
          axios.request({
            method:'POST',
            url:'/api/logout'
          }), {
            loading: 'Sedang melakukan logout...',
            success: (res) => {
              router.push('/auth/login')
              return(res.data.message)
            },
            error:(err) => {
              return(err.data.message)
            }
          }
        )
    }

  return (
    <div className='bg-[#353A40] text-white w-[288px] py-[30px]'>
        <div className='flex items-center justify-around px-[24px] text-[14px] mb-[50px] border-b pb-4'>
            <div className='w-[46px] h-[46px] rounded-full bg-slate-300 flex items-center justify-center'>
                <RiAdminFill className='text-black text-xl' />
            </div>
            <div className=''>
                {/* <h1>Username: {localStorage.getItem('username') !== null ? localStorage.getItem('username') : '-' } </h1>
                <h1>Role: {localStorage.getItem('role') !== null ? localStorage.getItem('role') : '-' } </h1> */}
            </div>
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
            <button onClick={() => router.push('/dokter')} className={`${router.pathname === '/dokter' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <FaUserDoctor  />
                <h1 className='text-start'>Jadwal Dokter</h1>
            </button>
            <button onClick={() => router.push('/rekam-medis')} className={`${router.pathname === '/rekam-medis' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <FaBookMedical />
                <h1 className='text-start'>Rekam Medis</h1>
            </button>
            {/* <button onClick={() => router.push('/pelayanan')} className={`${router.pathname === '/pelayanan' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <MdMedicalServices />
                <h1 className='text-start'>Pelayanan</h1>
            </button> */}
            <button onClick={() => router.push('/reservasi')} className={`${router.pathname === '/reservasi' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <MdRsvp     />
                <h1 className='text-start'>Reservasi</h1>
            </button>
            <button onClick={() => router.push('/pembayaran')} className={`${router.pathname === '/pembayaran' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <MdPayments   />
                <h1 className='text-start'>Pembayaran</h1>
            </button>
            <button onClick={() => router.push('/user-management')} className={`${router.pathname === '/user-management' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                <FaUserGear />
                <h1 className='text-start'>User</h1>
            </button>
        </div>
        <button onClick={Logout} className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2 mt-48 '>
            <RiLogoutBoxFill />
            <h1 className='text-start'>Log Out</h1>
        </button>
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
    console.log(req.session.user, 'req')
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {user: req.session.user}
	})
})