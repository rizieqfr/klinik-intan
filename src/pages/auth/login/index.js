import apiService from '@/utils/apiService'
import asyncLocalStorage from '@/utils/asyncLocalStorage'
import isEmpty from '@/utils/isEmpty'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'
import axios from 'axios'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { use, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
    const router = useRouter()
	  const errorRef = useRef(null)

    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: async (values) => {
          const {username, password} = values
          try {
            toast.promise(
              axios.request({
                method: 'POST',
                url: '/api/login',
                data: { username, password }
              }), {
                loading: 'Sedang melakukan login...',
                success: (res) => {
                  if (res.status === 200) {
                    console.log(res, 'response login');
                    localStorage.setItem('role', res.data.role)
                    localStorage.setItem('username', res.data.username)
                    router.push('/dashboard');
                    return "Login Berhasil!"
                  }
                },
                error: (error) => {
                  console.error(values, 'dataTerkirim');
                  console.error(error);
                  return error.response?.data?.message || 'Username atau Password salah!';
                }
              }
            );
          } catch (error) {
            console.error('Error during login:', error);
            toast.error('Terjadi kesalahan saat login.');
          }
        }
      });


  return (
    <div className='min-h-screen'>
        <div className='mx-[299px] my-[30px] bg-white border rounded-lg px-[43px] py-[100px] shadow '>
            <h1 className='text-[46px] text-center mb-[24px] font-bold'>Admin Nur Hidayah Klinik</h1>
            <h2 className='text-center mb-[42px] text-[#353A4099]'>Hello! Please login to start your session!</h2>
                <div className='flex items-center justify-center'>
                    <div className='w-[412px] space-y-[19px]'>
                        <div className='flex items-center justify-between gap-[32px]'>
                            <h1 className='font-semibold'>Email</h1>
                            <div className='w-[70%]'>
                                <input onChange={formik.handleChange} name='username' type="text" className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Email...'/>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-[32px]'>
                            <h1 className='font-semibold'>Password</h1>
                            <div className='w-[70%]'>
                                <input onChange={formik.handleChange} name='password' type="password" className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder='Password...'/>
                            </div>
                        </div>
                        <div>
                            <Link href={'/auth/register'}>Don&#39;t have an account&#63; <span className='text-cyan font-semibold'>Register&#33;</span></Link>
                        </div>
                        <button onClick={formik.handleSubmit}  className='bg-blue-600 text-white px-[163px] py-[20px] w-full rounded-md font-medium'>Sign in</button>
                    </div>
                </div>

        </div>
    </div>
  )
}

