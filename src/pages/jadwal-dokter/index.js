import Table from '@/components/Table'
import ClientRequest from '@/utils/clientApiService'
import { toNumber } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'

const kolomJadwalDokter = [
    {
        header: 'No.',
        cell: (row) => (
          <h1>
            {parseInt(row.row.id) + 1}.
          </h1>
        )
    },
    {
        header: 'Nama Dokter',
        accessorKey: 'namaDokter',
    },
    {
        header: 'Poli',
        accessorKey: 'poli',
    },
    {
        header: 'Hari Kerja',
        accessorKey: 'hariKerja',
    },
    {
        header: 'Jam Mulai',
        accessorKey: 'jamMulai',
    },
    {
        header: 'Jam Selesai',
        accessorKey: 'jamSelesai',
    },
]

export default function JadwalDokter({dataDokter}) {

    const router = useRouter()
    return (
        <>
            <section className="bg-[#00A9AE] w-full px-[80px] py-[25px]">
                <div className="flex items-center justify-between">
                <h1 className="text-[32px] font-bold text-white">Klinik Nur Hidayah</h1>
                <div className="flex items-center gap-10">
                    <button onClick={() => router.push('/')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Home</button>
                    <button onClick={() => router.push('/jadwal-dokter')} className="text-lg font-bold underline text-white ">Jadwal Praktek</button>
                    <button onClick={() => router.push('/pasien-lama')} className="text-lg font-semibold  text-white hover:font-bold hover:underline">Pasien Lama</button>
                </div>
                </div>
            </section>
            <section className='bg-white h-screen  w-full px-20'>
                <div className='py-10'>
                    <h1 className="text-4xl font-semibold mb-10 text-center">Jadwal Dokter dan Poli Klinik Nur Hidayah</h1>
                    <Table data={dataDokter} columns={kolomJadwalDokter} />

                </div>
            </section>
        </>
    )
}

export const getServerSideProps = async () => {
    const res = await ClientRequest.GetJadwalDokterAll('','','', '')
    return{
        props: {
            dataDokter: res.data.data
        }
    }
}
