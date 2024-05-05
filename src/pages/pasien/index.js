import Table from '@/components/Table'
import Modal from '@/components/modal'
import Sidebar from '@/components/sidebar'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'

export default function Pasien() {
    const route = useRouter()
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('https://662d2f180547cdcde9e029ab.mockapi.io/monitoring');
            if (!response.ok) {
            throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
        };

        fetchData();
    }, []);
    const kolomPasien = [
        {
          header: 'No',
          accessorKey: 'id',
        },
        {
          header: 'Nama',
          accessorKey: 'nama',
        },
        {
          header: 'NIK',
          accessorKey: 'nik',
        },
        {
          header: 'Alamat',
          accessorKey: 'alamat',
        },
        {
            header: 'Aksi',
            cell: ({row}) => (
                <td className='flex justify-center'>
                    <button onclick="route.push('pasien/detail')" className='bg-[#0080CC] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Detail</button>
                    <button onclick="setShowEditModal(!showEditModal)" className='bg-[#FEC107] text-white rounded px-[14px] py-[3px] font-semibold text-sm mr-2'>Edit</button>
                    <button className='bg-[#FF0000] text-white rounded px-[14px] py-[3px] font-semibold text-sm'>Hapus</button>
                </td>
            )
        
        }
      ]
    return (
        <div>
            <Modal 
                activeModal={showAddModal}
                title={`Tambah Pasien`}
                buttonClose={ () => setShowAddModal(!showAddModal)}
                width={'1000px'}
                content= {
                    <div className=' w-full space-y-[12px]'>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>NIK</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='NIK...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Nama</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Nama...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Jenis Kelamin</h1>
                            <select className='py-[13px] px-[16px] border rounded w-[85%] outline-none' name="" id="">
                                <option value="">Pilih Jenis Kelamin...</option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Tanggal Lahir</h1>
                            <input type="date" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Tanggal Lahir...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Telepon</h1>
                            <input type="number" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Telepon...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Pekerjaan</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Pekerjaan...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Kartu Kesehatan</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Kartu Kesehatan...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Nomor Kartu</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Nomor Kartu...'/>
                        </div>

                        <div className='flex items-center justify-end gap-3'>
                            <button onClick={() => setShowAddModal(!showAddModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                            <button className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Tambah</button>
                        </div>

                    </div>
                    }
            />
            <Modal 
                activeModal={showEditModal}
                title={`Edit Pasien`}
                buttonClose={ () => setShowEditModal(!showEditModal)}
                width={'1000px'}
                content= {
                    <div className=' w-full space-y-[12px]'>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>NIK</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='NIK...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Nama</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Nama...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Jenis Kelamin</h1>
                            <select className='py-[13px] px-[16px] border rounded w-[85%] outline-none' name="" id="">
                                <option value="">Pilih Jenis Kelamin...</option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Tanggal Lahir</h1>
                            <input type="date" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Tanggal Lahir...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Telepon</h1>
                            <input type="number" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Telepon...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Pekerjaan</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Pekerjaan...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Kartu Kesehatan</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Kartu Kesehatan...'/>
                        </div>
                        <div className='flex items-center justify-between w-full text-sm'>
                            <h1 className='text-[#353A40] font-semibold'>Nomor Kartu</h1>
                            <input type="text" className='py-[13px] px-[16px] border rounded w-[85%] outline-none' placeholder='Nomor Kartu...'/>
                        </div>

                        <div className='flex items-center justify-end gap-3'>
                            <button onClick={() => setShowEditModal(!showEditModal)} className='border-[#0179FF] border text-[#0179FF] font-semibold px-[33px] py-[15px] rounded'>Batal</button>
                            <button className='bg-[#0179FF] text-white font-semibold px-[33px] py-[15px] rounded'>Edit</button>
                        </div>

                    </div>
                    }
            />
            <div className='bg-[#ECEFF4] flex gap-[32px] min-h-screen'>
                <Sidebar />
                <div className='w-full'>
                    <div className='flex items-center justify-between pr-[78px] pt-[80px] mb-4'>
                        <h1 className='text-[32px] text-[#353A40] font-semibold'>Pasien</h1>
                        <h1>Navigasi / <span className='text-cyan font-medium'>Pasien</span></h1>
                    </div>
                    <div className='flex items-center justify-end pr-[126px]'>
                        
                        <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                            <FaCirclePlus className='text-xl' />
                            <h1>Tambah</h1>
                        </button>
                    </div>
                    <div className='flex items-center justify-center '>
                        <Table data={data} columns={kolomPasien} />
                    </div>
                </div>
            </div>
        </div>
    )
}
