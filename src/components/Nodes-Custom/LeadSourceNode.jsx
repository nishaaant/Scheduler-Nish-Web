import { Handle, Position } from '@xyflow/react'
import React, { useContext, useState } from 'react'
import { BsPersonPlus } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { AppContext } from '../ContextProvider';

const LeadSourceNode = ({ data }) => {
  const [showIcons,setShowIcons] = useState(false);
  const {nodes, setNodes, edges, setEdges} = useContext(AppContext);
  const deleteNodeEdge=()=>{
    let updatedNode = nodes.filter(item=>item.id!==data.id);
    updatedNode = updatedNode.map(item=>{
      if (item.type === "addLeadSource" || item.type === "leadSourceNode") {
        if(item.position.x!==200){
          return {
            ...item,
            position: {
                x: item.position.x-300,
                y: item.position.y,
            },
        };}
        }
      
        return item; 
    })
    setNodes(updatedNode)
    const updatedEdges = edges.filter(item => item.source !== `${data.id}`);
    setEdges(updatedEdges)

  }
  return (
    <div className="flex gap-5 items-center bg-[#f9f9f9] relative  w-[250px] p-[20px] rounded-[5px] shadow-lg  border  border-[#d7d7d7]" onMouseEnter={()=>setShowIcons(true)} onMouseLeave={()=>setShowIcons(false)}>
      {showIcons ? <div className='absolute -right-1 -top-3 flex gap-2'>
        <div className='h-6 w-6 p-1  border border-[#fbd355] bg-[#f3e8c4] rounded-[5px]'> <FaRegEdit  style={{color:"#f9c00c"}}  /> </div>
        <div className='h-6 w-6 p-1 border border-[#ef898c] bg-[#f5d3d4] rounded-[5px]'> <RxCross2 style={{color:"#e53a40 "}} onClick={deleteNodeEdge} /></div>
      </div>:""}
      <div className='h-[60px] w-[60px] p-[10px] border border-[#f484b2] bg-[#fbd6e5] rounded-[5px]'>
        <BsPersonPlus style={{ color: "#ed317f", fontSize: "30px" }} />
      </div>
      <div className=" text-gray-700">
        <div className="mt-1 text-[16px] font-bold">{data.title}</div>
        <div className="text-[16px] font-bold text-[#ed317f]">{data.label}</div>
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        className="!bg-[#d7d7d7] "
        style={{ border: "2px solid #d7d7d766 !important" }}
      />
    </div>
  )
}

export default LeadSourceNode
