import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import React from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


export default function Pelaporan({dataPasien, dataRekamMedis, dataPembayaran, dataDokter}) {

    console.log(dataPasien, 'data pasien')
    console.log(dataRekamMedis, 'data RekamMedis')
    const exportRekamMedis = () => {
        const Headers = ['Nama Lengkap', 'Tanggal Pembuatan RM', 'Jenis Pelayanan', 'Keluhan', 'Diagnosa', 'Kode Diagnosa', 'Tindakan'];
        const rekamMedis = dataRekamMedis.map(({ fullname, createdAt, pelayanan, keluhan, diagnosa, kode_diagnosa, tindakan,}) => ({
            'Nama Lengkap': fullname ? fullname : '-',
            'Tanggal Pembuatan RM': createdAt ? createdAt : '-',
            'Jenis Pelayanan': pelayanan? pelayanan : '-',
            'Keluhan': keluhan? keluhan : '-',
            'Diagnosa': diagnosa? diagnosa : '-',
            'Kode Diagnosa': kode_diagnosa? kode_diagnosa : '-',
            'Tindakan': tindakan? tindakan : '-',
        }));
        const worksheetGrade = XLSX.utils.json_to_sheet(rekamMedis, { header: Headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetGrade, 'Rekam Medis');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'Rekap Data Rekam Medis.xlsx');
    };
    const exportPasien = () => {
        const Headers = ['NIK', 'No Rekam Medis', 'Nama Pasien', 'Jenis Kelamin','Tanggal Lahir','Telepon','Alamat','Pekerjaan','Status Perkawainan', 'Riwayat Alergi Obat', 'Riwayat Alergi Makanan', 'Riwayat Alergi Lainnya'];
        const rekamMedis = dataPasien.map(({ nik, no_rm, fullname, gender, date_birth, phone, address, work, statusPerkawinan, riwayatAlergiObat, riwayatAlergiMakanan, riwayatAlergiLainya}) => ({
            'NIK': nik ? nik : '-',
            'No Rekam Medis': no_rm ? no_rm : '-',
            'Nama Pasien': fullname ? fullname : '-',
            'Jenis Kelamin': gender ? gender : '-',
            'Tanggal Lahir': date_birth ? date_birth : '-',
            'Telepon': phone ? phone : '-',
            'Alamat': address ? address : '-',
            'Pekerjaan': work ? work : '-',
            'Status Perkawainan': statusPerkawinan ? statusPerkawinan : '-',
            'Riwayat Alergi Obat': riwayatAlergiObat ? riwayatAlergiObat : '-',
            'Riwayat Alergi Makanan': riwayatAlergiMakanan ? riwayatAlergiMakanan : '-',
            'Riwayat Alergi Lainnya': riwayatAlergiLainya ? riwayatAlergiLainya : '-',
        }));
        const worksheetGrade = XLSX.utils.json_to_sheet(rekamMedis, { header: Headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetGrade, 'Pasien');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'Rekap Data Pasien.xlsx');
    };
  return (
    <div className='bg-white flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full pr-[32px]'>
            <div className='flex items-center justify-between py-[40px]'>
                <h1 className='text-4xl text-[#353A40] font-bold'>Pelaporan</h1>
                <h1>Navigasi / <span className='text-cyan font-medium'>Pelaporan</span></h1>
            </div>
            <div className='space-y-3'>
                <button onClick={exportPasien} className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                    Rekap Data Pasien
                </button>
                <button onClick={exportRekamMedis} className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                    Rekap Data Rekam Medis
                </button>
                <button className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                    Rekap Data Dokter
                </button>
                <button className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                    Rekap Data Pembayaran
                </button>
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedIn = !!accessToken
    const resPasien = await ClientRequest.GetPasien(accessToken)
    const resRekamMedis = await ClientRequest.GetRekamMedis(accessToken)
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
            dataPasien: resPasien.data.data,
            dataRekamMedis: resRekamMedis.data.data,
            
        }
	})
})