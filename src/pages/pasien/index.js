import ModalDelete from '@/components/ModalDelete'
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



export default function Pasien({accessToken}) {
    const route = useRouter()
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [idPasien, setIdPasien] = useState()
    const [data, setData] = useState([]);
    const kolomPasien = [
        {
            header: 'No Rm',
            accessorKey: 'no_rm',
            cell: ({row}) => (
                <div>{row.original.no_rm}</div>
            )
        },
        {
            header: 'Nama',
            accessorKey: 'fullname',
        },
        {
            header: 'NIK',
            accessorKey: 'nik',
        },
        {
            header: 'Alamat',
            accessorKey: 'address',
        },
        {
            accessorKey: 'id',
            header: () => <div></div>,
            cell: ({row}) => (
                <td className='flex justify-center'>
                    <Link href={`pasien/detail/${row.original.id}`} className='bg-[#0080CC] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Detail</Link>
                    <button onClick={() => openModalEdit(row.original.id)} className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit</button>
                    <button onClick={() => actionHapusPasien(row.original.id)} className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                </td>
            )
        
        }
    ]

    const initialValues = {
        nik: '',
        fullname: '',
        date_birth: '',
        statusPerkawinan: '',
        agama: '',
        riwayatAlergiObat: '',
        riwayatAlergiMakanan: '',
        riwayatAlergiLainnya: '',
        gender: '',
        address: '',
        work: '',
        phone: '',
      };

    const formik = useFormik({
        initialValues,
        validate:(values) => {
            const requiredFields = [
                'nik',
                'fullname',
                'date_birth',
                'gender',
                'address',
                'work',
                'phone',
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
                    // Tambah Pasien
                    toast.promise(
                        ClientRequest.CreatePasien(accessToken, values).then((res) => {
                        return res;
                    }),
                    {
                        loading: 'Processing...',
                        success: (res) =>{
                            formik.resetForm();
                            setShowAddModal(!showAddModal);
                            getPasien();
                            return `${res.data.message}`
                        } ,
                        error: (error) => {
                            return `${error.response.data.message}`
                        },
                    }
                    );
            } else {
                // Edit pasien
                toast.promise(
                    ClientRequest.UpdatePasien(accessToken, values, idPasien).then((res) => {
                    return res;
                }),
                {
                    loading: 'Processing...',
                    success: (res) =>{
                        formik.resetForm();
                        setShowEditModal(!showEditModal);
                        getPasien();
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

    const getPasien = async () => {
        try {
            const res = await ClientRequest.GetPasien(accessToken);;
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    const openModalEdit = async (id) => {
        setIdPasien(id)
        setShowEditModal(!showEditModal)
        try {
            const res = await ClientRequest.GetPasienById(accessToken, id)
            const { nik, fullname, date_birth, gender, address, work, phone } = res.data.data;
            formik.setValues({ nik, fullname, date_birth, gender, address, work, phone });
        } catch (error) {
            console.log(error)
        }
    }

    const hapusPasien = async () => {
        try {
            await toast.promise(
                ClientRequest.DeletePasien(accessToken, idPasien),
                {
                    pending: 'Processing...',
                    success: 'Sukses Delete Pasien',
                    error: 'Gagal Delete Pasien',
                }
            );
            getPasien();
            setShowDeleteModal(!showDeleteModal);
        } catch (error) {
            console.error(error);
        }
    }
    
    const actionHapusPasien = async (id) => {
        setIdPasien(id)
        setShowDeleteModal(!showDeleteModal)
        getPasien()
    }

    useEffect(() => {
        getPasien();
    }, []);
    return (
        <div>
            <ModalDelete
                activeModal={showDeleteModal}
                buttonClose={() => setShowDeleteModal(!showDeleteModal)}
                submitButton={hapusPasien}
            />
            <Modal 
                activeModal={showAddModal}
                title={`Tambah Pasien`}
                buttonClose={ () => setShowAddModal(!showAddModal)}
                width={'1000px'}
                content= {
                    <div className=' w-full space-y-[12px]'>
                        <div className='grid grid-cols-12 gap-y-8 item'>
                            <div className='grid space-y-2 col-span-4 items-center text-[#353A40] font-semibold'>
                                <h1>NIK</h1>
                                <h1>Nama</h1>
                                <h1>Jenis Kelamin</h1>
                                <h1>Agama</h1>
                                <h1>Status Perkawinan</h1>
                                <h1>Riwayat Alergi Obat</h1>
                                <h1>Riwayat Alergi Makanan</h1>
                                <h1>Riwayat Alergi Lainnya</h1>
                                <h1>Alamat</h1>
                                <h1>Tanggal Lahir</h1>
                                <h1>Telepon</h1>
                                <h1>Pekerjaan</h1>
                            </div>
                            <div className='grid space-y-2 col-span-8'>
                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.nik} name='nik' placeholder='NIK...'/>
                                {formik.touched.nik && formik.errors.nik && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.nik}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.fullname} name='fullname' placeholder='Nama...'/>
                                {formik.touched.fullname && formik.errors.fullname && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.fullname}</p>}

                                <select onChange={formik.handleChange} value={formik.values.gender} className='py-[13px] px-[16px] border rounded w-full' name="gender">
                                    <option value="">Pilih Jenis Kelamin...</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                                {formik.touched.gender && formik.errors.gender && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.gender}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.agama} name='agama' placeholder='Agama...'/>
                                {formik.touched.agama && formik.errors.agama && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.agama}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.statusPerkawinan} name='statusPerkawinan' placeholder='Status Perkawinan...'/>
                                {formik.touched.statusPerkawinan && formik.errors.statusPerkawinan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.statusPerkawinan}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.riwayatAlergiObat} name='riwayatAlergiObat' placeholder='Riwayat Alergi Obat...'/>
                                {formik.touched.riwayatAlergiObat && formik.errors.riwayatAlergiObat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.riwayatAlergiObat}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.riwayatAlergiMakanan} name='riwayatAlergiMakanan' placeholder='Riwayat Alergi Makanan...'/>
                                {formik.touched.riwayatAlergiMakanan && formik.errors.riwayatAlergiMakanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.riwayatAlergiMakanan}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.riwayatAlergiLainnya} name='riwayatAlergiLainnya' placeholder='Riwayat Alergi Lainnya...'/>
                                {formik.touched.riwayatAlergiLainnya && formik.errors.riwayatAlergiLainnya && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.riwayatAlergiLainnya}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.address} name='address' placeholder='Alamat...'/>
                                {formik.touched.address && formik.errors.address && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.address}</p>}

                                <input type="date" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.date_birth} name='date_birth' placeholder='Tanggal Lahir...'/>
                                {formik.touched.date_birth && formik.errors.date_birth && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.date_birth}</p>}

                                <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.phone} name='phone' placeholder='Telepon...'/>
                                {formik.touched.phone && formik.errors.phone && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.phone}</p>}

                                <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.work} name='work' placeholder='Pekerjaan...'/>
                                {formik.touched.work && formik.errors.work && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.work}</p>}
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
                    <div className='grid grid-cols-12 gap-y-8 item'>
                        <div className='grid space-y-2 col-span-4 items-center text-[#353A40] font-semibold'>
                            <h1>NIK</h1>
                            <h1>Nama</h1>
                            <h1>Jenis Kelamin</h1>
                            <h1>Agama</h1>
                            <h1>Status Perkawinan</h1>
                            <h1>Riwayat Alergi Obat</h1>
                            <h1>Riwayat Alergi Makanan</h1>
                            <h1>Riwayat Alergi Lainnya</h1>
                            <h1>Alamat</h1>
                            <h1>Tanggal Lahir</h1>
                            <h1>Telepon</h1>
                            <h1>Pekerjaan</h1>
                        </div>
                        <div className='grid space-y-2 col-span-8'>

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.nik} name='nik' placeholder='NIK...'/>
                            {formik.touched.nik && formik.errors.nik && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.nik}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.fullname} name='fullname' placeholder='Nama...'/>
                            {formik.touched.fullname && formik.errors.fullname && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.fullname}</p>}

                            <select onChange={formik.handleChange} value={formik.values.gender} className='py-[13px] px-[16px] border rounded w-full' name="gender">
                                <option value="">Pilih Jenis Kelamin...</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.gender}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.agama} name='agama' placeholder='Agama...'/>
                            {formik.touched.agama && formik.errors.agama && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.agama}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.statusPerkawinan} name='statusPerkawinan' placeholder='Status Perkawinan...'/>
                            {formik.touched.statusPerkawinan && formik.errors.statusPerkawinan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.statusPerkawinan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.riwayatAlergiObat} name='riwayatAlergiObat' placeholder='Riwayat Alergi Obat...'/>
                            {formik.touched.riwayatAlergiObat && formik.errors.riwayatAlergiObat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.riwayatAlergiObat}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.riwayatAlergiMakanan} name='riwayatAlergiMakanan' placeholder='Riwayat Alergi Makanan...'/>
                            {formik.touched.riwayatAlergiMakanan && formik.errors.riwayatAlergiMakanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.riwayatAlergiMakanan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.riwayatAlergiLainnya} name='riwayatAlergiLainnya' placeholder='Riwayat Alergi Lainnya...'/>
                            {formik.touched.riwayatAlergiLainnya && formik.errors.riwayatAlergiLainnya && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.riwayatAlergiLainnya}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.address} name='address' placeholder='Alamat...'/>
                            {formik.touched.address && formik.errors.address && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.address}</p>}

                            <input type="date" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.date_birth} name='date_birth' placeholder='Tanggal Lahir...'/>
                            {formik.touched.date_birth && formik.errors.date_birth && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.date_birth}</p>}

                            <input type="number" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.phone} name='phone' placeholder='Telepon...'/>
                            {formik.touched.phone && formik.errors.phone && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.phone}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.work} name='work' placeholder='Pekerjaan...'/>
                            {formik.touched.work && formik.errors.work && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.work}</p>}
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Save</button>
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
                    <Table data={data} columns={kolomPasien} />
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