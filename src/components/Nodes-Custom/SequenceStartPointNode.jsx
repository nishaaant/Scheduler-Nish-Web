import { Handle, Position } from '@xyflow/react'
import React from 'react'

const SequenceStartPointNode = ({ data }) => {
  return (
    <div className="bg-[#f9f9f9]  w-[250px] p-[10px] rounded-[5px] shadow-md  border  border-[#d7d7d7]">
      <Handle
        type='target'
        id="a"
        position={Position.top}
        className="!bg-[#d7d7d7] "
        style={{ border: "2px solid #d7d7d766 !important" }}
      />
      <div className="flex justify-center text-gray-700">
        <div>{data.title}</div>
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

export default SequenceStartPointNode
