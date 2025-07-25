import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { useFormik } from 'formik'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function RekamMedis({accessToken, dataPasien, dataReservasi}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [idRekamMedis, setIdRekamMedis] = useState('')
    const [reservasi, setReservasi] = useState([])
    const [obatList, setObatList] = useState([])
    const [tindakantList, setTindakanList] = useState([])
    const [obat, setObat] = useState()
    const [tindakan, setTindakan] = useState()
    

    
    const [dataRekamMedis, setDataRekamMedis] = useState('');
    const getRekamMedis = async () => {
        try {
            const res = await ClientRequest.GetRekamMedis(accessToken)
            console.log('Get Rekam Medis: ',res.data.data)
            setDataRekamMedis(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getReservasi = async () => {
        try {
            const res = await ClientRequest.GetAllReservasi(accessToken)
            console.log('Get Reservasi: ',res.data.data)
            setReservasi(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const route = useRouter()
    const kolomRekamMedis = [
        {
            header: 'No.',
            cell: (row) => (
              <h1>
                {parseInt(row.row.id) + 1}.
              </h1>
            )
        },
        {
            header: 'Tanggal',
            accessorKey: 'createdAt',
        },
        {
            header: 'No. Rm',
            accessorKey: 'noRm',
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
            cell: ({row}) => (
                <h1>{row.original.pelayanan === 'rawat-jalan' ? 'Rawat Jalan' : row.original.pelayanan === 'ugd' ? 'UGD' : 'Rawat Inap'}</h1>
            )
            
        },
        {
            header: 'Tindakan',
            accessorKey: 'tindakan',
            cell: ({row}) => (
                <h1>{row.original?.tindakan?.map(cat => cat.name).join(', ')}</h1>
            )
        },
        {
            header: 'Obat',
            accessorKey: 'obat',
            cell: ({row}) => (
                <h1>{row.original?.obat?.map(cat => cat.name).join(', ')}</h1>
            )
        },
        {
            accessorKey: 'id',
            header: () => <div className='text-center'>Action</div>,
            cell: ({row}) => (
                <td className='flex justify-center'>
                    <Link href={`rekam-medis/detail/${row.original.id}`}  className='bg-[#0080CC] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Detail</Link>
                    {/* <button onClick={() => openModalEdit(row.original.id)} className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit</button> */}
                    <Link href={`rekam-medis/cetak/${row.original.id}`} className='bg-green-500 text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Cetak</Link>
                </td>
            )
        
        }
    ]
    const formik = useFormik({
        initialValues:{
            patientId:'',
            idReservasi:'',
            pelayanan:'',  
            keluhan:'', 
            obat: [], 
            tindakan:[],
            diagnosa:'',
            kodeDiagnosa: '', 
            biayaLayanan: 0,
            biayaObat: 0,
            statusPembayaran: 'BELUM LUNAS'
        },
        validate:(values) => {
            const errors = {};

            if (!values.diagnosa) {
                errors.diagnosa = 'Diagnosa wajib diisi';
            }
            if (!values.kodeDiagnosa) {
                errors.kodeDiagnosa = 'Kode Diagnosa wajib diisi';
            }
            if (!values.tindakan) {
                errors.tindakan = 'Tindakan wajib diisi';
            }
            console.log(errors)

        return errors;
        },
        onSubmit: async (values) => {
            console.log(values, 'value yang dikirim');
            try {
                if (!Array.isArray(values.obat) || values.obat.length === 0) {
                    toast.error('Pastikan menambahkan setidaknya satu obat');
                    return;
                }
                if (!Array.isArray(values.tindakan) || values.tindakan.length === 0) {
                    toast.error('Pastikan menambahkan setidaknya satu tindakan');
                    return;
                }
        
                if (showAddModal === true) {
                    toast.promise(
                        ClientRequest.CreateRekamMedis(accessToken, values).then((res) => {
                            return res;
                        }),
                        {
                            loading: 'Processing...',
                            success: (res) => {
                                console.log('respon yang didapat', res);
                                formik.resetForm();
                                getRekamMedis();
                                setShowAddModal(!showAddModal);
                                return `${res.data.message}`;
                            },
                            error: (error) => {
                                console.log('error nih', error);
                                return `${error.response.data.message}`
                            },
                        }
                    );
                } else {
                    // Edit Pasien
                    toast.promise(
                        ClientRequest.UpdateRekamMedis(accessToken, values, idRekamMedis).then((res) => {
                            return res;
                        }),
                        {
                            loading: 'Processing...',
                            success: (res) => {
                                formik.resetForm();
                                getRekamMedis();
                                setShowEditModal(!showEditModal);
                                return `${res.data.message}`;
                            },
                            error: (error) => {
                                return `${error.response.data.message}`;
                            },
                        }
                    )
                }
            } catch (error) {
                console.error('Error during adding/editing pasien:', error);
                toast.error('Terjadi kesalahan saat menambah/mengedit pasien.');
            }
        }
        
    })
    const handleAutofill = (e) => {
        console.log(e.target.value, 'handlechange')
        debounceAutofill(e.target.value)
    }

    const handleAddObat = () => {
        if (obat) {
            const updatedObatList = [
                ...obatList,
                { name: obat, qty: 0 },
            ];
            setObatList(updatedObatList);
            formik.setFieldValue('obat', updatedObatList);
        }
    };
    
    const handleRemoveObat = (index) => {
        const newObatList = obatList.filter((_, i) => i !== index);
        setObatList(newObatList);
        formik.setFieldValue('obat', newObatList);
    };

    const handleAddTindakan = () => {
        if (tindakan) {
            const updatedTindakanList = [
                ...tindakantList,
                { name: tindakan, qty: 0 },
            ];
            setTindakanList(updatedTindakanList);
            formik.setFieldValue('tindakan', updatedTindakanList);
        }
    };
    
    const handleRemoveTindakan = (index) => {
        const newTindakanList = tindakantList.filter((_, i) => i !== index);
        setTindakanList(newTindakanList);
        formik.setFieldValue('tindakan', newTindakanList);
    };
    
    
    const debounceAutofill = debounce(async (id) => {
    try {
        const res = await ClientRequest.GetReservasiById(accessToken, id)
        console.log(res, 'res debounce')
        formik.setFieldValue('keluhan', res.data.data.keluhan)
        formik.setFieldValue('pelayanan', res.data.data.jenisPerawatan)
        formik.setFieldValue('idReservasi', res.data.data.id)
        formik.setFieldValue('patientId', res.data.data.patientId)
        formik.setFieldValue('diagnosa', res.data.data.kode_diagnosa)
    } catch (error) {
        console.log(error)
    }
    }, 500)

    const openModalEdit = async (id) => {
        setIdRekamMedis(id)
        setShowEditModal(!showEditModal)
        try {
            const res = await ClientRequest.GetRekamMedisById(accessToken, id)
            const {patientId, pelayanan, keluhan, diagnosa, tindakan } = res.data.data;
            formik.setValues({ patientId, pelayanan, keluhan, diagnosa, tindakan});
            formik.setFieldValue('biayaLayanan', res.data.data.purchased.biayaLayanan)
            formik.setFieldValue('biayaObat', res.data.data.purchased.biayaObat)
            formik.setFieldValue('statusPembayaran', res.data.data.status)
            formik.setFieldValue('kodeDiagnosa', res.data.data.kode_diagnosa)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getRekamMedis()
        getReservasi()
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
                        <div className='grid space-y-4 col-span-2 items-start text-[#353A40] font-semibold'>
                            <h1>Pasien</h1>
                            <h1>Jenis Pelayanan</h1>
                            <h1>Keluhan</h1>
                            <h1>Diagnosa</h1>
                            <h1>Kode Diagnosa</h1>
                        </div>
                        <div className='grid space-y-4 col-span-10'>
                            <select 
                                onChange={handleAutofill} 
                                className='py-[13px] px-[16px] border rounded w-full outline-none' 
                                name="patientId" 
                            >
                                <option value="">Pilih Pasien dalam Antrian...</option>
                                {Object.values(reservasi).filter(item => item.status === false).length > 0 ? (
                                    <>
                                        {Object.values(reservasi)
                                            .filter(item => item.status === false)
                                            .map((item, idx) => (
                                                <option key={idx} value={item.id}>
                                                    Antrian {item.queue} - {item.patient?.fullname}
                                                </option>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <option disabled >Tidak ada pasien dalam antrian</option>
                                )}
                            </select>
                            {formik.touched.patientId && formik.errors.patientId && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.patientId}</p>}

                            <input 
                                type="text" 
                                className='py-[13px] px-[16px] border rounded w-full outline-none cursor-not-allowed bg-slate-200' 
                                readOnly 
                                onChange={formik.handleChange} 
                                value={formik.values.pelayanan} 
                                name='pelayanan' 
                                placeholder='Jenis Pelayanan...'
                            />
                            {formik.touched.pelayanan && formik.errors.pelayanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.pelayanan}</p>}

                            <input 
                                type="text" 
                                className='py-[13px] px-[16px] border rounded w-full outline-none cursor-not-allowed bg-slate-200' 
                                onChange={formik.handleChange} 
                                value={formik.values.keluhan} 
                                readOnly 
                                name='keluhan' 
                                placeholder='Keluhan...'
                            />
                            {formik.touched.keluhan && formik.errors.keluhan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.keluhan}</p>}

                            <input 
                                type="text" 
                                className='py-[13px] px-[16px] border rounded w-full outline-none' 
                                onChange={formik.handleChange} 
                                name='diagnosa' 
                                placeholder='Diagnosa...'
                            />
                            {formik.touched.diagnosa && formik.errors.diagnosa && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.diagnosa}</p>}

                            <input 
                                type="text" 
                                className='py-[13px] px-[16px] border rounded w-full outline-none' 
                                onChange={formik.handleChange} 
                                name='kodeDiagnosa' 
                                placeholder='Kode Diagnosa...'
                            />
                            {formik.touched.kodeDiagnosa && formik.errors.kodeDiagnosa && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.kodeDiagnosa}</p>}

                        </div>
                    </div>

                    <div className='flex gap-6 pt-6'>
                        <h1 className='text-[#353A40] font-semibold'>Tindakan</h1>
                        <div className='w-full'>
                            <div className='mb-4 flex gap-2 w-full'>
                                <input 
                                    type='text' 
                                    className='py-[13px] px-[16px] border rounded w-full outline-none' 
                                    name='tindakan' 
                                    onChange={(e) => setTindakan(e.target.value)}
                                    placeholder='Tambah Tindakan...'
                                />
                                {formik.touched.tindakan && formik.errors.tindakan && (
                                    <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.tindakan}</p>
                                )}
                                <button 
                                    type='button' 
                                    className='py-[10px] px-[16px] bg-blue-500 text-white font-semibold border rounded text-xs outline-none' 
                                    onClick={handleAddTindakan}
                                >
                                    Tambah Tindakan
                                </button>
                            </div>

                            <ul className='mb-4'>
                                {tindakantList.map((item, index) => (
                                    <li key={index} className='flex justify-between items-center mb-2 px-3'>
                                        <span className='text-[#353A40]'>{index+1}.  {item.name}</span>
                                        <button
                                            type='button'
                                            className='text-red-500 font-semibold'
                                            onClick={() => handleRemoveTindakan(index)}
                                        >
                                            Hapus
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex gap-14 mt-6'>
                        <h1 className='text-[#353A40] font-semibold'>Obat</h1>
                        <div className='w-full'>
                            <div className='mb-4 flex gap-2 w-full'>
                                <input 
                                    type='text' 
                                    className='py-[13px] px-[16px] border rounded w-full outline-none' 
                                    name='obat' 
                                    onChange={(e) => setObat(e.target.value)}
                                    placeholder='Tambah Obat...'
                                />
                                {formik.touched.obat && formik.errors.obat && (
                                    <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.obat}</p>
                                )}
                                <button 
                                    type='button' 
                                    className='py-[10px] px-[16px] bg-blue-500 text-white font-semibold border rounded text-xs outline-none' 
                                    onClick={handleAddObat}
                                >
                                    Tambah Obat
                                </button>
                            </div>

                            <ul className='mb-4'>
                                {obatList.map((item, index) => (
                                    <li key={index} className='flex justify-between items-center mb-2 px-3'>
                                        <span className='text-[#353A40]'> {index+1}.  {item.name}</span>
                                        <button
                                            type='button'
                                            className='text-red-500 font-semibold'
                                            onClick={() => handleRemoveObat(index)}
                                        >
                                            Hapus
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Cancel</button>
                        <button type='submit' onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Add</button>
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
                            <h1>Kode Diagnosa</h1>
                            <h1>Tindakan</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9'>
                            <select onChange={handleAutofill} className='py-[13px] px-[16px] border rounded w-full outline-none' name="patientId" >
                                <option value="">Pilih Pasien dalam Antrian...</option>
                                {Object.values(reservasi).map((item,idx) => (
                                    <option key={idx} value={item.id}>Antrian {item.queue} - {item.fullname}</option>
                                ))}
                            </select>
                            {formik.touched.patientId && formik.errors.patientId && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.patientId}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.pelayanan} name='pelayanan' placeholder='Jenis Pelayanan...'/>
                            {formik.touched.pelayanan && formik.errors.pelayanan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.pelayanan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.keluhan} name='keluhan' placeholder='Keluhan...'/>
                            {formik.touched.keluhan && formik.errors.keluhan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.keluhan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.diagnosa} name='diagnosa' placeholder='Diagnosa...'/>
                            {formik.touched.diagnosa && formik.errors.diagnosa && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.diagnosa}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.kodeDiagnosa} name='kodeDiagnosa' placeholder='Kode Diagnosa...'/>
                            {formik.touched.kodeDiagnosa && formik.errors.kodeDiagnosa && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.kodeDiagnosa}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} value={formik.values.tindakan} name='tindakan' placeholder='Tindakan...'/>
                            {formik.touched.tindakan && formik.errors.tindakan && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.tindakan}</p>}

                            <input type="text" className='py-[13px] px-[16px] border rounded w-full outline-none' onChange={formik.handleChange} name='obat' placeholder='Obat...'/>
                            {formik.touched.obat && formik.errors.obat && <p className='text-xs font-medium text-red-600 ml-1'>*{formik.errors.obat}</p>}

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
                <div className='w-full overflow-auto'>
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
    const resReservasi = await ClientRequest.GetAllReservasi(accessToken)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
            accessToken: accessToken, 
            dataPasien: resPasien.data.data,
            dataReservasi: resReservasi.data.data,
        }
	})
})