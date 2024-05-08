import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'

export default function Pasien() {
    const route = useRouter()
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('https://662d2f180547cdcde9e029ab.mockapi.io/monitoring');
            if (!response.ok) {
            throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
        };
    const kolomPasien = [
        {
            header: 'No Rm',
            accessorKey: 'id',
            cell: ({row}) => (
                <div>0000{row.original.id}</div>
            )
        },
        {
            header: 'Nama',
            accessorKey: 'nama',
        },
        {
            header: 'NIK',
            accessorKey: 'nik',
        },
        {
            header: 'Alamat',
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
            namaPasien:'',
            alamatPasien:'',
            noTelepon:'',
            nikPasien:'',
            tanggalLahir:'',
            pekerjaan:'',
            jenisKelamin:'',
        },
        validate:(values) => {
            const requiredFields = [
                "namaPasien",
                "alamatPasien",
                "noTelepon",
                "nikPasien",
                "tanggalLahir",
                "pekerjaan",
                "jenisKelamin"
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
                toast.success('Sukses Tambah Pasien')
            }
            if(showEditModal === true) {
                setShowEditModal(!showEditModal)
                toast.success('Sukses Edit Pasien')
            }
        }
    })

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Modal 
                activeModal={showAddModal}
                title={`Tambah Pasien`}
                buttonClose={ () => setShowAddModal(!showAddModal)}
                width={'1000px'}
                content= {
                    <div className=' w-full space-y-[12px]'>
                        <div className='grid grid-cols-12 gap-y-8'>
                            <div className='grid space-y-2 col-span-2 items-center text-[#353A40] font-semibold'>
                                <h1>NIK</h1>
                                <h1>Nama</h1>
                                <h1>Jenis Kelamin</h1>
                                <h1>Alamat</h1>
                                <h1>Tanggal Lahir</h1>
                                <h1>Telepon</h1>
                                <h1>Pekerjaan</h1>
                            </div>
                            <div className='grid space-y-2 col-span-9'>
                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.nikPasien} name='nikPasien' placeholder='NIK...'/>
                                {formik.touched.nikPasien && formik.errors.nikPasien && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.nikPasien}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.namaPasien} name='namaPasien' placeholder='Nama...'/>
                                {formik.touched.namaPasien && formik.errors.namaPasien && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.namaPasien}</p>}

                                <select onChange={(val) => formik.setFieldValue('jenisKelamin', val)} defaultValue={formik.values.jenisKelamin} className='py-[13px] px-[16px] border rounded w-full' name="jenisKelamin">
                                    <option value="">Pilih Jenis Kelamin...</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                                {formik.touched.jenisKelamin && formik.errors.jenisKelamin && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.jenisKelamin}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.alamatPasien} name='alamatPasien' placeholder='Alamat...'/>
                                {formik.touched.alamatPasien && formik.errors.alamatPasien && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.alamatPasien}</p>}

                                <input type="date" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.tanggalLahir} name='tanggalLahir' placeholder='Tanggal Lahir...'/>
                                {formik.touched.tanggalLahir && formik.errors.tanggalLahir && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.tanggalLahir}</p>}

                                <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.noTelepon} name='noTelepon' placeholder='Telepon...'/>
                                {formik.touched.noTelepon && formik.errors.noTelepon && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.noTelepon}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.pekerjaan} name='pekerjaan' placeholder='Pekerjaan...'/>
                                {formik.touched.pekerjaan && formik.errors.pekerjaan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.pekerjaan}</p>}
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
                title={`Edit Pasien`}
                buttonClose={ () => setShowEditModal(!showEditModal)}
                width={'1000px'}
                content= {
                    <div className=' w-full space-y-[12px]'>
                        <div className='grid grid-cols-12 gap-y-8'>
                            <div className='grid space-y-2 col-span-2 items-center text-[#353A40] font-semibold'>
                                <h1>NIK</h1>
                                <h1>Nama</h1>
                                <h1>Jenis Kelamin</h1>
                                <h1>Tanggal Lahir</h1>
                                <h1>Telepon</h1>
                                <h1>Pekerjaan</h1>
                            </div>
                            <div className='grid space-y-2 col-span-9'>
                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.nikPasien} name='nikPasien' placeholder='NIK...'/>
                                {formik.touched.nikPasien && formik.errors.nikPasien && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.nikPasien}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.namaPasien} name='namaPasien' placeholder='Nama...'/>
                                {formik.touched.namaPasien && formik.errors.namaPasien && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.namaPasien}</p>}

                                <select onChange={(val) => formik.setFieldValue('jenisKelamin', val)} defaultValue={formik.values.jenisKelamin} className='py-[13px] px-[16px] border rounded w-full' name="jenisKelamin">
                                    <option value="">Pilih Jenis Kelamin...</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>

                                {formik.touched.jenisKelamin && formik.errors.jenisKelamin && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.jenisKelamin}</p>}

                                <input type="date" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.tanggalLahir} name='tanggalLahir' placeholder='Tanggal Lahir...'/>
                                {formik.touched.tanggalLahir && formik.errors.tanggalLahir && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.tanggalLahir}</p>}

                                <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.noTelepon} name='noTelepon' placeholder='Telepon...'/>
                                {formik.touched.noTelepon && formik.errors.noTelepon && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.noTelepon}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.pekerjaan} name='pekerjaan' placeholder='Pekerjaan...'/>
                                {formik.touched.pekerjaan && formik.errors.pekerjaan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.pekerjaan}</p>}
                            </div>
                        </div>
                        <div className='flex items-center justify-end gap-3'>
                            <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                            <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Edit</button>
                        </div>
                    </div>
                    }
            />
            <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
                <Sidebar />
                <div className='w-full pb-10 pr-[32px]'>
                    <div className='flex items-start justify-between  pt-[40px] mb-4'>
                        <h1 className='text-4xl text-[#353A40] font-bold'>Pasien</h1>
                        <h1>Navigasi / <span className='text-cyan font-medium'>Pasien</span></h1>
                    </div>
                    <div className='flex items-center justify-end '>
                        
                    <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                        <FaCirclePlus className='text-xl' />
                        <h1>Tambah</h1>
                    </button>
                    </div>
                    {/* <div className='flex items-center w-full '> */}
                        <Table data={data} columns={kolomPasien} />
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}
