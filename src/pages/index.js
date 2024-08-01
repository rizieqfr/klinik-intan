import { Inter } from "next/font/google";
import Input from "@/components/input";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ClientRequest from "@/utils/clientApiService";
import { useState } from "react";


export default function Home() {
  const router = useRouter()
  const [dataLogin, setDataLogin] = useState([])
  const [showData, setShowData] = useState(false)
  const formik = useFormik({
    initialValues : {
      fullname: '',
      gender: '',
      phone: '',
      nik: '',
      date_birth: '',
      address: '',
      work: '',
    },
    onSubmit: async (values) => {
      try {
        await toast.promise(
          ClientRequest.CreatePasienNoToken(values).then((res) => {
            return res
          }),
          {
            loading: 'Processing...',
            success: (res) => {
              console.log(res)
              setDataLogin(res.data.data)
              setShowData(true)
              return "Berhasil Register Pasien"
            },
            error: (error) => {
              return error.response.data.message || 'Something went wrong!'
            }
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
  });
  
  return (
    <>
      <section className="bg-[#00A9AE] w-full px-[80px] py-[25px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-white">Klinik Nur Hidayah</h1>
          <div className="flex items-center gap-10">
            <button onClick={() => router.push('/')} className="text-lg font-bold underline text-white">Home</button>
            <button onClick={() => router.push('/jadwal-dokter')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Jadwal Praktek</button>
            <button onClick={() => router.push('/pasien-lama')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Pasien Lama</button>
          </div>
        </div>
      </section>
      <section className="bg-white h-full">
        <div className="flex items-center justify-center">
          <div className="py-10">
            <h1 className="text-4xl font-semibold mb-10">Pendaftaran Online Pasien Baru</h1>
            <div className="space-y-3">
              <Input name={'fullname'} onChange={formik.handleChange} placeholder={'Nama'}/>
              <div className="flex items-center gap-10 w-full">
                <div className="w-full">
                  <Input type={'text'} name={'phone'} onChange={formik.handleChange} placeholder={'Nomor Hp / Telepon'}/>
                </div>
                <div className="w-full">
                  <Input  name={'nik'} onChange={formik.handleChange} placeholder={'NIK'}/>
                </div>
              </div>
              <div>
                <h1 className='font-semibold mb-2'>Jenis Kelamin</h1>
                <select className="border outline-none w-full py-[13px] rounded-[8px] px-[16px]" type={'text'} name={'gender'} onChange={formik.handleChange} placeholder={'Jenis Kelamin'}>
                  <option value="Select Jenis Kelamin...">Select Jenis Kelamin...</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <Input type={'date'} name={'date_birth'} onChange={formik.handleChange} placeholder={'Tanggal Lahir'}/>
              <Input  name={'address'} onChange={formik.handleChange} placeholder={'Alamat'}/>
              <Input  name={'work'} onChange={formik.handleChange} placeholder={'Pekerjaan'}/>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button onClick={formik.handleSubmit} className="px-[40px] py-[20px] bg-[#0179FF] hover:bg-blue-700 text-white rounded-md shadow-md font-semibold">Daftar Sekarang</button>
            </div>
            <h1 className="text-center mt-6">Sudah pernah daftar sebelumnya? <span><button onClick={() => router.push('/auth/login')} className="font-semibold hover:underline">Login Sekarang</button></span></h1>
          </div>
        </div>
        {showData && (
          <div className='flex items-center justify-center pb-20 gap-10'>
          <div id='reservasiElement' className='rounded-xl py-10 border px-20 bg-[#00A9AE] shadow-lg text-white'>
              <div className='pb-3 border-b-2 mb-6 text-center font-semibold text-xl'>
                  <h1 className='font-bold'>Berhasil Mendaftar Sebagai Pasien!</h1>
                  <h1 className='text-base'>Berikut adalah data diri anda:</h1>
              </div>
              <div className='flex items-center justify-center'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-3 font-semibold '>
                        <h1>No. Rekam Medis</h1>
                        <h1>NIK</h1>
                    </div>
                    <div className='col-span-1 text-end pr-2'>
                        <h1>:</h1>
                        <h1>:</h1>
                    </div>
                    <div className='col-span-8 font-semibold'>
                        <p>{dataLogin?.nik || '-'}</p>
                        <p>{dataLogin?.no_rm || '-'}</p>
                    </div>
                </div>
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
          Cetak Data Akun Pasien
          </button>
      </div>
        )}
      </section>
    </>
  )
}
