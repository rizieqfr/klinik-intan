import Sidebar from '@/components/sidebar'
import React from 'react'

export default function UserManagement() {
  return (
    <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full'>
            <div className='flex items-center justify-between pr-[78px] py-[80px]'>
                <h1 className='text-[32px] text-[#353A40] font-semibold'>User Management</h1>
                <h1>Navigasi / <span className='text-cyan font-medium'>User Management</span></h1>
            </div>
            <div className='space-y-[12px] pr-[126px]'>
                <div className='space-y-[12px] w-full'>
                    <div className='flex items-center w-full gap-[26px]'>
                        <h1 className='text-[24px] font-semibold'>1.</h1>
                        <div className='w-full'>
                            <h1 className='text-[16px] font-semibold'>Muh Rizieq Fazlulrahman Djafar</h1>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <h1 className='text-[#272C2D99]'>Email</h1>
                                    <h1>: riziqfr111@gmail.com</h1>
                                </div>
                                <div className='flex items-center'>
                                    <h1 className='text-[#272C2D99]'>Role</h1>
                                    <h1>: Admin</h1>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-end gap-4 w-full'>
                            <button className='bg-[#0080CC] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Detail</button>
                            <button className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Edit</button>
                            <button className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                        </div>
                    </div>
                    <hr className='border border-[#353A4066]'/>
                </div>
            </div>
        </div>
    </div>
  )
}
