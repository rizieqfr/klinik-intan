// import { html2pdf } from 'html2pdf.js';
import ClientRequest from '@/utils/clientApiService';
import routeGuard from '@/utils/routeGuard';
import { withSession } from '@/utils/sessionWrapper';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


export default function CetakRekamMedis({dataRekamMedis}) {

    console.log(dataRekamMedis)
  return (
    <div>
        <div className='flex items-center justify-center mt-8'>
            <button
                className=' py-2 px-4 bg-red-500 text-white font-bold rounded '
                onClick={() => {
                    const printContents = document.getElementById('invoiceElement').innerHTML;
                    const originalContents = document.body.innerHTML;
                    document.body.innerHTML = printContents;
                    window.print();
                    document.body.innerHTML = originalContents;
                }}
            > Cetak Rekam Medis</button>
        </div>
        <div id='invoiceElement' className='m-20 p-10 border-4 rounded-xl '>
            <div className='flex items-center justify-center'>
                <div className='pb-3 border-b-2 mb-6 text-center font-semibold text-xl w-full'>
                      <h1 className='font-bold'>Klinik Nur Hidayah Rengel Tuban</h1>
                      <h1 className='text-base'>Rengel Tuban Jawa Timur</h1>
                      <h1 className='text-base'>Jl. Raya Bengel No. 99 (Belakang Zam-Zam Mart)</h1>
                  </div>
            </div>
            <h1 className='text-xl text-center font-semibold mb-10'>Data Tindakan Pelayanan Pasien</h1>
            {/* <h1 className='text-center'>ID: {dataRekamMedis?.invoice}</h1> */}

            <div className='grid grid-cols-12'>
                <div className='col-span-2 space-y-4 font-semibold'>
                    <h1>No Rekam Medis</h1>
                    <h1>Nama Pasien</h1>
                    <h1>Jenis Kelamin</h1>
                    <h1>Tanggal Lahir</h1>
                    <h1>Pelayanan</h1>
                    <h1>Alergi Makanan</h1>
                    <h1>Alergi Obat</h1>
                    <h1>Alergi Lainnya</h1>
                    <h1>Keluhan</h1>
                    <h1>Diagnosa</h1>
                    <h1>Tindakan</h1>
                    <h1>Obat</h1>
                </div>
                <div className='col-span-1 space-y-4'>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                    <h1>:</h1>
                </div>
                <div className='col-span-9 space-y-4'>
                    <h1>{dataRekamMedis.no_rm}</h1>
                    <h1>{dataRekamMedis.fullname} </h1>
                    <h1>{dataRekamMedis.gender}</h1>
                    <h1>{dataRekamMedis.date_birth || '-'}</h1>
                    <h1>{dataRekamMedis.pelayanan || '-'} </h1>
                    <h1>{dataRekamMedis.riwayatAlergiMakanan || '-'}</h1>
                    <h1>{dataRekamMedis.riwayatAlergiObat || '-'}</h1>
                    <h1>{dataRekamMedis.riwayatAlergiLainya || '-'}</h1>
                    <h1>{dataRekamMedis.keluhan || '-'}</h1>
                    <h1>{dataRekamMedis.diagnosa || '-'}</h1>
                    <h1>{dataRekamMedis.tindakan.map(cat => cat.name) || '-' }</h1>
                    <h1>{dataRekamMedis.obat.map(cat => cat.name) || '-' }</h1>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req, params } ) => {
    const {id} = params
	const accessToken = req.session?.auth?.access_token
    const dataRekamMedis = await ClientRequest.GetRekamMedisById(accessToken, id)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
            accessToken: accessToken,
            dataRekamMedis: dataRekamMedis.data.data
        }
	})
})
