import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Pelaporan({dataPasien, dataRekamMedis, dataPembayaran, dataDokter}) {
    const [rekamMedis, setRekamMedis] = useState([])
    const [pasien, setPasien] = useState([])
    const [pembayaran, setPembayaran] = useState([])
    const [dokter, setDokter] = useState([])
    
    const exportDataPayment = () => {
        const Headers = ['ID Invoice', 'Nama Pasien', 'Tanggal', 'Biaya Layanan', 'Biaya Obat', 'Total Pembayaran', 'Status Pembayaran'];
        const pembayaranData = pembayaran.map(({ invoice, fullname, createdAt, purchased, total_payment, status}) => ({
            'ID Invoice': invoice ? invoice : '-',
            'Nama Pasien': fullname ? fullname : '-',
            'Tanggal': createdAt ? createdAt : '-',
            'Biaya Layanan': purchased? purchased.biayaLayanan : '-',
            'Biaya Obat': purchased? purchased.biayaObat : '-',
            'Total Pembayaran': total_payment? total_payment : '-',
            'Status Pembayaran': status? status : '-',
        }));
        const worksheetGrade = XLSX.utils.json_to_sheet(pembayaranData, { header: Headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetGrade, 'Pembayaran');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'Rekap Data Pembayaran.xlsx');
    };
    const exportDataDokter = () => {
        const Headers = ['Nama Dokter', 'Poli', 'Hari Kerja', 'Jam Mulai', 'Jam Selesai'];
        const dokterData = dokter.map(({ namaDokter, poli, hariKerja, jamMulai, jamSelesai}) => ({
            'Nama Dokter': namaDokter ? namaDokter : '-',
            'Poli': poli ? poli : '-',
            'Hari Kerja': hariKerja? hariKerja : '-',
            'Jam Mulai': jamMulai? jamMulai : '-',
            'Jam Selesai': jamSelesai? jamSelesai : '-',
        }));
        const worksheetGrade = XLSX.utils.json_to_sheet(dokterData, { header: Headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetGrade, 'Dokter');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'Rekap Data Dokter.xlsx');
    };
    const exportRekamMedis = () => {
        const Headers = ['Nama Lengkap', 'Tanggal Pembuatan RM', 'Jenis Pelayanan', 'Keluhan', 'Diagnosa', 'Kode Diagnosa', 'Tindakan'];
        const rekamMedisData = rekamMedis.map(({ fullname, createdAt, pelayanan, keluhan, diagnosa, kode_diagnosa, tindakan,}) => ({
            'Nama Lengkap': fullname ? fullname : '-',
            'Tanggal Pembuatan RM': createdAt ? createdAt : '-',
            'Jenis Pelayanan': pelayanan? pelayanan : '-',
            'Keluhan': keluhan? keluhan : '-',
            'Diagnosa': diagnosa? diagnosa : '-',
            'Kode Diagnosa': kode_diagnosa? kode_diagnosa : '-',
            'Tindakan': tindakan? tindakan : '-',
        }));
        const worksheetGrade = XLSX.utils.json_to_sheet(rekamMedisData, { header: Headers });
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
        const pasienData = pasien.map(({ nik, no_rm, fullname, gender, date_birth, phone, address, work, statusPerkawinan, riwayatAlergiObat, riwayatAlergiMakanan, riwayatAlergiLainya}) => ({
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
        const worksheetGrade = XLSX.utils.json_to_sheet(pasienData, { header: Headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetGrade, 'Pasien');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'Rekap Data Pasien.xlsx');
    };

    const diagnosisCounts = dataRekamMedis.reduce((acc, item) => {
        acc[item.kode_diagnosa] = (acc[item.kode_diagnosa] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(diagnosisCounts),
        datasets: [
            {
                label: 'Jumlah Diagnosis',
                data: Object.values(diagnosisCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    useEffect(() => {
        setRekamMedis(dataRekamMedis)
        setPasien(dataPasien)
        setPembayaran(dataPembayaran)
        setDokter(dataDokter)
    }, [dataRekamMedis, dataPasien, dataPembayaran ,dataDokter])


  return (
    <div className='bg-white flex gap-[32px] min-h-screen'>
        <Sidebar />
        <div className='w-full pr-[32px] pb-10'>
            <div className='flex items-center justify-between py-[40px]'>
                <h1 className='text-4xl text-[#353A40] font-bold'>Pelaporan</h1>
                <h1>Navigasi / <span className='text-cyan font-medium'>Pelaporan</span></h1>
            </div>

            <div className='border-2 rounded-lg shadow-xl p-4 w-fit flex items-center justify-center'>
                <div>
                    <div className='flex items-center justify-center'>
                        <div className='w-52 h-52  mb-12'>
                            <h1 className='text-center font-semibold text-lg mb-2'>Data Diagnosis Pasien</h1>
                            <Pie data={chartData} />
                        </div>
                    </div>

                    <table className='w-fit space-y-[10px]'>
                        <thead>
                            <tr className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                <th className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                    <h1 className='text-black text-xs font-semibold'>No</h1>
                                </th>
                                <th className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                </th>
                                <th className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-black text-xs font-semibold'>Kode Diagnosis</h1>
                                </th>
                                <th className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-black text-xs font-semibold'>Diagnosis</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rekamMedis.map((item, idx) => (
                                <tr key={idx} className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                    <td className='min-w-[100px] max-w-[100px]'>
                                        <h1 className='text-xs font-[600]'>{idx + 1}.</h1>
                                    </td>
                                    <td className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-xs font-[600]'>{item.fullname}</h1>
                                    </td>
                                    <td className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-xs font-[600]'>{item.kode_diagnosa}</h1>
                                    </td>
                                    <td className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-xs font-[600]'>{item.diagnosa}</h1>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <div className='border-2 rounded-xl shadow-xl bg-white p-4 mt-10'>
                <h1 className='text-4xl text-[#353A40] font-bold mb-[40px]'>Rekap Data</h1>
                <div className='space-y-3 mt-10'>
                    <button onClick={exportPasien} className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                        Rekap Data Pasien
                    </button>
                    <button onClick={exportRekamMedis} className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                        Rekap Data Rekam Medis
                    </button>
                    <button onClick={exportDataDokter} className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                        Rekap Data Dokter
                    </button>
                    <button onClick={exportDataPayment} className=' px-[12px] py-[8px]  bg-[#17A2B7] text-white flex items-center justify-center rounded-md font-semibold text-sm '>
                        Rekap Data Pembayaran
                    </button>
                </div>
            
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
    const resJadwalDokter = await ClientRequest.GetJadwalDokterAll('','','','')
    const resPembayaran = await ClientRequest.GetPayment(accessToken, '', '')
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
            dataPasien: resPasien.data.data,
            dataRekamMedis: resRekamMedis.data.data,
            dataDokter: resJadwalDokter.data.data,
            dataPembayaran: resPembayaran.data.data
            
        }
	})
})