import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'

export default function RekamMedis({accessToken, dataPasien, dataRekamMedis}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [idRekamMedis, setIdRekamMedis] = useState('')
    const route = useRouter()
    const kolomRekamMedis = [
        {
            header: 'No. Booking',
            accessorKey: 'id',
        },
        {
            header: 'Nama',
            accessorKey: 'nama',
        },
        {
            header: 'Tanggal',
            accessorKey: 'nik',
        },
        {
            header: 'Jenis Pelayanan',
            accessorKey: 'alamat',
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
    const formik = useFormik({
        initialValues:{
            patientId:'',
            pelayanan:'',
            keluhan:'',
            diagnosa:'',
            tindakan:'',
            biaya: {layanan: '', obat: ''},
            total: '100000'
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
            if (!values.biaya.layanan) {
                errors.biaya = errors.biaya || {};
                errors.biaya.layanan = 'Biaya layanan wajib diisi';
            }
            if (!values.biaya.obat) {
                errors.biaya = errors.biaya || {};
                errors.biaya.obat = 'Biaya obat wajib diisi';
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
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <select onChange={(e) => formik.setFieldValue('patientId', e.target.value)} className='py-[13px] px-[16px] border rounded w-full outline-none' name="patientId" >
                                <option value="">Pilih Pasien...</option>
                                {Object.values(dataPasien).map((item,idx) => (
                                    <option key={idx} value={item.id}>{item.fullname}</option>
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

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biaya.layanan} name='biaya.layanan' placeholder='Biaya Pelayanan (Rp.) ...'/>
                            {formik.touched.biaya?.layanan && formik.errors.biaya?.layanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biaya.layanan}</p>}

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biaya.obat} name='biaya.obat' placeholder='Biaya Obat (Rp.) ...'/>
                            {formik.touched.biaya?.obat && formik.errors.biaya?.obat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biaya.obat}</p>}

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

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biaya.layanan} name='biaya.layanan' placeholder='Biaya Pelayanan (Rp.) ...'/>
                            {formik.touched.biaya?.layanan && formik.errors.biaya?.layanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biaya.layanan}</p>}

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.biaya.obat} name='biaya.obat' placeholder='Biaya Obat (Rp.) ...'/>
                            {formik.touched.biaya?.obat && formik.errors.biaya?.obat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.biaya.obat}</p>}

                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Cancel</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Save</button>
                    </div>

                </div>
            }
        />
        <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
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
                <Table data={''} columns={kolomRekamMedis} />
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
    const resPasien = await ClientRequest.GetPasien(accessToken)
    // const resRekamMedis = await ClientRequest.GetRekamMedis(accessToken)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {accessToken: accessToken, dataPasien: resPasien.data.data}
	})
})