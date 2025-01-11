import { Handle, Position } from '@xyflow/react'
import React, { useContext, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { LuClock5 } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'
import { AppContext } from '../ContextProvider'

const WaitDelayNodes = ({data}) => {
    const [showIcons,setShowIcons] = useState(false);
    const {nodes, setNodes, edges, setEdges, addedData , setAddedData} = useContext(AppContext);
    const deleteNodeEdge=()=>{
      let updatedNode = nodes.filter(item=>item.id!==data.id);
      updatedNode = updatedNode.map(item => {
        const yPos=item.position.y - 200;
        if (item.type === "addMoreNode" || item.type === "coldEmailNode" || item.type === "waitDelayNode" ) {
            return {
                ...item,
                position: {
                    x: item.position.x,
                    y:yPos===300? item.position.y:item.position.y - 200,
                },
            };
        }
        return item;
    });
      setNodes(updatedNode)
      const updatedEdges = edges.filter(item => item.source !== `${data.id}`);
      setEdges(updatedEdges)
      if(addedData==""){
        setAddedData("")
      }
      else{
        setAddedData("email")
      }
      
    }
  return (
    <div className="flex gap-5 items-center bg-[#f9f9f9] relative  w-[255px] p-[20px] rounded-[5px] shadow-lg  border  border-[#d7d7d7]" onMouseEnter={()=>setShowIcons(true)} onMouseLeave={()=>setShowIcons(false)}>
      {showIcons ? <div className='absolute -right-1 -top-3 flex gap-2'>
        <div className='h-6 w-6 p-1  border border-[#fbd355] bg-[#f3e8c4] rounded-[5px]'> <FaRegEdit  style={{color:"#f9c00c"}}  /> </div>
        <div className='h-6 w-6 p-1 border border-[#ef898c] bg-[#f5d3d4] rounded-[5px]'> <RxCross2 style={{color:"#e53a40 "}} onClick={deleteNodeEdge} /></div>
      </div>:""}
            <Handle
                type='target'
                id="a"
                position={Position.top}
                className="!bg-[#d7d7d7] "
                style={{ border: "2px solid #d7d7d766 !important" }}
            />
            <div className='h-[60px] w-[60px] p-[10px] border border-[#93ccf3] bg-[#eaf1f7] rounded-[5px]'>
                <LuClock5 style={{ color: "#03a6ff", fontSize: "40px" }} />
            </div>
            <div className="text-gray-700">
                <div className="mt-1 text-[16px] font-bold">{data.title}</div>
                <div className=" text-[16px] font-bold ">Wait: <span className='text-[#03a6ff]'>{data.label}</span></div>
            </div>
            <Handle
                type='source'
                id="b"
                position={Position.Bottom}
                className="!bg-[#d7d7d7] "
                style={{ border: "2px solid #d7d7d766 !important" }}
            />
        </div>
  )
}

export default WaitDelayNodes
