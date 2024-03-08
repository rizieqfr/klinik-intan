import Sidebar from '@/components/sidebar'
import React from 'react'

export default function DetailPasien() {
  return (
    <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full pr-[80px]'>
            <div className='flex items-center justify-between pt-[64px] mb-[32px]'>
                <h1 className='text-[32px] text-[#353A40] font-semibold'>Pasien</h1>
                <h1>Navigasi / Pasien / <span className='text-cyan font-medium'>Detail Pasien</span></h1>
            </div>
            <div className='bg-white py-[39px] px-[32px] rounded-2xl'>
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Detail Pasien</h1>
                <div className='flex items-start gap-[300px]'>
                    <div className='space-y-[16px] font-semibold'>
                        <h1>NIK: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Nama: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Jenis Kelamin: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Tanggal Lahir: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Pekerjaan: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                    </div>
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Kartu: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>No. Kartu: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Telepon: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Alamat: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                    </div>
                </div>
                <hr className='border my-[32px]'/>
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Daftar Rekam Medis</h1>
                
                <div className='space-y-[12px]'>
                    <div className='space-y-[12px] w-full'>
                        <div className='flex items-center w-full gap-[26px]'>
                            <h1 className='text-[24px] font-semibold'>1.</h1>
                            <div className='w-full'>
                                <h1 className='text-[16px] font-semibold'>12 Desember 2024</h1>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <h1 className='text-[#272C2D99]'>Jenis Pelayanan</h1>
                                        <h1>: Tusuk Jantung</h1>
                                    </div>
                                    <div className='flex items-center'>
                                        <h1 className='text-[#272C2D99]'>Keluhan</h1>
                                        <h1>: Gaada, pengen aja</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-end gap-4 w-full'>
                                <button className='bg-[#0080CC] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Detail</button>
                                <button className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Edit</button>
                                <button className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                            </div>
                        </div>
                        <hr className='border border-[#353A4066]'/>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
