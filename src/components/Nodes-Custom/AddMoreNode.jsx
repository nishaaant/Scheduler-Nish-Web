import { Handle, Position } from '@xyflow/react'
import React, { useContext } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { AppContext } from '../ContextProvider'


const AddMoreNode = () => {
    const {toggleModal,nodes}=useContext(AppContext);
    const modalData= 
    {
        title:"Add Blocks",
        subTitle:"Click a block to configure and add it in a sequence.",
        type:"addMoreNode"
      }

    return (
        <div className=' w-[250px]'>
            <Handle
                type='target'
                position={Position.top}
                className="!bg-[#d7d7d7] "
                style={{ border: "2px solid #d7d7d766 !important" }}
            />
            <div className="h-[40px] w-[40px] mx-auto border-[3px] border-[#03a6ff] rounded-[5px]">
                <IoMdAdd style={{ fontSize: "30px", margin: "2px auto", color: "#03a6ff" }} onClick={()=>{toggleModal(true,modalData);
                }} />
            </div>
        </div>
    )
}

export default AddMoreNode
