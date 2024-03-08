import React from 'react'

export default function Sidebar() {
  return (
    <div className='bg-[#353A40] text-white w-[288px] py-[30px]'>
        <div className='flex items-center justify-between px-[24px] text-[14px] mb-[50px]'>
            <h1>Admin - Rizieq </h1>
            <h1>=</h1>
        </div>
        <h1 className='mb-[8px] text-[14px] px-[24px]'>Navigasi</h1>
        <div className='space-y-[8px]'>
            <button className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full'>
                <h1 className='text-start'>Dashboard</h1>
            </button>
            <button className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full'>
                <h1 className='text-start'>Pasien</h1>
            </button>
            <button className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full'>
                <h1 className='text-start'>Rekam Medis</h1>
            </button>
            <button className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full'>
                <h1 className='text-start'>Pelayanan</h1>
            </button>
            <button className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full'>
                <h1 className='text-start'>User Managemet</h1>
            </button>
            <button className='hover:bg-[#0179FF] py-[8px] px-[37px] text-white font-semibold w-full'>
                <h1 className='text-start'>Log Out</h1>
            </button>
        </div>
    </div>
  )
}
