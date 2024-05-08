import Input from '@/components/input'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'

export default function PasienLama() {
  const router = useRouter()
  const formik = useFormik({
    initialValues:{
      'nik': '',
      'nomorRm': '',
    },
    onSubmit: (value) => {
      console.log('data', value)
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
                    <Input onChange={formik.handleChange} name={'nomorRm'} placeholder={'Nomor Rekam Medis'} type={'number'} />
                    <Input onChange={formik.handleChange} name={'nik'} placeholder={'NIK'} type={'number'} />
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
