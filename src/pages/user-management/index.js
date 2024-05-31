import ModalDelete from '@/components/ModalDelete'
import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function UserManagement({accessToken}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [idUser, setIdUser] = useState('')
    const [dataRole, setDataRole] = useState('')
    const [dataUser, setDataUser] = useState('')
    const route = useRouter()
    const kolomUser = [
        {
            header: 'No',
            cell: ({row}) => (
                <div>1.</div>
            )
        },
        {
            header: 'Nama',
            accessorKey: 'fullname',
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
                    <button onClick={() => openModalEdit(row.original.id)} className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit</button>
                    <button onClick={() => actionHapusUser(row.original.id)} className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                </td>
            )
        
        }
    ]
    const initialValues = {
        fullname:'',
        username:'',
        password:'',
        phone:'',
        email:'',
        roleId: ''
    }

    const formik = useFormik({
        initialValues,
        validate:(values) => {
            const requiredFields = [
                "fullname",
                "username",
                "password",
                "phone",
                "email",
                "roleId"
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
                if (showAddModal === true) {
                    // Tambah User
                    toast.promise(
                        ClientRequest.CreateUserManagement(accessToken, values).then((res) => {
                        return res;
                    }),
                    {
                        loading: 'Processing...',
                        success: (res) =>{
                            formik.resetForm();
                            setShowAddModal(!showAddModal);
                            getUser();
                            return `${res.data.message}`
                        } ,
                        error: (error) => {
                            return `${error.response.data.message}`
                        },
                    }
                    );
            } else {
                // Edit User
                toast.promise(
                    ClientRequest.UpdateUserManagement(accessToken, values, idUser).then((res) => {
                    return res;
                }),
                {
                    loading: 'Processing...',
                    success: (res) =>{
                        formik.resetForm();
                        setShowEditModal(!showEditModal);
                        getUser();
                        return `${res.data.message}`
                    } ,
                    error: (error) => {
                        console.log(error, 'errorPOST')
                        return `${error.response.data.message}`
                    },
                }
                );
                }
            } catch (error) {
                console.log(values, 'value yang dikirim')
                console.error('Error during adding/editing pasien:', error);
                toast.error('Terjadi kesalahan saat menambah/mengedit pasien.');
            }
        },
    })

    const openModalEdit = async (id) => {
        setIdUser(id)
        setShowEditModal(!showEditModal)
        try {
            const res = await ClientRequest.GetUserManagementById(accessToken, id)
            console.log(res, 'resById')
            const { fullname, username, password, phone, email, roleId } = res.data.data;
            formik.setValues({ fullname, username, password, phone, email, roleId });
        } catch (error) {
            console.log(error)
        }
    }

    const hapusUser = async () => {
        try {
            await toast.promise(
                ClientRequest.DeleteUserManagement(accessToken, idUser),
                {
                    loading: 'Processing...',
                    success: 'Sukses Delete User',
                    error: 'Gagal Delete User',
                }
            );
            getUser();
            setShowDeleteModal(!showDeleteModal);
        } catch (error) {
            console.error(error);
        }
    }
    
    const actionHapusUser = async (id) => {
        setIdUser(id)
        setShowDeleteModal(!showDeleteModal)
        getUser()
    }

    const getUser = async () => {
        try {
            const res = await ClientRequest.GetUserManagement(accessToken, '','','')
            console.log(res,'dataUser')
            setDataUser(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    const getRole = async () => {
        try {
            const res = await ClientRequest.GetRole(accessToken)
            setDataRole(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRole()
    }, [showAddModal, showEditModal])

    useEffect(() => {
        getUser()
    }, [])

  return (
    <div>
        <ModalDelete
            activeModal={showDeleteModal}
            buttonClose={() => setShowDeleteModal(!showDeleteModal)}
            submitButton={hapusUser}
        />
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
                            <h1 className='text-[#353A40] font-semibold'>Phone</h1>
                            <h1 className='text-[#353A40] font-semibold'>Email</h1>
                            <h1 className='text-[#353A40] font-semibold'>Role</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='fullname' placeholder='Nama...'/>
                            {formik.touched.fullname && formik.errors.fullname && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.fullname}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='username' placeholder='Username...'/>
                            {formik.touched.username && formik.errors.username && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.username}</p>}

                            <input onChange={formik.handleChange} type="password" className='py-[13px] px-[16px] border rounded w-full' name='password'  placeholder='Password...'/>
                            {formik.touched.password && formik.errors.password && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.password}</p>}

                            <input onChange={formik.handleChange} type="number" className='py-[13px] px-[16px] border rounded w-full' name='phone' placeholder='Phone Number...'/>
                            {formik.touched.phone && formik.errors.phone && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.phone}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' name='email' placeholder='Email...'/>
                            {formik.touched.email && formik.errors.email && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.email}</p>}

                            <select onChange={formik.handleChange} className='py-[13px] px-[16px] border rounded w-full' name="roleId">
                                <option value="">Pilih Role...</option>
                                {Object.values(dataRole).map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.name}</option>

                                ))}
                            </select>
                            {formik.touched.roleId && formik.errors.roleId && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.roleId}</p>}
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button type='submit' onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Add</button>
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
                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' value={formik.values.fullname} name='fullname' placeholder='Nama...'/>
                            {formik.touched.fullname && formik.errors.fullname && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.fullname}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' value={formik.values.username} name='username' placeholder='Username...'/>
                            {formik.touched.username && formik.errors.username && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.username}</p>}

                            <input onChange={formik.handleChange} type="password" className='py-[13px] px-[16px] border rounded w-full' value={formik.values.password} name='password'  placeholder='******'/>
                            {formik.touched.password && formik.errors.password && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.password}</p>}

                            <input onChange={formik.handleChange} type="text" className='py-[13px] px-[16px] border rounded w-full' value={formik.values.email} name='email' placeholder='Email...'/>
                            {formik.touched.email && formik.errors.email && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.email}</p>}

                            <select onChange={formik.handleChange} className='py-[13px] px-[16px] border rounded w-full' name="roleId" value={formik.values.roleId} id="">
                                <option value="">Pilih Role...</option>
                                {Object.values(dataRole).map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.name}</option>

                                ))}
                            </select>
                            {formik.touched.roleId && formik.errors.roleId && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.roleId}</p>}
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
                    <h1 className='text-4xl text-[#353A40] font-bold'>User Management</h1>
                    <h1>Navigasi / <span className='text-cyan font-medium'>User Management</span></h1>
                </div>
                <div className='flex items-center justify-end mb-4'>
                    <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                        <FaCirclePlus className='text-xl' />
                        <h1>Tambah</h1>
                    </button>
                </div>
                <Table data={dataUser} columns={kolomUser}/>
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
		props: {accessToken}
	})
})