import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "./auth/login";
import Input from "@/components/input";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  const formik = useFormik({
    initialValues : {
      'name': '',
      'alamat': '',
      'telepon': '',
      'nik': '',
      'tanggalLahir': '',
      'alamat': '',
      'pekerjaan': '',
    },
    onSubmit: (values) => {
      console.log('data yang terisi', values)
    }

  })
  return (
    <>
      <section className="bg-[#00A9AE] w-full px-[80px] py-[38px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-semibold text-white">Klinik Intan Husada</h1>
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
              <Input name={'name'} onChange={formik.handleChange} placeholder={'Nama'}/>
              <Input name={'alamat'} onChange={formik.handleChange} placeholder={'Alamat'}/>
              <div className="flex items-center gap-10 w-full">
                <div className="w-full">
                  <Input name={'telepon'} onChange={formik.handleChange} placeholder={'Nomor Hp / Telepon'}/>
                </div>
                <div className="w-full">
                  <Input type={'number'} name={'nik'} onChange={formik.handleChange} placeholder={'NIK'}/>
                </div>
              </div>
              <Input type={'date'} name={'tanggalLahir'} onChange={formik.handleChange} placeholder={'Tanggal Lahir'}/>
              <Input  name={'alamat'} onChange={formik.handleChange} placeholder={'Alamat'}/>
              <Input  name={'pekerjaan'} onChange={formik.handleChange} placeholder={'Pekerjaan'}/>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button onClick={formik.handleSubmit} className="px-[40px] py-[20px] bg-[#0179FF] hover:bg-blue-700 text-white rounded-md shadow-md font-semibold">Daftar Sekarang</button>
            </div>
            <h1 className="text-center mt-6">Sudah pernah daftar sebelumnya? <span><button className="font-semibold hover:underline">Login Sekarang</button></span></h1>
          </div>
        </div>
      </section>
    </>
  )
}
