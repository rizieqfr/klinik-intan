import Table from '@/components/Table'
import { useRouter } from 'next/router'
import React from 'react'

const kolomJadwalDokter = [
    {
        header: 'No Rm',
        accessorKey: 'no_rm',
        cell: ({row}) => (
            <div>{row.original.no_rm}</div>
        )
    },
    {
        header: 'Nama',
        accessorKey: 'fullname',
    },
    {
        header: 'NIK',
        accessorKey: 'nik',
    },
    {
        header: 'Alamat',
        accessorKey: 'address',
    }
]

export default function JadwalDokter() {
    const router = useRouter()
    return (
        <>
            <section className="bg-[#00A9AE] w-full px-[80px] py-[25px]">
                <div className="flex items-center justify-between">
                <h1 className="text-[32px] font-bold text-white">Klinik Intan Husada</h1>
                <div className="flex items-center gap-10">
                    <button onClick={() => router.push('/')} className="text-lg font-semibold text-white hover:font-bold hover:underline">Home</button>
                    <button onClick={() => router.push('/jadwal-dokter')} className="text-lg font-bold underline text-white ">Jadwal Praktek</button>
                    <button onClick={() => router.push('/pasien-lama')} className="text-lg font-semibold  text-white hover:font-bold hover:underline">Pasien Lama</button>
                </div>
                </div>
            </section>
            <section className='bg-white h-screen flex items-start justify-center'>
                <div className='py-10'>
                    <h1 className="text-4xl font-semibold mb-10 text-center">Jadwal Dokter</h1>
                    {/* Tanstack Table */}
                    <Table data={''} columns={kolomJadwalDokter} />

                </div>
            </section>
        </>
    )
}
