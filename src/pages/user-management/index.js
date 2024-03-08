import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import React, { useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'

export default function UserManagement() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
  return (
    <div>
        <Modal 
            activeModal={showEditModal}
            title={`Edit User`}
            buttonClose={ () => setShowEditModal(!showEditModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='flex items-center justify-between w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold'>Nama</h1>
                        <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Nama...'/>
                    </div>
                    <div className='flex items-center justify-between w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold'>Username</h1>
                        <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Username...'/>
                    </div>
                    <div className='flex items-center justify-between w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold'>Email</h1>
                        <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Email...'/>
                    </div>
                    <div className='flex items-center justify-between w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold'>Role</h1>
                        <select className='py-[13px] px-[16px] border rounded w-[85%] outline-none' name="" id="">
                            <option value="">Pilih Role...</option>
                            <option value="">Admin</option>
                            <option value="">Dokter</option>
                        </select>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Edit</button>
                    </div>

                </div>
                }
        />
        <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
            <Sidebar />
            <div className='w-full'>
                <div className='flex items-center justify-between pr-[78px] pt-[80px] mb-4'>
                    <h1 className='text-[32px] text-[#353A40] font-semibold'>User Management</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>User Management</span></h1>
                </div>
                <div className='flex items-center justify-end pr-[126px] mb-4'>
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
                                <button onClick={() => setShowEditModal(!showEditModal)} className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Edit</button>
                                <button className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                            </div>
                        </div>
                        <hr className='border border-[#353A4066]'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
