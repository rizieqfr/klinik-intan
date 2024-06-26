import Api from '../../api/hello'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function Register() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const register = async () => {
       try {
            const response = await Api.Register(formData)
            toast.success('Registrasi berhasil, silahkan login untuk masuk ke Dashboard')
            router.push('/')
       } catch (error) {
            console.log(error)
            toast.error('Gagal Registrasi')
       }
    }

    return (
        <div>
            <div className='min-h-screen'>
                <div className='mx-[299px] my-[30px] bg-white border rounded-lg px-[43px] py-[100px] shadow  '>
                    <h1 className='text-[46px] text-center mb-[24px] font-bold'>Klinik Nur Hidayah</h1>
                    <h2 className='text-center mb-[42px] text-[#353A4099]'>Register to create new Account</h2>
                        <div className='flex items-center justify-center'>
                            <div className='w-[412px] space-y-[19px]'>
                                <div className='flex items-center justify-between gap-[32px]'>
                                    <h1 className='font-semibold'>Username</h1>
                                    <div className='w-[70%]'>
                                        <input onChange={handleChange} type="text" name='username' className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Username...'/>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-[32px]'>
                                    <h1 className='font-semibold'>Full Name</h1>
                                    <div className='w-[70%]'>
                                        <input onChange={handleChange} type="text" name='fullname' className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Full Name...'/>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-[32px]'>
                                    <h1 className='font-semibold'>Email</h1>
                                    <div className='w-[70%]'>
                                        <input onChange={handleChange} type="text" name='email' className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Email...'/>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-[32px]'>
                                    <h1 className='font-semibold'>Password</h1>
                                    <div className='w-[70%]'>
                                        <input onChange={handleChange} type="password" name='password' className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Password...'/>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-[32px]'>
                                    <h1 className='font-semibold'>Role</h1>
                                    <select name='role' onChange={handleChange} className='border outline-none py-[13px] rounded-[8px] px-[16px] w-[70%]' >
                                        <option value="">Select Role...</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Petugas">Petugas</option>
                                    </select>
                                </div>
                                <button onClick={register} className='bg-cyan text-white px-[163px] py-[20px] w-full rounded-md font-medium'>Register</button>
                            </div>
                        </div>

                </div>
            </div>
        </div>
    )
}
