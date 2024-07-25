import { useRouter } from 'next/router'
import { FaBookMedical, FaHandHoldingMedical, FaUserDoctor, FaUserGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import React, { useState } from 'react'
import { MdAssignmentInd, MdPayments, MdRsvp } from "react-icons/md";
import { RiAdminFill, RiLogoutBoxFill } from "react-icons/ri";
import toast from 'react-hot-toast';
import { withSession } from '@/utils/sessionWrapper';
import routeGuard from '@/utils/routeGuard';
import axios from 'axios';
import { IoDocumentsSharp } from 'react-icons/io5';

export default function Sidebar({ user }) {
    const router = useRouter()
    const [name, setName] = useState()
    const [role, setRole] = useState()
    const [openSubMenu, setOpenSubMenu] = useState(null)

    const toggleSubMenu = (menu) => {
        setOpenSubMenu(openSubMenu === menu ? null : menu)
    }

    const Logout = async () => {
        toast.promise(
            axios.request({
                method: 'POST',
                url: '/api/logout'
            }), {
            loading: 'Sedang melakukan logout...',
            success: (res) => {
                router.push('/auth/login')
                return (res.data.message)
            },
            error: (err) => {
                return (err.data.message)
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
                {/* {localStorage.getItem('username') && localStorage.getItem('role') && (
                <div className=''>
                    <h1>Username: {localStorage.getItem('username')} </h1>
                    <h1>Role: {localStorage.getItem('role')} </h1>
                </div>
            )} */}
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
                    <FaUserDoctor />
                    <h1 className='text-start'>Dokter</h1>
                </button>
                <button onClick={() => router.push('/rekam-medis')} className={`${router.pathname === '/rekam-medis' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                    <FaBookMedical />
                    <h1 className='text-start'>Rekam Medis</h1>
                </button>
                <button onClick={() => router.push('/reservasi')} className={`${router.pathname === '/reservasi' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                    <MdRsvp />
                    <h1 className='text-start'>Antrian</h1>
                </button>
                <button onClick={() => toggleSubMenu('pendaftaran')} className={`${router.pathname.startsWith('/pendaftaran') && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                    <MdAssignmentInd />
                    <h1 className='text-start'>Pendaftaran</h1>
                </button>
                {openSubMenu === 'pendaftaran' && (
                    <div className='pl-[50px] space-y-[8px]'>
                        <button onClick={() => router.push('/pendaftaran/ugd')} className={`${router.pathname === '/pendaftaran/ugd' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-2 text-white font-semibold w-full text-start`}>
                            UGD
                        </button>
                        <button onClick={() => router.push('/pendaftaran/rawat-jalan')} className={`${router.pathname === '/pendaftaran/rawat-jalan' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-2 text-white font-semibold w-full text-start`}>
                            Rawat Jalan
                        </button>
                        <button onClick={() => router.push('/pendaftaran/rawat-inap')} className={`${router.pathname === '/pendaftaran/rawat-inap' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-2 text-white font-semibold w-full text-start`}>
                            Rawat Inap
                        </button>
                    </div>
                )}
                <button onClick={() => toggleSubMenu('pembayaran')} className={`${router.pathname.startsWith('/pembayaran') && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                    <MdPayments />
                    <h1 className='text-start'>Pembayaran</h1>
                </button>
                {openSubMenu === 'pembayaran' && (
                    <div className='pl-[50px] space-y-[8px]'>
                        <button onClick={() => router.push('/pembayaran/ugd')} className={`${router.pathname === '/pembayaran/ugd' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-2 text-white font-semibold w-full text-left`}>
                            UGD
                        </button>
                        <button onClick={() => router.push('/pembayaran/rawat-jalan')} className={`${router.pathname === '/pembayaran/rawat-jalan' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-2 text-white font-semibold w-full text-left`}>
                            Rawat Jalan
                        </button>
                        <button onClick={() => router.push('/pembayaran/rawat-inap')} className={`${router.pathname === '/pembayaran/rawat-inap' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-2 text-white font-semibold w-full text-left`}>
                            Rawat Inap
                        </button>
                    </div>
                )}
                <button onClick={() => router.push('/pelaporan')} className={`${router.pathname === '/pelaporan' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                    <IoDocumentsSharp />
                    <h1 className='text-start'>Pelaporan</h1>
                </button>
                <button onClick={() => router.push('/user-management')} className={`${router.pathname === '/user-management' && 'bg-[#0179FF]'} hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2`}>
                    <FaUserGear />
                    <h1 className='text-start'>User</h1>
                </button>
            </div>
            <button onClick={Logout} className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full flex items-center gap-2 mt-20 '>
                <RiLogoutBoxFill />
                <h1 className='text-start'>Log Out</h1>
            </button>
        </div>
    )
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {user: req.session.user}
	})
})