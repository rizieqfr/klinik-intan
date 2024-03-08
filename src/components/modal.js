import React from 'react'
import { IoClose } from 'react-icons/io5'

const Modal = ({activeModal, title, buttonClose, width, content}) => {

    return (
        <div className={`${activeModal ? 'translate-y-0' : '-translate-y-[2000px]'} transition-all duration-1000 ease-in-out fixed left-0 top-0 z-50 `}>
            <div className='h-screen w-screen bg-black backdrop-blur-sm bg-opacity-50 overflow-hidden flex items-center justify-center p-10'>
                <div  className={`max-h-[700px] overflow-auto shadow-lg  scrollbar-hide`} style={{ width: width }}>
                    <div className='flex items-center justify-between bg-[#00A9AE] text-white pt-[15px] pb-[14px] px-[42px] text-xl rounded-t-[16px] font-semibold'>
                        <h1>{title}</h1>
                    </div>
                    <div className='px-[42px] pt-[32px] pb-[42px] bg-white rounded-b-[16px]'>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal