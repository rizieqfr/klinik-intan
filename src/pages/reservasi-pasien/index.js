import Input from '@/components/input'
import ClientRequest from '@/utils/clientApiService'
import { useFormik } from 'formik'
import { debounce } from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function PasienLama() {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [showReservasi, setShowReservasi] = useState(false)
  const [dataDokter, setDataDokter] = useState('')
  const [dataReservasi, setDataReservasi] = useState('')

  useEffect(() => {
    formik.setFieldValue('date', date);
  }, [date])

  const formik = useFormik({
    initialValues: {
      jadwalDokterId: '',
      date: date,
      pembayaran: 'Umum',
      patientId : '',
      jenisPerawatan : '',
      keluhan : '',
    },
    onSubmit: async (value) => {
      try {
        await toast.promise(
          ClientRequest.CreateReservasi(localStorage.getItem('token-pasien') ,value).then((res) => {
            return res
          }),
          {
            loading: 'Loading...',
            success: (res) => {
              console.log(res, 'res sukses reservasi')
              setDataReservasi(res.data.data)
              setShowReservasi(!showReservasi)
              return 'Berhasil Reservasi!'
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

  const getDataPoli = async () => {
    try {
      const res = await ClientRequest.GetJadwalDokterAll(localStorage.getItem('token-pasien'), '', '', '')
      setDataDokter(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getFetch = async () => {
    try {
      const res = await ClientRequest.Fetch(localStorage.getItem('token-pasien'))
      formik.setFieldValue('patientId', res.data.id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchPoli = (e) => {
    setDate(e.target.value)
    debounceDataPoli(e.target.value)
  }

  const debounceDataPoli = debounce(async (keyword) => {
    try {
      const res = await ClientRequest.GetJadwalDokterAll('','','', keyword)
      console.log(res, 'res debounce')
      setDataDokter(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }, 500)

  useEffect(() => {
    if (localStorage.getItem('token-pasien') === null) {
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    getDataPoli()
    getFetch()
  }, [])

  return (
    <>
      <section className="bg-[#00A9AE] w-full px-[80px] py-[25px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-white">Klinik Nur Hidayah</h1>
          <div className="flex items-center gap-10">
            <button onClick={() => router.push('/')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Home</button>
            <button onClick={() => router.push('/jadwal-dokter')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Jadwal Praktek</button>
            <button onClick={() => router.push('/pasien-lama')} className="text-lg font-bold underline text-white">Pasien Lama</button>
          </div>
        </div>
      </section>
      <section className='bg-white h-screen '>
        <div className='flex items-center justify-center w'>
          <div className='py-20 text-md w-1/2 space-y-4'>
            <h1 className="text-4xl font-semibold mb-10">Reservasi Pasien</h1>
            <div className='space-y-3'>
              <Input  onChange={handleSearchPoli} name={'date'}  placeholder={'Tanggal Berobat'}  type={'date'}  value={formik.values.date} />
              <div>
                <h1 className='font-semibold mb-2'>Dokter & Poli Tujuan</h1>
                <select onChange={formik.handleChange} className='py-[13px] px-[16px] border rounded w-full' name="jadwalDokterId"value={formik.values.jadwalDokterId}>
                  <option value="">Pilih Poli Tujuan dan Jadwal Dokter...</option>
                  {Object.values(dataDokter).map((item, idx) => (
                    <option  key={idx} disabled={!item.isAvailable} value={item.id}>{item.namaDokter || '-'}, Poli {item.poli} - {item.hariKerja} - {item.jamMulai} sampai {item.jamSelesai}</option>
                  ))}
                </select>
              </div>
              <div>
                <h1 className='font-semibold mb-2'>Jenis Perawatan</h1>
                <select onChange={formik.handleChange} className='py-[13px] px-[16px] border rounded w-full' name="jenisPerawatan" value={formik.values.jenisPerawatan}>
                  <option value="">Pilih Jenis Perawatan</option>
                  <option value='IGD'>IGD</option>
                  <option value='Rawat Jalan'>Rawat Jalan</option>
                  <option value='Rawat Inap'>Rawat Inap</option>
                </select>
              </div>

              <div>
                <h1 className='font-semibold mb-2'>Keluhan</h1>
                <textarea className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]' onChange={formik.handleChange} name={'keluhan'} placeholder={'Keluhan'} type={'text'} />
              </div>
              
              <Input onChange={formik.handleChange} name={'pembayaran'} value={formik.values.pembayaran} placeholder={'Jenis Pembayaran'} className={'bg-slate-200 cursor-not-allowed'} readOnly={true} type={'text'} />
            </div>
            <div className="flex items-center justify-center pt-6">
              <button onClick={formik.handleSubmit} className="px-[40px] py-[20px] bg-[#0179FF] hover:bg-blue-700 text-white rounded-md shadow-md font-semibold">Reservasi</button>
            </div>
          </div>
        </div>
        {showReservasi === true && (
          <div className='flex items-center justify-center pb-20 gap-10'>
              <div id='reservasiElement' className='rounded-xl py-10 border px-20 bg-[#00A9AE] shadow-lg text-white'>
                  <div className='pb-3 border-b-2 mb-6 text-center font-semibold text-xl'>
                      <h1 className='font-bold'>Klinik Nur Hidayah Rengel Tuban</h1>
                      <h1 className='text-base'>Rengel Tuban Jawa Timur</h1>
                      <h1 className='text-base'>Jl. Raya Bengel No. 99 (Belakang Zam-Zam Mart)</h1>
                  </div>
                  <div className='flex items-center justify-center'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-3 font-semibold '>
                            <h1>Nama Pasien</h1>
                            <h1>No. Rekam Medis</h1>
                            <h1>Alamat</h1>
                            <h1>Tanggal Daftar</h1>
                            {/* <h1>Tanggal Reservasi</h1> */}
                            <h1>Dokter & Poli Tujuan</h1>
                            <h1>Jenis Pelayanan</h1>
                            <h1>Keluhan</h1>
                        </div>
                        <div className='col-span-1 text-end pr-2'>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                            {/* <h1>:</h1> */}
                            <h1>:</h1>
                            <h1>:</h1>
                            <h1>:</h1>
                        </div>
                        <div className='col-span-8 font-semibold'>
                            <p>{dataReservasi?.dataPatient?.fullname || '-'}</p>
                            <p>{dataReservasi?.dataPatient?.no_rm || '-'}</p>
                            <p>{dataReservasi?.dataPatient?.address || '-'}</p>
                            <p>{moment(dataReservasi?.date).format('DD-MM-YYYY') || '-'}</p>
                            {/* <p>Senin, 25 Juni 2024 / 10.24 WIB</p> */}
                            <p>{dataReservasi?.jadwalDokter?.namaDokter}, Poli {dataReservasi?.jadwalDokter?.poli}</p>
                            <p>{dataReservasi?.jenisPerawatan || '-'}</p>
                            <p>{dataReservasi?.keluhan || '-'}</p>
                        </div>
                    </div>
                  </div>
                  <h1 className='text-2xl font-bold text-center my-6'>Nomor Antrian Anda Adalah: </h1>
                  <h1 className='text-5xl font-bold text-center my-6'>1</h1>
                  <div>
                      <h1 className='text-xl text-center'>Budayakan antri untuk kenyamanan bersama.</h1>
                      <h1 className='text-xl text-center'>Terima kasih, semoga lekas sembuh😇</h1>
                  </div>
              </div>
              <button
                  className='mt-6 py-2 px-4 bg-red-500 text-white font-bold rounded'
                  onClick={() => {
                      const printContents = document.getElementById('reservasiElement').innerHTML;
                      const originalContents = document.body.innerHTML;
                      document.body.innerHTML = printContents;
                      window.print();
                      document.body.innerHTML = originalContents;
                  }}
              >
              Cetak Reservasi
              </button>
          </div>
        )}

      </section>
    </>
  )
}
