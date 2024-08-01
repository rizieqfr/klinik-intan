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
import { useRouter } from 'next/router'
moment.locale('id');  // Set the locale to Indonesian


export default function PendaftaranRawatInap({accessToken}) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [dataReservasi, setDataReservasi] = useState('')
    const [dataDokter, setDataDokter] = useState('')
    const [dataPasien, setDataPasien] = useState('')
    const [date, setDate] = useState('')
    const [jenisPendaftaran, setJenisPendaftaran] = useState('')
    const [idPendaftaran, setIdPendaftaran] = useState('')
    const [dataDetailReservasi, setDataDetailReservasi] = useState()
    const [showDetailModal, setShowDetailModal] = useState(false)
    const router = useRouter()

    const openModalDetail = async (id) => {
        setShowDetailModal(!showDetailModal)
        try {
            const res = await ClientRequest.GetReservasiById(accessToken, id)
            console.log(res, 'resbyid')
            setDataDetailReservasi(res.data.data)
        } catch (error) {
            
        }
    }

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
            const res = await ClientRequest.GetReservasi(accessToken, 'rawat-jalan')
            setDataReservasi(res.data.data)
            console.log(res)
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
            console.log('pasien', res.data.data)
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
            accessorKey: 'no_rm',
            header: 'No. Rm'
        },
        {
            accessorKey: 'date',
            header: 'Hari Tanggal',
            cell: ({row}) => (
                <h1>{moment(row.original.date).format('dddd, D MMMM YYYY, [Pukul] HH:mm')}</h1>

            )
        },
        {
            accessorKey: 'fullname',
            header: 'Nama Pasien'
        },
        {
            accessorKey: 'namaPetugas',
            header: 'Nama Petugas'
        },
        {
            accessorKey: 'keluhan',
            header: 'Keluhan'
        },
        {
            accessorKey: 'namaDokter',
            header: 'Dokter'
        },
        {
            accessorKey: 'poli',
            header: 'Poli'
        },
        {
            accessorKey: 'pembayaran',
            header: 'Jenis Pembayaran'
        },
        {
            header: 'Status Pelayanan',
            cell: ({ row }) => (
                <div className='flex items-center justify-center gap-3'>
                    <h1 className={`font-semibold rounded-sm py-[3px] px-[14px] text-center text-sm text border ${row.original.statusPeriksa ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {row.original.statusPeriksa ? 'Sudah Dilayani' : 'Belum Dilayani'}
                    </h1>
                    <button onClick={() => actionHapusPendaftaran(row.original.id)} className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                    <button onClick={() => openModalDetail(row.original.id)} className='bg-blue-500 text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Detail</button>
                    <button onClick={() => router.push(`/reservasi/cetak/${row.original.id}`)} className='bg-yellow-500 text-white  rounded px-[14px] py-[3px] font-semibold text-sm'>Cetak</button>
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
          jenisPerawatan : 'rawat-jalan',
          keluhan : '',
        },
        onSubmit: async (value) => {
          try {
            await toast.promise(
              ClientRequest.CreateReservasi(accessToken ,value).then((res) => {
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
            console.log(value)
            toast.error(error.data.message)
          }
        }
    })
    const handleSearchPoli = (e) => {
        setDate(e.target.value)
        debounceDataPoli(e.target.value)
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
                        <button onClick={() => setShowDetailModal(!showDetailModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Close</button>
                    </div>

                </div>
            }
        />
        <Modal 
            activeModal={showAddModal}
            title={`Pendaftaran Pasien Rawat Jalan `}
            buttonClose={ () => setShowAddModal(!showAddModal)}
            width={'1000px'}
            content= {
                <div className=' w-full space-y-[12px]'>
                    
                        <div className='grid grid-cols-12 gap-y-8'>
                            <div className='grid space-y-2 col-span-2 items-center'>
                                <h1 className='text-[#353A40] font-semibold'>Pasien</h1>
                                <h1 className='text-[#353A40] font-semibold'>Tanggal Berobat</h1>
                                <h1 className='text-[#353A40] font-semibold'>Dokter & Poli Tujuan</h1>
                                <h1 className='text-[#353A40] font-semibold'>Keluhan</h1>
                                <h1 className='text-[#353A40] font-semibold'>Jenis Pembayaran</h1>
                            </div>
                            <div className='grid items-center text-end pr-3 col-span-1'>
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
                                    <textarea className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]' onChange={formik.handleChange} name={'keluhan'} placeholder={'Keluhan'} type={'text'} />
                                </div>
                                <div>
                                    <Input onChange={formik.handleChange} name={'pembayaran'} value={formik.values.pembayaran} className={'bg-slate-200 cursor-not-allowed'} readOnly={true} type={'text'} />
                                </div>
                            </div>
                        </div>
                    

                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                        <button onClick={formik.handleSubmit} className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Tambah</button>
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
                        <h1 className='text-4xl text-[#353A40] font-bold'>Pendaftaran Pasien Rawat Jalan</h1>
                        <h1>Navigasi / <span className='text-cyan font-medium'>Pendaftaran Pasien Rawat Jalan</span></h1>
                    </div>
                    <div className='flex items-center justify-end '>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                            <FaCirclePlus className='text-xl' />
                            <h1>Daftar Pasien Rawat Jalan</h1>
                        </button>
                    </div>
                    <Table data={dataReservasi} columns={kolomReservasi} />
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
