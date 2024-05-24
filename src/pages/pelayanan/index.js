import Table from '@/components/Table'
import Sidebar from '@/components/sidebar'
import ClientRequest from '@/utils/clientApiService'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'

export default function Pelayanan() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [data, setData] = useState()
    const [idObat, setIdObat] = useState('')
    const kolomPelayanan = [
        {
            accessorKey: '',
            header: 'Kode Obat'
        },
        {
            accessorKey: '',
            header: 'Nama Obat'
        },
        {
            accessorKey: '',
            header: 'Harga'
        },
    ]

    
    const initialValues = {
        kodeObat: '',
        namaObat: '',
        hargaObat: ''
    }
    const formik = useFormik({
        initialValues,
        validate : (values) => {
            const requiredFields = [
                'kodeObat',
                'namaObat',
                'hargaObat',
            ];
            const errors = Object.fromEntries(
                requiredFields
                .filter(field => !values[field])
                .map(field => {
                    const fieldNameWithSpaces = field.replace(/([A-Z])/g, ' $1').trim();
                    return [field, `${fieldNameWithSpaces.charAt(0).toUpperCase() + fieldNameWithSpaces.slice(1)} wajib diisi`];
                })
            );
            
            return errors;
        },
        onSubmit: async (values) => {
            try {
                if (showAddModal === true) {
                    // Tambah Obat
                    toast.promise(
                        ClientRequest.CreateObat(accessToken, values).then((res) => {
                        return res;
                    }),
                    {
                        loading: 'Processing...',
                        success: (res) =>{
                            formik.resetForm();
                            setShowAddModal(!showAddModal);
                            getObat();
                            return `${res.data.message}`
                        } ,
                        error: (error) => {
                            return `${error.response.data.message}`
                        },
                    }
                    );
            } else {
                // Edit Obat
                toast.promise(
                    ClientRequest.UpdateObat(accessToken, values, idObat).then((res) => {
                    return res;
                }),
                {
                    loading: 'Processing...',
                    success: (res) =>{
                        formik.resetForm();
                        setShowEditModal(!showEditModal);
                        getObat();
                        return `${res.data.message}`
                    } ,
                    error: (error) => {
                        return `${error.response.data.message}`
                    },
                }
                );
                }
            } catch (error) {
                console.error('Error during adding/editing obat:', error);
                toast.error('Terjadi kesalahan saat menambah/mengedit obat.');
            }
        },
    })

    const getObat = async () => {
        try {
            const res = await ClientRequest.GetObat()
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getObat()
    }, [])
  return (
    <div>
        <div className='bg-white flex gap-[32px] min-h-screen'>
                <Sidebar />
                <div className='w-full pb-10 pr-[32px]'>
                    <div className='flex items-start justify-between  pt-[40px] mb-4'>
                        <h1 className='text-4xl text-[#353A40] font-bold'>Pelayanan</h1>
                        <h1>Navigasi / <span className='text-cyan font-medium'>Pelayanan</span></h1>
                    </div>
                    <div className='flex items-center justify-end '>
                        <button onClick={() => setShowAddModal(!showAddModal)} className='flex items-center justify-center gap-3 py-[14px] bg-[#0179FF] px-[30px] rounded text-white font-medium'>
                            <FaCirclePlus className='text-xl' />
                            <h1>Tambah</h1>
                        </button>
                    </div>
                    <Table data={''} columns={kolomPelayanan} />
                </div>
            </div>
    </div>
  )
}
