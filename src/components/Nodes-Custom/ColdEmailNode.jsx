import { Handle, Position } from '@xyflow/react'
import React, { useContext, useState } from 'react'
import { MdOutlineMail } from 'react-icons/md'
import { AppContext } from '../ContextProvider';
import { FaRegEdit } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const ColdEmailNode = ({ data }) => {
    const [showIcons, setShowIcons] = useState(false);
    const { nodes, setNodes, edges, setEdges, setAddedData } = useContext(AppContext);
    const deleteNodeEdge = () => {
        let updatedNode = nodes.filter(item => item.id !== data.id);
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


        setEdges(updatedEdges);
        setAddedData("")


    }
    return (
        <div className="flex gap-5 items-center bg-[#f9f9f9] relative  w-[255px] p-[20px] rounded-[5px] shadow-lg  border  border-[#d7d7d7]" onMouseEnter={() => setShowIcons(true)} onMouseLeave={() => setShowIcons(false)}>
            {showIcons ? <div className='absolute -right-1 -top-3 flex gap-2'>
                <div className='h-6 w-6 p-1  border border-[#fbd355] bg-[#f3e8c4] rounded-[5px]'> <FaRegEdit style={{ color: "#f9c00c" }} /> </div>
                <div className='h-6 w-6 p-1 border border-[#ef898c] bg-[#f5d3d4] rounded-[5px]'> <RxCross2 style={{ color: "#e53a40 " }} onClick={deleteNodeEdge} /></div>
            </div> : ""}
            <Handle
                type='target'
                id="a"
                position={Position.top}
                className="!bg-[#d7d7d7] "
                style={{ border: "2px solid #d7d7d766 !important" }}
            />
            <div className='h-[60px] w-[60px] p-[10px] border border-[#9f52e6] bg-[#e3ccf8] rounded-[5px]'>
                <MdOutlineMail style={{ color: "#8929e0", fontSize: "40px" }} />
            </div>
            <div className="text-gray-700">
                <div className="mt-1 text-[16px] font-bold">{data.title}</div>
                <div className=" text-[16px] font-bold ">Template: <span className='text-[#8929e0]'>{data.label}</span></div>
                {data.type ? <div className=" text-[16px] font-bold ">Type: <span className='text-[#8929e0]'>{data.type}</span></div> : ""}
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

export default ColdEmailNode
