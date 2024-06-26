import Table from '@/components/Table'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { data } from 'autoprefixer'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function Reservasi({accessToken}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [dataReservasi, setDataReservasi] = useState('')
    
    const getDataReservasi = async () => {
        try {
            const res = await ClientRequest.GetReservasi(accessToken)
            console.log(res, 'resReservasi')
            setDataReservasi(res.data.data)
        } catch (error) {
            
        }
    }

    const kolomReservasi = [
        {
            accessorKey: 'date',
            header: 'Tanggal'
        },
        {
            accessorKey: 'fullname',
            header: 'Nama Pasien'
        },
        {
            accessorKey: 'namaDokter',
            header: 'Dokter'
        },
        {
            accessorKey: 'poli',
            header: 'Poli yang Dituju'
        },
        {
            header: 'Nomor Antrian',
            cell: ({row}) => (
                <h1 className='bg-green-500 font-semibold rounded-sm p-1 text-md text-center border text-white'>{row.original.queue}</h1>
            )
        },
        {
            header: 'Status Pelayanan',
            cell: ({ row }) => (
                <h1 className={`font-semibold rounded-sm p-1 text-md text-center border ${row.original.statusPeriksa ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {row.original.statusPeriksa ? 'Sudah Dilayani' : 'Belum Dilayani'}
                </h1>
            )
        }
        
    ]

    useEffect(() => {
        getDataReservasi()
    }, [])

    
  return (
    <div>
        <div className='bg-white flex gap-[32px] min-h-screen'>
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
                    <Table data={dataReservasi} columns={kolomReservasi} />
                </div>
            </div>
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {accessToken: accessToken}
	})
})
