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

export default function PembayaranRawatInap({accessToken}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [dataPayment, setDataPayment] = useState('')
    const [idPayment, setIdPayment] = useState('')
    const [obat, setObat] = useState([]);
    const [tindakan, setTindakan] = useState([]);
    const route = useRouter()
    
    const kolomPembayaran = [
        {
            header: 'No.',
            cell: (row) => (
              <h1>
                {parseInt(row.row.id) + 1}.
              </h1>
            )
        },
        {
            header: 'No. Rm',
            accessorKey: 'no_rm',
        },
        {
            header: 'No. Transaksi',
            accessorKey: 'invoice',
        },
        {
            header: 'Nama Pasien',
            accessorKey: 'fullname',
        },
        {
            header: 'Ruangan',
            accessorKey: 'ruangan',
        },
        {
            header: 'Dokter',
            accessorKey: 'namaDokter',
        },
        {
            header: 'Diagnosis',
            accessorKey: 'diagnosa',
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
                            <button onClick={() => openModalEdit(row.original.medicalRecordId)} disabled className='bg-blue-300 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit Status</button>
                            <Link href={`/pembayaran/invoice/${row.original.id}`} className='bg-blue-600 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Cetak Invoice</Link>
                        </td>
                    ) : (
                        <td className='flex justify-center'>
                            <button onClick={() => openModalEdit(row.original.medicalRecordId)} className='bg-blue-600  text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit Status</button>
                            <Link href={`/pembayaran/invoice/${row.original.id}`} disabled className='bg-blue-300 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Cetak Invoice</Link>
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
                "biayaObat",
                "biayaLayanan",
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
        onSubmit: async (values) => {
            try {
                const submitValues = {
                    ...values,
                    obat, // sertakan obat yang telah diperbarui
                    tindakan,
                };
                await toast.promise(
                    ClientRequest.UpdateRekamMedis(accessToken, submitValues, idPayment).then((res) => {
                        return res
                    }),
                    {
                        loading: 'Processing...',
                        success: (res) => {
                            formik.resetForm()
                            getDataPayment()
                            setShowEditModal(!showEditModal)
                            return 'Sukses Update Data Pembayaran'
                        },
                        error: (error) => {
                            console.log(error, 'error')
                            return 'Something went wrong'
                        }
                    }
                )
            } catch (error) {
                
            }
        }
    })

    const handleQuantityChange = (index, value) => {
        const updatedobat = [...obat];
        updatedobat[index].qty = Number(value);
        setObat(updatedobat);
    };
    const handleQuantityTindakanChange = (index, value) => {
        const updatedtindakan = [...tindakan];
        updatedtindakan[index].qty = Number(value);
        setTindakan(updatedtindakan);
    };

    const openModalEdit = async (id) => {
        setIdPayment(id)
        setShowEditModal(!showEditModal)
        try {
            const res = await ClientRequest.GetRekamMedisById(accessToken, id)
            formik.setFieldValue('statusPembayaran', res.data.data.status)
            formik.setFieldValue('biayaLayanan', res.data.data.purchased.biayaLayanan)
            formik.setFieldValue('biayaObat', res.data.data.purchased.biayaObat)
            setObat(res.data.data.obat)
            setTindakan(res.data.data.tindakan)
        } catch (error) {
            console.log(error)
        }
    }


    const getDataPayment = async () => {
        try {
            const res = await ClientRequest.GetPayment(accessToken, 'rawat-inap')
            setDataPayment(res.data.data)
            console.log(res.data.data)
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
                    <div className='border-b pb-4'>
                        <h1 className='text-[#353A40] font-semibold text-lg mb-2'>Keterangan Jumlah Obat</h1>
                        <div className='pl-1 space-y-[12px]'>
                            {obat.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-12 items-center">
                                    <h1 className='col-span-2 text-[#353A40] font-medium'>{item.name}</h1>
                                    <input 
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => handleQuantityChange(idx, e.target.value)}
                                        className='col-span-9 py-[13px] px-[16px] border rounded w-full outline-none'
                                        placeholder='Masukkan jumlah'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='border-b pb-4'>
                        <h1 className='text-[#353A40] font-semibold text-lg mb-2'>Keterangan Jumlah Layanan</h1>
                        <div className='pl-1 space-y-[12px]'>
                            {tindakan.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-12 items-center">
                                    <h1 className='col-span-2 text-[#353A40] font-medium'>{item.name}</h1>
                                    <input 
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => handleQuantityTindakanChange(idx, e.target.value)}
                                        className='col-span-9 py-[13px] px-[16px] border rounded w-full outline-none'
                                        placeholder='Masukkan jumlah'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center'>
                            <h1 className='text-[#353A40] font-semibold'>Biaya Obat</h1>
                            <h1 className='text-[#353A40] font-semibold'>Biaya Layanan</h1>
                            <h1 className='text-[#353A40] font-semibold'>Status</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <div>
                                <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biayaLayanan} name='biayaLayanan' placeholder='Biaya Pelayanan (Rp.) ...'/>
                                {formik.touched.biayaLayanan && formik.errors.biayaLayanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biayaLayanan}</p>}
                            </div>
                            <div>  
                                <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biayaObat} name='biayaObat' placeholder='Biaya Obat (Rp.) ...'/>
                                {formik.touched.biayaObat && formik.errors.biayaObat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biayaObat}</p>}
                            </div>
                            <div>
                                <select onChange={formik.handleChange} value={formik.values.statusPembayaran} className='py-[13px] px-[16px] border rounded w-full' name="statusPembayaran" >
                                    <option value="">Select Status ...</option>
                                    <option value="LUNAS">Lunas</option>
                                    <option value="BELUM LUNAS">Belum Lunas</option>
                                </select>
                                {formik.touched.statusPembayaran && formik.errors.statusPembayaran && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.statusPembayaran}</p>}
                            </div>
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
                    <h1 className='text-4xl text-[#353A40] font-bold'>Pembayaran Rawat Inap</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>Pembayaran Rawat Inap</span></h1>
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
