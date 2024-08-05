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
    console.log(data, 'dataDetailRM')
    const route = useRouter()
    // const purchasedData = JSON.parse(data.data.transaction.purchased);
  return (
    <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full pr-[80px]'>
            <div className='flex items-center justify-between pt-[64px] mb-[32px]'>
                <h1 className='text-[32px] text-[#353A40] font-semibold'>Rekam Medis</h1>
                <h1>Navigasi / Rekam Medis / <span className='text-cyan font-medium'>Detail Rekam Medis</span></h1>
            </div>
            <div className='bg-white py-[39px] px-[32px] rounded-2xl mb-10'>
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Pasien {data.data.fullname}</h1>
                {/* <div className='flex items-start gap-[300px]'> */}
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Nomor Rekam Medis: <span className='text-slate-500 font-normal'>{data.data.no_rm}</span></h1>
                        <h1>NIK: <span className='text-slate-500 font-normal'>{data.data.nik}</span></h1>
                        <h1>Nama: <span className='text-slate-500 font-normal'>{data.data.fullname}</span></h1>
                        <h1>Jenis Kelamin: <span className='text-slate-500 font-normal'>{data.data.gender}</span></h1>
                    </div>
                    
                {/* </div> */}
                <hr className='border my-[32px]'/>
            </div>
            <div className='bg-white py-[39px] px-[32px] rounded-2xl mb-10'>
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Detail Rekam Medis Tanggal {moment(data.data.createdAt).format('DD MMMM YYYY')}</h1>
                {/* <div className='flex items-start gap-[300px]'> */}
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Keluhan: <span className='text-slate-500 font-normal'>{data.data.keluhan}</span></h1>
                        <h1>Pelayanan: <span className='text-slate-500 font-normal'>{data.data.pelayanan}</span></h1>
                        <h1>Diagnosa: <span className='text-slate-500 font-normal'>{data.data.diagnosa}</span></h1>
                        <h1>Kode Diagnosa: <span className='text-slate-500 font-normal'>{data.data.kode_diagnosa}</span></h1>
                        <h1>Tindakan: <span className='text-slate-500 font-normal'>{ data.data.tindakan}</span></h1>
                        <h1>Obat: <span className='text-slate-500 font-normal'>{data.data?.obat?.map(cat => cat.name).join(', ')}</span></h1>
                    </div>
                {/* </div> */}
                <hr className='border my-[32px]'/>
            </div>
            <div className='bg-white py-[39px] px-[32px] rounded-2xl'>
                <h1 className='text-[24px] text-[#353A40] font-semibold mb-[32px]'>Status Pembayaran</h1>
                {/* <div className='flex items-start gap-[300px]'> */}
                    <div className='space-y-[16px] font-semibold'>
                        <h1>Id Transaksi: <span className='text-slate-500 font-normal'>{data.data.invoiceId || '-'}</span></h1>
                        <h1>Tanggal: <span className='text-slate-500 font-normal'>{moment(data.data.createdAt).format('DD MM YYYY')}</span></h1>
                        <h1>Pelayanan: <span className='text-slate-500 font-normal'>{data.data.pelayanan}</span></h1>
                        <div className='w-full'>
                            <h1 className='mb-4'>Biaya:</h1>
                            <div className='border rounded-md p-4 w-full'>
                                <p className='border-b py-3'>Biaya Layanan: <span className='text-slate-500 font-normal '>Rp. {data.data.purchased.biayaLayanan}</span></p>
                                <p className='border-b py-3'>Biaya Obat: <span className='text-slate-500 font-normal'>Rp. {data.data.purchased.biayaObat}</span></p>
                                <h1 className='border-b py-3'>Total Pembayaran: <span className='text-slate-500 font-normal'>Rp. {data.data.total_payment}</span></h1>
                            </div>
                        </div>
                        <h1>Status: <span className='text-slate-500 font-normal'>{data.data.status}</span></h1>
                    </div>
                {/* </div> */}
                <hr className='border my-[32px]'/>
            </div>
        </div>
    </div>
  )
}
export const getServerSideProps = withSession(async ({ req, params }) => {
    const {id} = params
	const accessToken = req.session?.auth?.access_token
    const res = await ClientRequest.GetRekamMedisById(accessToken, id)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
            data: res.data.data
        }
	})
})