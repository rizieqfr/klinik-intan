import Table from '@/components/Table'
import Input from '@/components/input'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { data } from 'autoprefixer'
import { useFormik } from 'formik'
import { debounce } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'
import 'moment/locale/id';  // Import the Indonesian locale
import ModalDelete from '@/components/ModalDelete'
import Link from 'next/link'
moment.locale('id');  // Set the locale to Indonesian


export default function Reservasi({accessToken}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [dataReservasi, setDataReservasi] = useState('')
    const [dataDokter, setDataDokter] = useState('')
    const [dataPasien, setDataPasien] = useState('')
    const [date, setDate] = useState('')
    const [idPendaftaran, setIdPendaftaran] = useState('')
    const [dataDetailReservasi, setDataDetailReservasi] = useState()

    const hapusPendaftaran = async () => {
        try {
            await toast.promise(
                ClientRequest.DeleteReservasi(accessToken, idPendaftaran),
                {
                    pending: 'Processing...',
                    success: 'Sukses Delete Pendaftaran',
                    error: 'Gagal Delete Pendaftaran',
                }
            );
            getDataReservasi();
            setShowDeleteModal(!showDeleteModal);
        } catch (error) {
            console.error(error);
        }
    }
    
    const actionHapusPendaftaran = async (id) => {
        setIdPendaftaran(id)
        setShowDeleteModal(!showDeleteModal)
        getDataReservasi()
    }

    const getDataReservasi = async () => {
        try {
            const res = await ClientRequest.GetAllReservasi(accessToken)
            setDataReservasi(res.data.data)
            console.log('Data Reservasi: ',res)
        } catch (error) {
            
        }
    }

    const getDataDokter = async () => {
        try {
            const res = await ClientRequest.GetJadwalDokterAll('','','','')
            setDataDokter(res.data.data)
        } catch (error) {
            
        }
    }

    const getDataPasien = async () => {
        try {
            const res = await ClientRequest.GetPasien(accessToken)
            setDataPasien(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const kolomReservasi = [
        {
            header: 'No.',
            cell: (row) => (
              <h1>
                {parseInt(row.row.id) + 1}.
              </h1>
            )
        },
        {
            accessorKey: 'date',
            header: 'Hari Tanggal',
            cell: ({row}) => (
                <h1>{moment(row.original.createdAt).format('dddd, D MMMM YYYY, [Pukul] hh:mm')}</h1>

            )
        },
        {
            accessorKey: 'date',
            header: 'Tanggal Berobat'
        },
        {
            accessorKey: 'patient.fullname',
            header: 'Nama Pasien'
        },
        {
            accessorKey: 'jadwal_dokter.namaDokter',
            header: 'Dokter'
        },
        {
            accessorKey: 'jadwal_dokter.poli',
            header: 'Poli yang Dituju'
        },
        {
            accessorKey: 'jenisPerawatan',
            header: 'Jenis Pelayanan',
            cell: ({row}) => (
                <h1>{row.original.jenisPerawatan === 'rawat-jalan' ? 'Rawat Jalan' : row.original.jenisPerawatan === 'ugd' ? 'UGD' : 'Rawat Inap'}</h1>
            )
        },
        {
            header: 'Nomor Antrian',
            cell: ({row}) => (
                <h1 className='bg-green-500 font-semibold rounded-sm p-1 text-md text-center border text-white'>{row.original.queue}</h1>
            )
        },
        {
            header: 'Status Pelayanan',
            cell: ({ row }) => (
                <div className='flex gap-2 items-center'>
                    <h1 className={`font-semibold rounded-sm p-1 text-md text-center border ${row.original.status ? 'bg-green-500 text-white' : 'bg-[#FF0000] text-white'}`}>
                        {row.original.status ? 'Sudah Dilayani' : 'Belum Dilayani'}
                    </h1>
                    <button onClick={() => actionHapusPendaftaran(row.original.id)} className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                    <button onClick={() => openModalDetail(row.original.id)} className='bg-blue-500 text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Detail</button>
                    <Link href={`reservasi/cetak/${row.original.id}`} className='bg-yellow-500 text-white  rounded px-[14px] py-[3px] font-semibold text-sm'>Cetak</Link>
                </div>

            )
        }
        
    ]

    const formik = useFormik({
        initialValues: {
          jadwalDokterId: '',
          patientId : '',
          date: date,
          pembayaran: 'Umum',
          jenisPerawatan : '',
          keluhan : '',
        },
        onSubmit: async (value) => {
            console.log(value)
          try {
            await toast.promise(
              ClientRequest.CreateReservasi(localStorage.getItem('token-pasien') ,value).then((res) => {
                return res
              }),
              {
                loading: 'Loading...',
                success: (res) => {
                  console.log(res, 'res sukses reservasi')
                  formik.resetForm()
                  getDataReservasi()
                  setShowAddModal(!showAddModal)
                  return 'Pendaftaran Berhasil!'
                },
                error: (error) => {
                  console.log(error, 'error')
                  return `${error.response.data.message}`
                }
              }
            )
          } catch (error) {
            toast.error(error.data.message)
          }
        }
    })
    const handleSearchPoli = (e) => {
        setDate(e.target.value)
        debounceDataPoli(e.target.value)
    }

    const openModalDetail = async (id) => {
        setShowDetailModal(!showDetailModal)
        try {
            const res = await ClientRequest.GetReservasiById(accessToken, id)
            console.log(res, 'resbyid')
            setDataDetailReservasi(res.data.data)
        } catch (error) {
            
        }
    }

    const debounceDataPoli = debounce(async (keyword) => {
    try {
        const res = await ClientRequest.GetJadwalDokterAll('','','', keyword)
        setDataDokter(res.data.data)
    } catch (error) {
        console.log(error)
    }
    }, 500)

    useEffect(() => {
        getDataReservasi()
        getDataPasien()
        getDataDokter()
    }, [])
    useEffect(() => {
        formik.setFieldValue('date', date);
      }, [date])

    
  return (
    <div>
        <Modal 
            activeModal={showDetailModal}
            title={`Detail Reservasi Pasien`}
            buttonClose={ () => setShowDetailModal(!showDetailModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center'>
                            <h1 className='text-[#353A40] font-semibold'>Pasien</h1>
                            <h1 className='text-[#353A40] font-semibold'>Tanggal Berobat</h1>
                            <h1 className='text-[#353A40] font-semibold'>Dokter & Poli Tujuan</h1>
                            <h1 className='text-[#353A40] font-semibold'>Jenis Perawatan</h1>
                            <h1 className='text-[#353A40] font-semibold'>Keluhan</h1>
                            <h1 className='text-[#353A40] font-semibold'>Jenis Pembayaran</h1>
                        </div>
                        <div className='grid items-center text-end pr-3 col-span-1'>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9 items-center'>
                            <h1>{dataDetailReservasi?.patient?.fullname}</h1>
                            <h1>{dataDetailReservasi?.date}</h1>
                            <h1>{dataDetailReservasi?.jadwal_dokter?.namaDokter} - {dataDetailReservasi?.jadwal_dokter.poli}</h1>
                            <h1>{dataDetailReservasi?.jenisPerawatan}</h1>
                            <h1>{dataDetailReservasi?.jenisPerawatan === 'rawat-inap' ? '-' : dataDetailReservasi?.keluhan}</h1>
                            <h1>{dataDetailReservasi?.pembayaran}</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowDetailModal(!showDetailModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Add</button>
                    </div>

                </div>
            }
        />
        <Modal 
            activeModal={showAddModal}
            title={`Reservasi Pasien`}
            buttonClose={ () => setShowAddModal(!showAddModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    <div className='grid grid-cols-12 gap-y-8'>
                        <div className='grid space-y-2 col-span-2 items-center'>
                            <h1 className='text-[#353A40] font-semibold'>Pasien</h1>
                            <h1 className='text-[#353A40] font-semibold'>Tanggal Berobat</h1>
                            <h1 className='text-[#353A40] font-semibold'>Dokter & Poli Tujuan</h1>
                            <h1 className='text-[#353A40] font-semibold'>Jenis Perawatan</h1>
                            <h1 className='text-[#353A40] font-semibold'>Keluhan</h1>
                            <h1 className='text-[#353A40] font-semibold'>Jenis Pembayaran</h1>
                        </div>
                        <div className='grid items-center text-end pr-3 col-span-1'>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                        </div>
                        <div className='grid space-y-2 col-span-9 items-center'>
                            <div>
                                <select onChange={formik.handleChange} className='py-[13px] px-[16px] border rounded w-full' name="patientId" value={formik.values.patientId}>
                                    <option value="">Pilih Pasien...</option>
                                    {Object.values(dataPasien).map((item, idx) => (
                                        <option  key={idx} value={item.id}>{item.fullname}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                 <Input onChange={handleSearchPoli} name={'date'} type={'date'} value={formik.values.date} />
                            </div>
                            <div>
                                <select onChange={formik.handleChange} className='py-[13px] px-[16px] border rounded w-full' name="jadwalDokterId"value={formik.values.jadwalDokterId}>
                                    <option value="">Pilih Poli Tujuan dan Jadwal Dokter...</option>
                                    {Object.values(dataDokter).map((item, idx) => (
                                        <option  key={idx} disabled={!item.isAvailable} value={item.id}>{item.namaDokter || '-'}, Poli {item.poli} - {item.hariKerja} - {item.jamMulai} sampai {item.jamSelesai}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select onChange={formik.handleChange} className='py-[13px] px-[16px] border rounded w-full' name="jenisPerawatan" value={formik.values.jenisPerawatan}>
                                <option value="">Pilih Jenis Perawatan</option>
                                <option value='IGD'>IGD</option>
                                <option value='Rawat Jalan'>Rawat Jalan</option>
                                <option value='Rawat Inap'>Rawat Inap</option>
                                </select>
                            </div>
                            <div>
                                <textarea className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]' onChange={formik.handleChange} name={'keluhan'} placeholder={'Keluhan'} type={'text'} />
                            </div>
                            <div>
                                <Input onChange={formik.handleChange} name={'pembayaran'} value={formik.values.pembayaran} className={'bg-slate-200 cursor-not-allowed'} readOnly={true} type={'text'} />
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
        <ModalDelete
            activeModal={showDeleteModal}
            buttonClose={() => setShowDeleteModal(!showDeleteModal)}
            submitButton={hapusPendaftaran}
        />
        <div className='bg-white flex gap-[32px] min-h-screen'>
                <Sidebar />
                <div className='w-full pb-10 pr-[32px]'>
                    <div className='flex items-start justify-between  pt-[40px] mb-4'>
                        <h1 className='text-4xl text-[#353A40] font-bold'>Antrian Reservasi</h1>
                        <h1>Navigasi / <span className='text-cyan font-medium'>Antrian Reservasi</span></h1>
                    </div>
                    <div className='mt-24'>
                        <Table data={dataReservasi} columns={kolomReservasi} />
                    </div>
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
