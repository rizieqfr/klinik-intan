import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function Pembayaran() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const route = useRouter()
    const kolomUser = [
        {
            header: 'No. Transaksi',
            accessorKey: 'id',
        },
        {
            header: 'Nama Pasien',
            accessorKey: 'namaPasien',
        },
        {
            header: 'Total Pembayaran',
            accessorKey: 'totalPembayaran',
            cell: ({row}) => (
                <div>Rp. {row.original.totalPembayaran ?? '-'}</div>
            )
        },
        {
            header: 'Status Pembayaran',
            accessorKey: 'status',
            cell: ({row}) => (
                <div>
                    {row.original.status === 'lunas' ? (
                        <h1 className='text-green-600 font-semibold'>Lunas</h1>
                    ) : (
                        <h1 className='text-red-600 font-semibold'>Belum Lunas</h1>
                    )}
                </div>
            )
        },
        {
            accessorKey: 'id',
            header: () => <div></div>,
            cell: ({row}) => (
                <div>
                    {row.original.status === 'lunas' ? (
                        <td className='flex justify-center'>
                            <button onClick={() => setShowEditModal(!showEditModal)} disabled className='bg-blue-300 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit Status</button>
                            <button onClick={() => route.push(`pasien/detail/${row.original.id}`)} className='bg-blue-600 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Cetak Invoice</button>
                        </td>
                    ) : (
                        <td className='flex justify-center'>
                            <button onClick={() => setShowEditModal(!showEditModal)} className='bg-blue-600  text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit Status</button>
                            <button onClick={() => route.push(`pasien/detail/${row.original.id}`)} disabled className='bg-blue-300 text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Cetak Invoice</button>
                        </td>
                    )}
                </div>
                
            )
        
        }
    ]
    const formik = useFormik({
        initialValues:{
            nama:'',
            username:'',
            password:'',
            email:'',
            role:'',
        },
        validate:(values) => {
            const requiredFields = [
                "nama",
                "username",
                "password",
                "email",
                "role",
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
                toast.success('Sukses Tambah User')
            }
            if(showEditModal === true) {
                setShowEditModal(!showEditModal)
                toast.success('Sukses Edit User')
            }
        }
    })
  return (
    <div>
        <Modal 
            activeModal={showAddModal}
            title={`Add User`}
            buttonClose={ () => setShowAddModal(!showAddModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center'>
                            <h1 className='text-[#353A40] font-semibold'>Nama</h1>
                            <h1 className='text-[#353A40] font-semibold'>Username</h1>
                            <h1 className='text-[#353A40] font-semibold'>Password</h1>
                            <h1 className='text-[#353A40] font-semibold'>Email</h1>
                            <h1 className='text-[#353A40] font-semibold'>Role</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='nama' placeholder='Nama...'/>
                            {formik.touched.nama && formik.errors.nama && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.nama}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='username' placeholder='Username...'/>
                            {formik.touched.username && formik.errors.username && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.username}</p>}

                            <input onChange={formik.handleChange} type="password" className='py-[13px] px-[16px] border rounded w-full' name='password'  placeholder='Password...'/>
                            {formik.touched.password && formik.errors.password && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.password}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='email' placeholder='Email...'/>
                            {formik.touched.email && formik.errors.email && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.email}</p>}

                            <select onChange={(val) => formik.setFieldValue('role', val)} className='py-[13px] px-[16px] border rounded w-full' name="role" id="">
                                <option value="">Pilih Role...</option>
                                <option value="Admin">Admin</option>
                                <option value="Dokter">Dokter</option>
                                <option value="Petugas">Petugas</option>
                            </select>
                            {formik.touched.role && formik.errors.role && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.role}</p>}
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Edit</button>
                    </div>

                </div>
                }
        />
        <Modal 
            activeModal={showEditModal}
            title={`Edit User`}
            buttonClose={ () => setShowEditModal(!showEditModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center text-[#353A40] font-semibold'>
                            <h1>Nama</h1>
                            <h1>Username</h1>
                            <h1>Password</h1>
                            <h1>Email</h1>
                            <h1>Role</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='nama' placeholder='Nama...'/>
                            {formik.touched.nama && formik.errors.nama && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.nama}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='username' placeholder='Username...'/>
                            {formik.touched.username && formik.errors.username && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.username}</p>}

                            <input onChange={formik.handleChange} type="password" className='py-[13px] px-[16px] border rounded w-full' name='password'  placeholder='Password...'/>
                            {formik.touched.password && formik.errors.password && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.password}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='email' placeholder='Email...'/>
                            {formik.touched.email && formik.errors.email && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.email}</p>}

                            <select onChange={(val) => formik.setFieldValue('role', val)} className='py-[13px] px-[16px] border rounded w-full' name="role" id="">
                                <option value="">Pilih Role...</option>
                                <option value="Admin">Admin</option>
                                <option value="Dokter">Dokter</option>
                                <option value="Petugas">Petugas</option>
                            </select>
                            {formik.touched.role && formik.errors.role && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.role}</p>}
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Add</button>
                    </div>

                </div>
                }
        />
        <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
            <Sidebar />
            <div className='w-full pr-[32px]'>
                <div className='flex items-center justify-between pt-[40px] mb-4'>
                    <h1 className='text-4xl text-[#353A40] font-bold'>Pembayaran</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>Pembayaran</span></h1>
                </div>
                <div className='flex items-center justify-end mb-4'>
                    <button onClick={() => setShowEditModal(!showEditModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                        <FaCirclePlus className='text-xl' />
                        <h1>Edit</h1>
                    </button>
                </div>
                <Table data={''} columns={kolomUser}/>
            </div>
        </div>
    </div>
  )
}
