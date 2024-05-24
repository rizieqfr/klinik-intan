import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function Dokter() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const route = useRouter()
    const kolomDokter = [
        {
            header: 'No',
            accessorKey: 'id',
        },
        {
            header: 'Hari Kerja',
            accessorKey: '',
        },
        {
            header: 'Nama Dokter',
            accessorKey: '',
        },
        {
            header: 'Poliklinik',
            accessorKey: '',
        },
        {
            header: 'Jam Mulai',
            accessorKey: '',
        },
        {
            header: 'Jam Selesai',
            accessorKey: '',
        },
        {
            accessorKey: 'id',
            header: () => <div></div>,
            cell: ({row}) => (
                <td className='flex justify-center'>
                    <button onClick={() => setShowEditModal(!showEditModal)} className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit</button>
                    <button className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                </td>
            )
        
        }
    ]
    const formik = useFormik({
        initialValues:{
            namaDokter:'',
            poliklinik:'',
            hariKerja:'',
            jamMulai:'',
            jamSelesai:'',
        },
        validate:(values) => {
            const requiredFields = [
                "namaDokter",
                "poliklinik",
                "hariKerja",
                "jamMulai",
                "jamSelesai",
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
            console.log(values)
            formik.resetForm()
            
            if(showAddModal === true) {
                setShowAddModal(!showAddModal)
                toast.success('Sukses Tambah Dokter')
            }
            if(showEditModal === true) {
                setShowEditModal(!showEditModal)
                toast.success('Sukses Edit Dokter')
            }
        }
    })
  return (
    <div>
        <Modal 
            activeModal={showAddModal}
            title={`Tambah Dokter`}
            buttonClose={ () => setShowAddModal(!showAddModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='flex items-center justify-start w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold w-[20%]'>Nama Dokter</h1>
                        <div className='w-full'>
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' placeholder='Nama Dokter...' value={formik.values.namaDokter} name='namaDokter'/>
                            {formik.touched.namaDokter && formik.errors.namaDokter && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.namaDokter}</p>}
                        </div>

                    </div>
                    <div className='flex items-center justify-start w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold w-[20%]'>Poliklinik</h1>
                        <div className='w-full'>
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' placeholder='Poliklinik...' value={formik.values.poliklinik} name='poliklinik'/>
                            {formik.touched.poliklinik && formik.errors.poliklinik && <p className='text-xs font-medium text-red-600 ml-1'>*    {formik.errors.poliklinik}</p>}
                        </div>

                    </div>
                    <div className='flex items-center justify-start w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold w-[20%]'>Hari Kerja</h1>
                        <div className='w-full'>
                            <select onChange={(val) => formik.setFieldValue('hariKerja', val)} className='py-[13px] px-[16px] border rounded w-full outline-none' value={formik.values.hariKerja} name="hariKerja">
                                <option value="">Pilih Hari Kerja...</option>
                                <option value="Senin">Senin</option>
                                <option value="Selasa">Selasa</option>
                                <option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option>
                                <option value="Jumat">Jumat</option>
                                <option value="Sabtu">Sabtu</option>
                                <option value="Minggu">Minggu</option>
                            </select>
                            {formik.touched.hariKerja && formik.errors.hariKerja && <p className='text-xs font-medium text-red-600 ml-1'>*  {formik.errors.hariKerja}</p>}
                        </div>

                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='flex items-center justify-start gap-[110px] w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Jam Mulai</h1>
                            <div className='w-full'>
                                <input onChange={formik.handleChange} value={formik.values.jamMulai} name='jamMulai' type="time" className='py-[13px] px-[16px] border rounded w-full outline-none'/>
                                {formik.touched.jamMulai && formik.errors.jamMulai && <p className='text-xs font-medium text-red-600 ml-1'>*    {formik.errors.jamMulai}</p>}
                            </div>

                        </div>
                        <div className='flex items-center justify-start gap-[40px] w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Jam Selesai</h1>
                            <div className='w-full'>
                                <input onChange={formik.handleChange} value={formik.values.jamSelesai} name='jamSelesai' type="time" className='py-[13px] px-[16px] border rounded w-full outline-none'/>
                                {formik.touched.jamSelesai && formik.errors.jamSelesai && <p className='text-xs font-medium text-red-600 ml-1'>*    {formik.errors.jamSelesai}</p>}
                            </div>

                        </div>
                    </div>
                    
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Add</button>
                    </div>
                </div>
        }
        />
        <Modal 
            activeModal={showEditModal}
            title={`Edit Dokter`}
            buttonClose={ () => setShowEditModal(!showEditModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='flex items-center justify-start w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold w-[20%]'>Nama Dokter</h1>
                        <div className='w-full'>
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' placeholder='Nama Dokter...' value={formik.values.namaDokter} name='namaDokter'/>
                            {formik.touched.namaDokter && formik.errors.namaDokter && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.namaDokter}</p>}
                        </div>

                    </div>
                    <div className='flex items-center justify-start w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold w-[20%]'>Poliklinik</h1>
                        <div className='w-full'>
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' placeholder='Poliklinik...' value={formik.values.poliklinik} name='poliklinik'/>
                            {formik.touched.poliklinik && formik.errors.poliklinik && <p className='text-xs font-medium text-red-600 ml-1'>*    {formik.errors.poliklinik}</p>}
                        </div>

                    </div>
                    <div className='flex items-center justify-start w-full text-sm'>
                        <h1 className='text-[#353A40] font-semibold w-[20%]'>Hari Kerja</h1>
                        <div className='w-full'>
                            <select onChange={(val) => formik.setFieldValue('hariKerja', val)} className='py-[13px] px-[16px] border rounded w-full outline-none' value={formik.values.hariKerja} name="hariKerja">
                                <option value="">Pilih Hari Kerja...</option>
                                <option value="Senin">Senin</option>
                                <option value="Selasa">Selasa</option>
                                <option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option>
                                <option value="Jumat">Jumat</option>
                                <option value="Sabtu">Sabtu</option>
                                <option value="Minggu">Minggu</option>
                            </select>
                            {formik.touched.hariKerja && formik.errors.hariKerja && <p className='text-xs font-medium text-red-600 ml-1'>*  {formik.errors.hariKerja}</p>}
                        </div>

                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='flex items-center justify-start gap-[110px] w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Jam Mulai</h1>
                            <div className='w-full'>
                                <input onChange={formik.handleChange} value={formik.values.jamMulai} name='jamMulai' type="time" className='py-[13px] px-[16px] border rounded w-full outline-none'/>
                                {formik.touched.jamMulai && formik.errors.jamMulai && <p className='text-xs font-medium text-red-600 ml-1'>*    {formik.errors.jamMulai}</p>}
                            </div>

                        </div>
                        <div className='flex items-center justify-start gap-[40px] w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Jam Selesai</h1>
                            <div className='w-full'>
                                <input onChange={formik.handleChange} value={formik.values.jamSelesai} name='jamSelesai' type="time" className='py-[13px] px-[16px] border rounded w-full outline-none'/>
                                {formik.touched.jamSelesai && formik.errors.jamSelesai && <p className='text-xs font-medium text-red-600 ml-1'>*    {formik.errors.jamSelesai}</p>}
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
                <div className='flex items-center justify-between pt-[40px] mb-4'>
                    <h1 className='text-4xl text-[#353A40] font-bold'>Dokter</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>Dokter</span></h1>
                </div>
                <div className='flex items-center justify-end mb-4'>
                    <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                        <FaCirclePlus className='text-xl' />
                        <h1>Tambah</h1>
                    </button>
                </div>
                <Table data={''} columns={kolomDokter}/>
            </div>
        </div>
    </div>
  )
}
