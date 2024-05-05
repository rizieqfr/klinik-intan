import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'

export default function UserManagement() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const route = useRouter()
    const kolomUser = [
        {
            header: 'No',
            accessorKey: 'id',
        },
        {
            header: 'Nama',
            accessorKey: 'nama',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Role',
            accessorKey: 'role',
        },
        {
            accessorKey: 'id',
            header: () => <div></div>,
            cell: ({row}) => (
                <td className='flex justify-center'>
                    <button onClick={() => route.push('pasien/detail')} className='bg-[#0080CC] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Detail</button>
                    <button onClick={() => setShowEditModal(!showEditModal)} className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit</button>
                    <button className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                </td>
            )
        
        }
    ]
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
            <div className='w-full pr-[32px]'>
                <div className='flex items-center justify-between pt-[40px] mb-4'>
                    <h1 className='text-[32px] text-[#353A40] font-semibold'>User Management</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>User Management</span></h1>
                </div>
                <div className='flex items-center justify-end mb-4'>
                    <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                        <FaCirclePlus className='text-xl' />
                        <h1>Tambah</h1>
                    </button>
                </div>
                <Table data={''} columns={kolomUser}/>
            </div>
        </div>
    </div>
  )
}
