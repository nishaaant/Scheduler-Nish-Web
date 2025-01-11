import React, { useContext } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { AppContext } from '../ContextProvider'

const AddLeadSourceNode = ({ data }) => {
  const {toggleModal}=useContext(AppContext)
  const modalData={
    title:"Add a Source Block",
    subTitle:"Pick a block & configure, any new leads that match rules will be added to sequence automatically.",
    type:"addLeadSource"
  }
  return (
    <div className="bg-[#f9f9f9]  w-[250px] p-[10px] rounded-[5px] shadow-lg  border  border-[#d7d7d7]" onClick={()=>toggleModal(true,modalData)}>
      <div className="text-center text-gray-700">
        <IoMdAdd style={{fontSize:"30px", margin:"0px auto"}}/>
        <div className="mt-1">{data.title}</div>
        <div className="mt-1 text-[14px]">{data.label}</div>
      </div>

    </div>

  )
}

export default AddLeadSourceNode
