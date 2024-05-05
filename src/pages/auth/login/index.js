import Api from '../../api/hello'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
    const router = useRouter()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    // const loginUser = async () => {
    //     const data = {
    //         username: username,
    //         password: password
    //     }
    //     try {
    //         const response = await Api.Login(data)
    //         localStorage.setItem('token', response.data.accessToken)
    //         router.push('/dashboard')
    //         toast('Selamat Datang Kembali!', {
    //             icon: '✨',
    //         });
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Gagal Login!')
    //     }
    // }

  return (
    <div className='min-h-screen'>
        <div className='mx-[299px] my-[120px] bg-white rounded-lg px-[43px] py-[200px] shadow '>
            <h1 className='text-[46px] text-center mb-[24px] font-bold'>Intan Husada Klinik</h1>
            <h2 className='text-center mb-[42px] text-[#353A4099]'>Hello! Please login to start your session!</h2>
                <div className='flex items-center justify-center'>
                    <div className='w-[412px] space-y-[19px]'>
                        <div className='flex items-center justify-between gap-[32px]'>
                            <h1 className='font-semibold'>Email</h1>
                            <div className='w-[70%]'>
                                <input onChange={(e) => setUsername(e.target.value)} type="text" className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Email...'/>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-[32px]'>
                            <h1 className='font-semibold'>Password</h1>
                            <div className='w-[70%]'>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Password...'/>
                            </div>
                        </div>
                        <div>
                            <Link href={'/auth/register'}>Don&#39;t have an account&#63; <span className='text-cyan font-semibold'>Register&#33;</span></Link>
                        </div>
                        <button onClick={() => router.push('/dashboard')}  className='bg-cyan text-white px-[163px] py-[20px] w-full rounded-md font-medium'>Sign in</button>
                    </div>
                </div>

        </div>
    </div>
  )
}
