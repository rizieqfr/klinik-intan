import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import isEmpty from '@/utils/isEmpty'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import Link from 'next/link'
import React from 'react'
import { FaBookMedical, FaHandHoldingMedical, FaUserGear } from 'react-icons/fa6'
import { MdMedicalServices } from 'react-icons/md'

export default function Dashboard({dataDashboard}) {
    console.log(dataDashboard)
  return (
    <div className='bg-white flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full pr-[32px]'>
            <div className='flex items-center justify-between py-[40px]'>
                <h1 className='text-4xl text-[#353A40] font-bold'>Dashboard</h1>
                <h1>Navigasi / <span className='text-cyan font-medium'>Dashboard</span></h1>
            </div>
            <div className='grid grid-cols-3 gap-10'>
                <div className='w-[348px] h-[143px]  shadow-sm'>
                    <div className='px-[24px] py-[28px] bg-[#DC3546] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>{dataDashboard.amountReservation}</h1>
                                <h1 className='text-xl font-semibold'>Pasien Hari Ini</h1>
                            </div>
                            <MdMedicalServices className='text-4xl' />
                        </div>
                    </div>
                    <Link href={'pelayanan'}>
                        <button className='w-full py-[8px] border-b-2  bg-white flex items-center justify-center text-[#353A40] font-bold text-sm rounded-b-lg'>
                            More info 
                        </button>
                    </Link>
                </div>
                <div className='w-[348px] h-[143px]  shadow-sm'>
                    <div className='px-[24px] py-[28px] bg-[#17A2B7] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>{dataDashboard.amount_patient}</h1>
                                <h1 className='text-xl font-semibold'>Total Pasien</h1>
                            </div>
                            <FaHandHoldingMedical className='text-4xl' />
                        </div>
                        
                    </div>
                    <Link href={'pasien'}>
                        <button className='w-full py-[8px] border-b-2  bg-white flex items-center justify-center text-[#353A40] font-bold text-sm rounded-b-lg'>
                            More info
                        </button>
                    </Link>
                </div>
                <div className='w-[348px] h-[143px]  shadow-sm'>
                    <div className='px-[24px] py-[28px] bg-[#27A844] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>{dataDashboard.amount_medical_record}</h1>
                                <h1 className='text-xl font-semibold'>Total Rekam Medis</h1>
                            </div>
                            <FaBookMedical className='text-4xl' />
                        </div>

                    </div>
                    <Link href={'rekam-medis'}>
                        <button className='w-full py-[8px] border-b-2  bg-white flex items-center justify-center text-[#353A40] font-bold text-sm rounded-b-lg'>
                            More info   
                        </button>
                    </Link>
                </div>
                
                {/* <div className='w-[348px] h-[143px]  shadow-sm'>
                    <div className='px-[24px] py-[28px] bg-[#DC3546] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>{dataDashboard.amount_user}</h1>
                                <h1 className='text-xl font-semibold'>Total User</h1>
                            </div>
                            <FaUserGear className='text-4xl' />
                        </div>
                    </div>
                    <Link href={'user-management'}>
                        <button className='w-full py-[8px] border-b-2  bg-white flex items-center justify-center text-[#353A40] font-bold text-sm rounded-b-lg'>
                            More info   
                        </button>
                    </Link>
                </div> */}

                <div className='w-[348px] h-[143px]  shadow-sm'>
                    <div className='px-[24px] py-[28px] bg-[#17A2B7] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>{dataDashboard.amount_docter}</h1>
                                <h1 className='text-xl font-semibold'>Total Dokter</h1>
                            </div>
                            <FaUserGear className='text-4xl' />
                        </div>
                    </div>
                    <Link href={'dokter'}>
                        <button className='w-full py-[8px] border-b-2  bg-white flex items-center justify-center text-[#353A40] font-bold text-sm rounded-b-lg'>
                            More info 
                        </button>
                    </Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req }) => {
    const accessToken = req.session?.auth?.access_token;
    const isLoggedIn = !!accessToken;
  
    if (!isLoggedIn) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } else{
      const res = await ClientRequest.CountDashboard(accessToken)
      return {
        props: {
          dataDashboard: res.data?.data,
          accessToken
        },
      };
    }
  });