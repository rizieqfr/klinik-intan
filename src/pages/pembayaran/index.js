import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function Pembayaran({accessToken}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [dataPayment, setDataPayment] = useState('')
    const [idPayment, setIdPayment] = useState('')
    const route = useRouter()
    
    const kolomPembayaran = [
        {
            header: 'No. Transaksi',
            accessorKey: 'invoice',
        },
        {
            header: 'Nama Pasien',
            accessorKey: 'fullname',
        },
        {
            header: 'Biaya Layanan',
            accessorKey: 'biayaLayanan',
            cell: ({row}) => (
                <div>Rp. {row.original.purchased.biayaLayanan ?? '-'}</div>
            )
        },
        {
            header: 'Biaya Obat',
            accessorKey: 'biayaObat',
            cell: ({row}) => (
                <div>Rp. {row.original.purchased.biayaObat ?? '-'}</div>
            )
        },
        {
            header: 'Total Pembayaran',
            accessorKey: 'total_payment',
            cell: ({row}) => (
                <div className='font-semibold'>Rp. {row.original.total_payment ?? '-'}</div>
            )
        },
        {
            header: 'Status Pembayaran',
            accessorKey: 'statusPembayaran',
            cell: ({row}) => (
                <div>
                    {row.original.status === 'LUNAS' ? (
                        <h1 className='bg-green-500 font-semibold rounded-lg p-1 text-sm text-center border text-white'>Lunas</h1>
                    ) : (
                        <h1 className='bg-red-500 font-semibold rounded-lg p-1 text-sm text-center border text-white'>Belum Lunas</h1>
                    )}
                </div>
            )
        },
        {
            id: 'id',
            header: () => <div className='text-center'>Actions</div>,
            cell: ({row}) => (
                <div>
                    {row.original.status === 'LUNAS' ? (
                        <td className='flex justify-center'>
                            <button onClick={() => openModalEdit(row.original.id)} disabled className='bg-blue-300 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit Status</button>
                            <Link href={`pembayaran/invoice/${row.original.id}`} className='bg-blue-600 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Cetak Invoice</Link>
                        </td>
                    ) : (
                        <td className='flex justify-center'>
                            <button onClick={() => openModalEdit(row.original.id)} className='bg-blue-600  text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit Status</button>
                            <Link href={`pembayaran/invoice/${row.original.id}`} disabled className='bg-blue-300 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Cetak Invoice</Link>
                        </td>
                    )}
                </div>
                
            )
        
        }
    ]
    const formik = useFormik({
        initialValues:{
            statusPembayaran:'',
        },
        validate:(values) => {
            const requiredFields = [
                "statusPembayaran",
            ];
            const errors = Object.fromEntries(
                requiredFields
                .filter(field => !values[field])
                .map(field => {
                    const fieldNameWithSpaces = field.replace(/([A-Z])/g, ' $1').trim();
                    return [field, `${fieldNameWithSpaces.charAt(0).toUpperCase() + fieldNameWithSpaces.slice(1)} wajib diisi`];
                })
            );
            
            return errors;
        },
        onSubmit: (values) => {
            try {
                toast.promise(
                    ClientRequest.UpdateRekamMedis(accessToken, values, idPayment).then((res) => {
                        return res
                    }),
                    {
                        loading: 'Processing...',
                        success: (res) => {
                            formik.resetForm()
                            setShowEditModal(!showEditModal)
                            console.log(res, 'sukses')
                        },
                        error: (error) => {
                            console.log(error, 'error')
                        }
                    }
                )
            } catch (error) {
                
            }
        }
    })

    const openModalEdit = async (id) => {
        setIdPayment(id)
        setShowEditModal(!showEditModal)
        try {
            const res = await ClientRequest.GetRekamMedisById(accessToken, id)
            console.log('resbyid', res)
            const { statusPembayaran } = res.data.data;
            formik.setValues({ statusPembayaran});
        } catch (error) {
            console.log(error)
        }
    }


    const getDataPayment = async () => {
        try {
            const res = await ClientRequest.GetPayment(accessToken)
            console.log(res, 'response')
            setDataPayment(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDataPayment()
    }, [])
  return (
    <div>
        <Modal 
            activeModal={showEditModal}
            title={`Edit Status`}
            buttonClose={ () => setShowEditModal(!showEditModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center'>
                            <h1 className='text-[#353A40] font-semibold'>Status</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <select onChange={(val) => formik.setFieldValue('statusPembayaran', val)} className='py-[13px] px-[16px] border rounded w-full' name="statusPembayaran" id="">
                                <option value="">Select Status ...</option>
                                <option value="LUNAS">Lunas</option>
                                <option value="BELUM LUNAS">Belum Lunas</option>
                            </select>
                            {formik.touched.statusPembayaran && formik.errors.statusPembayaran && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.statusPembayaran}</p>}
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Edit</button>
                    </div>

                </div>
                }
        />
        <div className='bg-white flex gap-[32px] min-h-screen'>
            <Sidebar />
            <div className='w-full pr-[32px]'>
                <div className='flex items-center justify-between pt-[40px] mb-8'>
                    <h1 className='text-4xl text-[#353A40] font-bold'>Pembayaran</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>Pembayaran</span></h1>
                </div>
                <Table data={dataPayment} columns={kolomPembayaran}/>
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
