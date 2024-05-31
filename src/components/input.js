import React from 'react'

export default function Input({onChange, placeholder, type, name, value, readOnly, className}) {
  return (
    <>
        <div>
            <h1 className='font-semibold mb-2'>{placeholder}</h1>
            <input onChange={onChange} type={type} name={name} readOnly={readOnly} value={value} className={`border outline-none w-full py-[13px] rounded-[8px] px-[16px] ${className}`}  placeholder={placeholder}/>
        </div>
    </>
    
  )
}
