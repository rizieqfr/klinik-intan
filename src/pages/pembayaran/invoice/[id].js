// import { html2pdf } from 'html2pdf.js';
import ClientRequest from '@/utils/clientApiService';
import routeGuard from '@/utils/routeGuard';
import { withSession } from '@/utils/sessionWrapper';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


export default function Invoice({dataInvoice}) {

    console.log(dataInvoice)
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
            > Cetak Invoice</button>
        </div>
        <div id='invoiceElement' className='m-20 p-10 border-4 rounded-xl '>
            <div className='flex items-center justify-center'>
                <div className='pb-3 border-b-2 mb-6 text-center font-semibold text-xl w-full'>
                      <h1 className='font-bold'>Klinik Nur Hidayah Rengel Tuban</h1>
                      <h1 className='text-base'>Rengel Tuban Jawa Timur</h1>
                      <h1 className='text-base'>Jl. Raya Bengel No. 99 (Belakang Zam-Zam Mart)</h1>
                  </div>
            </div>
            <h1 className='text-2xl text-center font-semibold'>INVOICE PEMBAYARAN</h1>
            <h1 className='text-center'>ID: {dataInvoice?.invoice}</h1>

            <div className='mt-6'>
    <h1>Nama: {dataInvoice?.fullname}</h1>
    <h1>Tanggal: {dataInvoice?.createdAt}</h1>
</div>
<div className='mt-5'>
    <div className='w-full'>
        <div className='border rounded-md p-4 w-full'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='border-b py-3 text-left'>Nama Tarif</th>
                        <th className='border-b py-3 text-left'>QTY</th>
                        <th className='border-b py-3 text-left'>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border-b py-3'>Biaya Layanan</td>
                        <td className='border-b py-3'>1</td>
                        <td className='border-b py-3'>Rp. {dataInvoice?.purchased.biayaLayanan}</td>
                    </tr>
                    <tr>
                        <td className='border-b py-3'>Biaya Obat</td>
                        <td className='border-b py-3'>1</td>
                        <td className='border-b py-3'>Rp. {dataInvoice?.purchased.biayaObat}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className='border-t py-3 font-bold'>Jumlah Tarif</td>
                        <td className='border-t py-3 font-bold'>2</td>
                        <td className='border-t py-3 font-bold'>Rp. {dataInvoice?.total_payment}</td>
                    </tr>
                    <tr>
                        <td className='py-3 text-end' colSpan='3'>Status: <span className='text-red-500 font-bold'>{dataInvoice?.status}</span></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>

            <div className='mt-6'>
                {/* <h1 className='text-lg font-medium text-end'>Total: Rp.{dataInvoice?.total_payment}</h1> */}
                {/* <Image className='w-40 h-20 -rotate-12' src={''} alt="" /> */}
            </div>
        </div>
        
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req, params } ) => {
    const {id} = params
	const accessToken = req.session?.auth?.access_token
    const dataInvoice = await ClientRequest.GetPaymentById(accessToken, id)
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/auth/login', {
		props: {
            accessToken: accessToken,
            dataInvoice: dataInvoice.data.data[0]
        }
	})
})
