import React, { useContext } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { AppContext } from '../ContextProvider'

const ModalHeading = () => {
  const { toggleModal, toggleSelect, setLeadSrc , setInputWithData,setEmailData} = useContext(AppContext)
  return (
    <div className="flex justify-end">
      <div className='h-[30px] w-[30px] border-[3px] border-[#e53a40] rounded-[5px]'>
        <RxCross2 style={{ color: "#e53a40", fontSize: "25px" }} onClick={() => {
          toggleSelect(false);
          toggleModal(false, {});
          setLeadSrc([])
          setInputWithData(false,{})
          setEmailData([])
          
        }

        } />
      </div></div>
  )
}

export default ModalHeading
