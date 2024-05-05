import React from 'react'

export default function Input({onChange, placeholder, type, name, value}) {
  return (
    <>
        <div>
            <h1 className='font-semibold mb-2'>{placeholder}</h1>
            <input onChange={onChange} type={type} name={name} value={value} className='border outline-none w-full py-[13px] rounded-[8px] px-[16px]'  placeholder={placeholder}/>
        </div>
    </>
    
  )
}
