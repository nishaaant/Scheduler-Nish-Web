import React, { useContext, useEffect } from 'react'
import { AppContext } from '../ContextProvider'
import ModalHeading from './ModalHeading'
import ModalTitle from './ModalTitle'
import ModalButton from './ModalButton'
import ModalInput from './ModalInput'

const Modal = () => {
    const { selectData } = useContext(AppContext)
   
    return (
        <div className='fixed  z-5 top-0 mx-auto w-[100%] h-[100%] bg-[#00000080]  flex'>
            <div className="bg-[#f2f2f2]  w-[60%]  rounded-lg shadow-lg max-h-[100vh] m-auto p-[10px]">
                <ModalHeading />
                <hr className='mt-3' />
                <ModalTitle />
                <hr />
                {selectData ?
                    <ModalInput />
                    : <ModalButton />}
            </div>
        </div>
    )
}

export default Modal
