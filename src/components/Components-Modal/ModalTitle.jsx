import React, { useContext } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { AppContext } from '../ContextProvider'

const ModalTitle = () => {
    const { modalData, selectData } = useContext(AppContext)
    return (
        <div className='p-[10px]'>
            <h1 className='text-[25px] flex items-center gap-2 font-bold'>{modalData.title}{!selectData &&<FaRegQuestionCircle className='mt-0.5 text-[20px]' />}</h1>
            <p>{modalData.subTitle}</p>
        </div>
    )
}

export default ModalTitle
