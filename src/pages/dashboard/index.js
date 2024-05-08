import Sidebar from '@/components/sidebar'
import React from 'react'
import { FaBookMedical, FaHandHoldingMedical, FaUserGear } from 'react-icons/fa6'
import { MdMedicalServices } from 'react-icons/md'

export default function Dashboard() {
  return (
    <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full pr-[32px]'>
            <div className='flex items-center justify-between py-[40px]'>
                <h1 className='text-4xl text-[#353A40] font-bold'>Dashboard</h1>
                <h1>Navigasi / <span className='text-cyan font-medium'>Dashboard</span></h1>
            </div>
            <div className='grid grid-cols-3 gap-10'>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#17A2B7] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>02</h1>
                                <h1 className='text-xl font-semibold'>Total Pasien</h1>
                            </div>
                            <FaHandHoldingMedical className='text-4xl' />
                        </div>
                        
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-bold text-sm rounded-b-lg'>More info</button>
                </div>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#27A844] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>02</h1>
                                <h1 className='text-xl font-semibold'>Total Rekam Medis</h1>
                            </div>
                            <FaBookMedical className='text-4xl' />
                        </div>

                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-bold text-sm rounded-b-lg'>More info</button>
                </div>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#DC3546] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>02</h1>
                                <h1 className='text-xl font-semibold'>Total Pelayanan</h1>
                            </div>
                            <MdMedicalServices className='text-4xl' />
                        </div>
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-bold text-sm rounded-b-lg'>More info</button>
                </div>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#DC3546] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>02</h1>
                                <h1 className='text-xl font-semibold'>Total User</h1>
                            </div>
                            <FaUserGear className='text-4xl' />
                        </div>
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-bold text-sm rounded-b-lg'>More info</button>
                </div>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#17A2B7] text-white rounded-t-lg'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-4xl font-bold mb-2'>02</h1>
                                <h1 className='text-xl font-semibold'>Dokter Management</h1>
                            </div>
                            <FaUserGear className='text-4xl' />
                        </div>
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-bold text-sm rounded-b-lg'>More info</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}
