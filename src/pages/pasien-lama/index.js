import Input from '@/components/input'
import ClientRequest from '@/utils/clientApiService'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'

export default function PasienLama() {
  const router = useRouter()
  const formik = useFormik({
    initialValues:{
      'nik': '',
      'no_rm': '',
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
              localStorage.setItem('token-pasien', res.data.accessToken)
              router.push('/reservasi-pasien')
              return 'Login Berhasil! Silahkan Pilih Jadwal Untuk Reservasi'
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
        <section className='bg-white h-screen'>
            <div className='flex items-center justify-center'>
                <div className='py-20 text-md w-1/2 space-y-4'>
                  <h1 className="text-4xl font-semibold mb-10">Pendaftaran Online (Pasien Lama)</h1>
                  <p>Jika anda pasien lama atau pernah berobat sebelumnya, silahkan menggunakan nomor rekam medis dan NIK(nomor KTP) anda untuk login.</p>
                  <p c>Jika Anda pasien baru dan belum pernah periksa sebelumnya, silahkan tekan tombol &quot;home&quot; untuk melakukan pendaftaran online di menu utama portal  ini.</p>
                  <div className='space-y-3'>
                    <Input onChange={formik.handleChange} name={'no_rm'} placeholder={'Nomor Rekam Medis'} type={'text'} />
                    <Input onChange={formik.handleChange} name={'nik'} placeholder={'NIK'} type={'text'} />
                  </div>
                <div className="flex items-center justify-center pt-6">
                  <button onClick={formik.handleSubmit} className="px-[40px] py-[20px] bg-[#0179FF] hover:bg-blue-700 text-white rounded-md shadow-md font-semibold">Log in</button>
                </div>
                </div>
            </div>
        </section>
    </>
  )
}
