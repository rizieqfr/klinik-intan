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

export default function RekamMedis({accessToken, dataPasien}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [idRekamMedis, setIdRekamMedis] = useState('')
    
    const [dataRekamMedis, setDataRekamMedis] = useState('');
    const getRekamMedis = async () => {
        try {
            const res = await ClientRequest.GetRekamMedis(accessToken)
            console.log(res)
            setDataRekamMedis(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const route = useRouter()
    const kolomRekamMedis = [
        {
            header: 'Tanggal',
            accessorKey: 'createdAt',
        },
        {
            header: 'Nama',
            accessorKey: 'fullname',
        },
        {
            header: 'Keluhan',
            accessorKey: 'keluhan',
        },
        {
            header: 'Jenis Pelayanan',
            accessorKey: 'pelayanan',
        },
        {
            header: 'Tindakan',
            accessorKey: 'tindakan',
        },
        {
            accessorKey: 'id',
            header: () => <div>Action</div>,
            cell: ({row}) => (
                <td className='flex justify-center'>
                    <Link href={`rekam-medis/detail/${row.original.id}`}  className='bg-[#0080CC] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Detail</Link>
                    <button onClick={() => openModalEdit(row.original.id)} className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit</button>
                    <button className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                </td>
            )
        
        }
    ]
    const formik = useFormik({
        initialValues:{
            patientId:'',
            pelayanan:'',
            keluhan:'',
            diagnosa:'',
            tindakan:'',
            biayaLayanan: '',
            biayaObat: '',
            statusPembayaran: ''
        },
        validate:(values) => {
            const errors = {};

            if (!values.patientId) {
                errors.patientId = 'Pasien wajib diisi';
            }
            if (!values.pelayanan) {
                errors.pelayanan = 'Jenis Pelayanan wajib diisi';
            }
            if (!values.keluhan) {
                errors.keluhan = 'Keluhan wajib diisi';
            }
            if (!values.diagnosa) {
                errors.diagnosa = 'Diagnosa wajib diisi';
            }
            if (!values.tindakan) {
                errors.tindakan = 'Tindakan wajib diisi';
            }
            if (!values.statusPembayaran) {
                errors.statusPembayaran = 'Status Pembayaran wajib diisi';
            }
            if (!values.biayaLayanan) {
                errors.biayaLayanan = 'Biaya Pelayanan wajib diisi';
            }
            if (!values.biayaObat) {
                errors.biayaObat = 'Biaya Obat wajib diisi';
            }

        return errors;
        },
        onSubmit: async (values) => {
            try {
                if (showAddModal === true) {
                    // Tambah Pasien
                    toast.promise(
                        ClientRequest.CreateRekamMedis(accessToken, values).then((res) => {
                        return res;
                    }),
                    {
                        loading: 'Processing...',
                        success: (res) =>{
                            console.log('respon yang didapat', res)
                            formik.resetForm();
                            getRekamMedis()
                            setShowAddModal(!showAddModal);
                            return `${res.data.message}`
                        } ,
                        error: (error) => {
                            console.log('error nih',error)
                            return `${error.response.data.message}`
                        },
                    }
                    );
            } else {
                // Edit pasien
                toast.promise(
                    ClientRequest.UpdateRekamMedis(accessToken, values, idRekamMedis).then((res) => {
                    return res;
                }),
                {
                    loading: 'Processing...',
                    success: (res) =>{
                        formik.resetForm();
                        getRekamMedis()
                        setShowEditModal(!showEditModal);
                        return `${res.data.message}`
                    } ,
                    error: (error) => {
                        return `${error.response.data.message}`
                    },
                }
                );
                }
            } catch (error) {
                console.error('Error during adding/editing pasien:', error);
                toast.error('Terjadi kesalahan saat menambah/mengedit pasien.');
            }
        },
    })

    const openModalEdit = async (id) => {
        setIdRekamMedis(id)
        setShowEditModal(!showEditModal)
        try {
            const res = await ClientRequest.GetRekamMedisById(accessToken, id)
            const {patientId, pelayanan, keluhan, diagnosa, tindakan, biayaLayanan, biayaObat, statusPembayaran } = res.data.data;
            formik.setValues({ patientId, pelayanan, keluhan, diagnosa, tindakan, biayaLayanan, biayaObat, statusPembayaran});
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRekamMedis()
    }, [])
  return (
    <div>
        <Modal 
            activeModal={showAddModal}
            title={`Tambah Rekam Medis`}
            buttonClose={ () => setShowAddModal(!showAddModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center text-[#353A40] font-semibold'>
                            <h1>Pasien</h1>
                            <h1>Pelayanan</h1>
                            <h1>Keluhan</h1>
                            <h1>Diagnosa</h1>
                            <h1>Tindakan</h1>
                            <h1>Biaya Pelayanan</h1>
                            <h1>Biaya Obat</h1>
                            <h1>Status Pembayaran</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <select onChange={(e) => formik.setFieldValue('patientId', e.target.value)} className='py-[13px] px-[16px] border rounded w-full outline-none' name="patientId" >
                                <option value="">Pilih Pasien...</option>
                                {Object.values(dataPasien).map((item,idx) => (
                                    <option key={idx} value={item.id}>{item.fullname}</option>
                                ))}
                            </select>
                            {formik.touched.patientId && formik.errors.patientId && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.patientId}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} name='pelayanan' placeholder='Jenis Pelayanan...'/>
                            {formik.touched.pelayanan && formik.errors.pelayanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.pelayanan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} name='keluhan' placeholder='Keluhan...'/>
                            {formik.touched.keluhan && formik.errors.keluhan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.keluhan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} name='diagnosa' placeholder='Diagnosa...'/>
                            {formik.touched.diagnosa && formik.errors.diagnosa && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.diagnosa}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} name='tindakan' placeholder='Tindakan...'/>
                            {formik.touched.tindakan && formik.errors.tindakan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.tindakan}</p>}

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} name='biayaLayanan' placeholder='Biaya Pelayanan (Rp.) ...'/>
                            {formik.touched.biayaLayanan && formik.errors.biayaLayanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biayaLayanan}</p>}

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} name='biayaObat' placeholder='Biaya Obat (Rp.) ...'/>
                            {formik.touched.biayaObat && formik.errors.biayaObat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biayaObat}</p>}

                            <select name="statusPembayaran" onChange={(e) => formik.setFieldValue('statusPembayaran', e.target.value)} className='py-[13px] px-[16px] border rounded w-full outline-none'>
                                <option value="">Select Status Pembayaran</option>
                                <option value="BELUM LUNAS">Belum Lunas</option>
                                <option value="LUNAS">Lunas</option>
                            </select>
                            {formik.touched.statusPembayaran && formik.errors.statusPembayaran && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.statusPembayaran}</p>}
                            

                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Cancel</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Add</button>
                    </div>

                </div>
            }
        />
        <Modal 
            activeModal={showEditModal}
            title={`Edit Rekam Medis`}
            buttonClose={ () => setShowEditModal(!showEditModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center text-[#353A40] font-semibold'>
                            <h1>Pasien</h1>
                            <h1>Pelayanan</h1>
                            <h1>Keluhan</h1>
                            <h1>Diagnosa</h1>
                            <h1>Tindakan</h1>
                            <h1>Biaya Pelayanan</h1>
                            <h1>Biaya Obat</h1>
                            <h1>Status Pembayaran</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <select onChange={(e) => formik.setFieldValue('patientId', e.target.value)} className='py-[13px] px-[16px] border rounded w-full outline-none' name="patientId" id="">
                                <option value="">Pilih Pasien...</option>
                                {Object.values(dataPasien).map((item,idx) => (
                                    <option value={item.id}>{item.fullname}</option>
                                ))}
                            </select>
                            {formik.touched.patientId && formik.errors.patientId && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.patientId}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.pelayanan} name='pelayanan' placeholder='Jenis Pelayanan...'/>
                            {formik.touched.pelayanan && formik.errors.pelayanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.pelayanan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.keluhan} name='keluhan' placeholder='Keluhan...'/>
                            {formik.touched.keluhan && formik.errors.keluhan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.keluhan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.diagnosa} name='diagnosa' placeholder='Diagnosa...'/>
                            {formik.touched.diagnosa && formik.errors.diagnosa && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.diagnosa}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.tindakan} name='tindakan' placeholder='Tindakan...'/>
                            {formik.touched.tindakan && formik.errors.tindakan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.tindakan}</p>}

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biayaLayanan} name='biayaLayanan' placeholder='Biaya Pelayanan (Rp.) ...'/>
                            {formik.touched.biayaLayanan && formik.errors.biayaLayanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biayaLayanan}</p>}

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biayaObat} name='biayaObat' placeholder='Biaya Obat (Rp.) ...'/>
                            {formik.touched.biayaObat && formik.errors.biayaObat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biayaObat}</p>}

                            <select name="statusPembayaran" onChange={(e) => formik.setFieldValue('statusPembayaran', e.target.value)} className='py-[13px] px-[16px] border rounded w-full outline-none'>
                                <option value="">Select Status Pembayaran</option>
                                <option value="BELUM LUNAS">Belum Lunas</option>
                                <option value="LUNAS">Lunas</option>
                            </select>
                            {formik.touched.statusPembayaran && formik.errors.statusPembayaran && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.statusPembayaran}</p>}

                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Cancel</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Save</button>
                    </div>

                </div>
            }
        />
        <div className='bg-white flex gap-[32px] min-h-screen'>
            <Sidebar />
            <div className='w-full pr-[32px]'>
                <div className='flex items-center justify-between pt-[40px] mb-4'>
                    <h1 className='text-4xl text-[#353A40] font-bold'>Rekam Medis</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>Rekam Medis</span></h1>
                </div>
                <div className='flex items-center justify-end mb-4'>
                    <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                        <FaCirclePlus className='text-xl' />
                        <h1>Tambah</h1>
                    </button>
                </div>
                <div className='w-[1200px] overflow-auto'>
                    <Table data={dataRekamMedis} columns={kolomRekamMedis} />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
    const resPasien = await ClientRequest.GetPasien(accessToken)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {accessToken: accessToken, dataPasien: resPasien.data.data}
	})
})