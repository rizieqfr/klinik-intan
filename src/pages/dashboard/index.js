import Sidebar from '@/components/sidebar'
import React from 'react'

export default function Dashboard() {
  return (
    <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full'>
            <div className='flex items-center justify-between pr-[78px] py-[80px]'>
                <h1 className='text-[32px] text-[#353A40] font-semibold'>Dashboard</h1>
                <h1>Navigasi / <span className='text-cyan font-medium'>Dashboard</span></h1>
            </div>
            <div className='grid grid-cols-3 gap-10'>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#17A2B7] text-white rounded-t-lg'>
                        <h1 className='text-[24px] font-semibold'>02</h1>
                        <h1 className='text-[16px]'>Total Pasien</h1>
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-semibold text-[12px] rounded-b-lg'>More info</button>
                </div>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#27A844] text-white rounded-t-lg'>
                        <h1 className='text-[24px] font-semibold'>02</h1>
                        <h1 className='text-[16px]'>Total Rekam Medis</h1>
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-semibold text-[12px] rounded-b-lg'>More info</button>
                </div>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#DC3546] text-white rounded-t-lg'>
                        <h1 className='text-[24px] font-semibold'>02</h1>
                        <h1 className='text-[16px]'>Total Pelayanan</h1>
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-semibold text-[12px] rounded-b-lg'>More info</button>
                </div>
                <div className='w-[348px] h-[143px] '>
                    <div className='px-[24px] py-[28px] bg-[#DC3546] text-white rounded-t-lg'>
                        <h1 className='text-[24px] font-semibold'>02</h1>
                        <h1 className='text-[16px]'>Total User</h1>
                    </div>
                    <button className='w-full py-[8px] px-[90px] bg-white text-[#353A40] font-semibold text-[12px] rounded-b-lg'>More info</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}
