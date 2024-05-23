import Table from '@/components/Table'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function Reservasi({accessToken}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    
    const kolomReservasi = [
        {
            accessorKey: '',
            header: 'Tanggal'
        },
        {
            accessorKey: '',
            header: 'Poli yang Dituju'
        },
        {
            accessorKey: '',
            header: 'Nama Pasien'
        },
        {
            accessorKey: '',
            header: 'Keluhan'
        },
    ]
    
  return (
    <div>
        <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
                <Sidebar />
                <div className='w-full pb-10 pr-[32px]'>
                    <div className='flex items-start justify-between  pt-[40px] mb-4'>
                        <h1 className='text-4xl text-[#353A40] font-bold'>Reservasi</h1>
                        <h1>Navigasi / <span className='text-cyan font-medium'>Reservasi</span></h1>
                    </div>
                    <div className='flex items-center justify-end '>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                            <FaCirclePlus className='text-xl' />
                            <h1>Tambah</h1>
                        </button>
                    </div>
                    <Table data={''} columns={kolomReservasi} />
                </div>
            </div>
    </div>
  )
}
