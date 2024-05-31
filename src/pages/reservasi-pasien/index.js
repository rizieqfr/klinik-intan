import Input from '@/components/input'
import ClientRequest from '@/utils/clientApiService'
import { useFormik } from 'formik'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function PasienLama() {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [showReservasi, setShowReservasi] = useState(false)
  
  useEffect(() => {
    formik.setFieldValue('date', date)
  }, [date])

  const formik = useFormik({
    initialValues: {
      'poliTujuan': '',
      'date': date,
    },
    onSubmit: async (value) => {
      try {
        toast.promise(
          ClientRequest.LoginPasien(value).then((res) => {
            return res
          }),
          {
            loading: 'Loading...',
            success: (res) => {
              console.log(res, 'res success')
              setShowReservasi(!showReservasi)
              return 'Berhasil Login!'
            },
            error: (error) => {
              console.log(error, 'res failed')
              return `${error.response.data.msg}`
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
      const res = await ClientRequest.GetJadwalDokter(localStorage.getItem('token-pasien'), '')
      // Handle the response as needed
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
      const res = await ClientRequest.GetJadwalDokter(localStorage.getItem('token-pasien'), keyword)
      // Handle the response as needed
    } catch (error) {
      console.log(error)
    }
  }, 500)

  useEffect(() => {
    if (localStorage.getItem('token-pasien') === null) {
      router.push('/')
    }
  }, [router])

  return (
    <>
      <section className="bg-[#00A9AE] w-full px-[80px] py-[25px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-white">Klinik Intan Husada</h1>
          <div className="flex items-center gap-10">
            <button onClick={() => router.push('/')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Home</button>
            <button onClick={() => router.push('/jadwal-dokter')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Jadwal Praktek</button>
            <button onClick={() => router.push('/pasien-lama')} className="text-lg font-bold underline text-white">Pasien Lama</button>
          </div>
        </div>
      </section>
      <section className='bg-white h-screen '>
        <div className='flex items-center justify-center'>
          <div className='py-20 text-md w-1/2 space-y-4'>
            <h1 className="text-4xl font-semibold mb-10">Reservasi Pasien</h1>
            <div className='space-y-3'>
              <Input 
                onChange={(e) => {
                  handleSearchPoli(e)
                  formik.handleChange(e)
                }} 
                name={'date'} 
                placeholder={'Tanggal Berobat'} 
                type={'date'} 
                value={formik.values.date}
              />
              <div>
                <h1 className='font-semibold mb-2'>Poli Tujuan</h1>
                <select 
                  onChange={formik.handleChange} 
                  className='py-[13px] px-[16px] border rounded w-full' 
                  name="poliTujuan"
                  value={formik.values.poliTujuan}
                >
                  <option value="">Pilih Poli Tujuan dan Jadwal Dokter...</option>
                  <option value="Poli A">Poli A</option>
                  <option value="Poli B">Poli B</option>
                  {/* Add other options as necessary */}
                </select>
              </div>
              <Input onChange={formik.handleChange} name={'jenisPembayaran'} value={'Umum'} placeholder={'Jenis Pembayaran'} className={'bg-slate-200 cursor-not-allowed'} readOnly={true} type={'text'} 
              />
            </div>
            <div className="flex items-center justify-center pt-6">
              <button onClick={formik.handleSubmit} className="px-[40px] py-[20px] bg-[#0179FF] hover:bg-blue-700 text-white rounded-md shadow-md font-semibold">Reservasi</button>
            </div>
          </div>
        </div>
        {showReservasi === true && (
          <div className='flex items-center justify-center pb-20'>
            <div className='rounded py-10 border px-20 bg-[#00A9AE] shadow-lg text-white space-y-5'>
              <h1 className='text-xl font-bold text-center'>Berhasil Reservasi!</h1>
              <p>Kode booking anda adalah: PX1134</p>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
