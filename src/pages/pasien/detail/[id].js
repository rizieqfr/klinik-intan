import Table from '@/components/Table'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import 'moment/locale/id';  // Import the Indonesian locale

moment.locale('id');  // Set the locale to Indonesian
export default function DetailPasien(data) {
    const route = useRouter()
    const dataRekamMedis = data.data.medical_records
    console.log(data, 'dataDetail')
    const kolomRM = [
        {
            header: 'No',
            accessorKey: 'id',
            cell: ({row}) => (
                <div>{row.index + 1}.</div>
            )
        },
        {
            header: 'Tanggal',
            accessorKey: 'createdAt',
            cell: ({ row }) => {
                const date = moment(row.original.createdAt).format('dddd, D MMMM YYYY');
                return <div>{date}</div>;
            }
        },
        {
            header: 'Jenis Pelayanan',
            accessorKey: 'pelayanan',
        },
        {
            header: 'Keluhan',
            accessorKey: 'keluhan',
        },
        {
            header: 'Tindakan',
            accessorKey: 'tindakan',
        },
        {
            header: 'Diagnosa',
            accessorKey: 'diagnosa',
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
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Detail Pasien {data.data.fullname}</h1>
                <div className='flex items-start gap-[50px]'>
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Nomor Rekam Medis: <span className='text-slate-500 font-normal'>{data.data.no_rm}</span></h1>
                        <h1>NIK: <span className='text-slate-500 font-normal'>{data.data.nik}</span></h1>
                        <h1>Nama: <span className='text-slate-500 font-normal'>{data.data.fullname}</span></h1>
                        <h1>Jenis Kelamin: <span className='text-slate-500 font-normal'>{data.data.gender}</span></h1>
                        <h1>Tanggal Lahir: <span className='text-slate-500 font-normal'>{ moment(data.data.date_birth).format('dddd, D MMMM YYYY')}</span></h1>
                        <h1>Agama: <span className='text-slate-500 font-normal'>{data.data.agama}</span></h1>
                    </div>
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Pekerjaan: <span className='text-slate-500 font-normal'>{data.data.work}</span></h1>
                        <h1>Telepon: <span className='text-slate-500 font-normal'>{data.data.phone}</span></h1>
                        <h1>Alamat: <span className='text-slate-500 font-normal'>{data.data.address}</span></h1>
                    </div>
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Alergi Obat: <span className='text-slate-500 font-normal'>{data.data.riwayatAlergiObat}</span></h1>
                        <h1>Alergi Makanan: <span className='text-slate-500 font-normal'>{data.data.riwayatAlergiMakanan}</span></h1>
                        <h1>Alergi Lainnya: <span className='text-slate-500 font-normal'>{data.data.riwayatAlergiLainya}</span></h1>
                    </div>
                </div>
                <hr className='border my-[32px]'/>
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Daftar Rekam Medis</h1>
                <Table data={dataRekamMedis} columns={kolomRM}/>

            </div>
        </div>
    </div>
  )
}
export const getServerSideProps = withSession(async ({ req, params }) => {
    const {id} = params
	const accessToken = req.session?.auth?.access_token
    const res = await ClientRequest.GetPasienById(accessToken, id)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
            data: res.data.data
        }
	})
})