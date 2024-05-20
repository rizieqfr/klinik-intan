import Table from '@/components/Table'
import Sidebar from '@/components/sidebar'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import { useRouter } from 'next/router'
import React from 'react'

export default function DetailPasien() {
    const route = useRouter()
    const kolomRM = [
        {
            header: 'No.',
            accessorKey: 'id',
            cell: ({row}) => (
                <div>{row.original.id}.</div>
            )
        },
        {
            header: 'Tanggal',
            accessorKey: 'tanggal',
        },
        {
            header: 'Jenis Pelayanan',
            accessorKey: 'nik',
        },
        {
            header: 'Keluhan',
            accessorKey: 'alamat',
        },
        
    ]
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
                        <h1>Nomor Rekam Medis: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>NIK: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Nama: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Jenis Kelamin: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Tanggal Lahir: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                    </div>
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Pekerjaan: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Telepon: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                        <h1>Alamat: <span className='text-slate-500 font-normal'>Lorem ipsum dolor sit.</span></h1>
                    </div>
                </div>
                <hr className='border my-[32px]'/>
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Daftar Rekam Medis</h1>
                <Table data={''} columns={kolomRM}/>

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
		props: {}
	})
})