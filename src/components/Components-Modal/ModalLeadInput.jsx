import React, { useContext, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { leadSourceData } from '../../utils/SelectData'
import { AppContext } from '../ContextProvider'
import { RxCross2 } from 'react-icons/rx'


const ModalLeadInput= () => {
    const { nodes, edges, setEdges, showInputData, setInputWithData, leadSrc, setLeadSrc, setNodes, toggleModal,toggleSelect } = useContext(AppContext)
    const [className, setClassName] = useState("cursor-pointer text-sm my-0.5 px-2 py-1.5 first:bg-blue-300 hover:bg-blue-300");

    const filteredLeadSourceData = leadSourceData.filter(item => {
        return leadSrc.length === 0 || leadSrc.some(data => data.id != item.id)
    })

    const addNodes = (type, data, title) => {

        console.log(type, data)
        const label = data.map(item => {
            return `${item.title}${data.length > 1 ? ", " : ""}`
        }).join(" ")
        const findId = nodes.find(item=>item.id==nodes.length + 1)
         setNodes((nds) => {
            const updatedNodes = nds.map((item) => {
                if (item.type === "addLeadSource" || item.type === "leadSourceNode") {
                    return {
                        ...item,
                        position: {
                            x: item.position.x + 300,
                            y: item.position.y,
                        },
                    };
                }
                return item; 
            });
      
            const newNode = {
                id: `${findId?Number(updatedNodes[updatedNodes.length-1].id)+1:updatedNodes.length + 1}`,
                position: { x: 200, y: 100 },
                data: { title: title, label: label, id:`${findId?Number(updatedNodes[updatedNodes.length-1].id)+1:updatedNodes.length + 1}` },
                type: type,
                draggable:false
            };
            return [...updatedNodes, newNode];
        });
        
        console.log(nodes)
        const edge = [...edges, { id: `${findId?Number(nodes[nodes.length-1].id)+1:nodes.length + 1}->2`, source: `${findId?Number(nodes[nodes.length-1].id)+1:nodes.length + 1}`, target: "2", type: "straight", targetHandle: "a" }]
        setEdges(edge);
      
    };

    const removeFirstClass = () => {
        setClassName("cursor-pointer text-sm my-0.5 px-2 py-1.5  hover:bg-blue-300")
    }
    const addLastClass = () => {
        setClassName("cursor-pointer text-sm my-0.5 px-2 py-1.5 last:bg-blue-300   hover:bg-blue-300")
    }
    const addFirstClass = () => {
        setClassName("cursor-pointer text-sm my-0.5 px-2 py-1.5 first:bg-blue-300   hover:bg-blue-300")
    }
    const handleClick = (item) => {
        setLeadSrc([...leadSrc, item]);
        setInputWithData(false, {})
    }
    const placeholder = leadSrc.length ? "" :  'Search for lists';
    const handleDelete = (index) => {
        const newData = leadSrc.filter((item, id) => index !== id)
        setLeadSrc(newData)
    }
    return (
        <div className='p-[10px] mt-[20px] text-[18px] h-[500px]'>
            <p className='font-bold '>Select your List(s)</p>
            <div className=' flex flex-wrap items-center bg-white border mt-[10px] rounded-lg shadow-sm  p-[10px] ' >
                {leadSrc.length ? leadSrc.map((item, index) => <div key={index} className=' border mr-1  mb-1 text-xs bg-[#e6e6e6] p-1 flex '>{item.title}<RxCross2
                    onClick={() => handleDelete(index)} className=" ml-1.5 my-auto" sx={{ fontSize: "14px" }} /></div>) : ""}
                <input type="text" placeholder={placeholder} className={`${placeholder ? "w-[95%]" : ""} focus:outline-none  `} onClick={() => {
                    setInputWithData(!showInputData, filteredLeadSourceData);
                    addFirstClass()
                }} />
                <div className="ml-auto flex">
                    {leadSrc.length ? <RxCross2
                        onClick={() => setLeadSrc([])} className="mr-2  my-auto" sx={{ fontSize: "14px" }} /> : ""}
                    <MdKeyboardArrowDown className=' text-[25px]  border-l  ' onClick={() => {
                        setInputWithData(!showInputData, filteredLeadSourceData);
                        addFirstClass()
                    }} />
                </div>

            </div>
            {showInputData && <div className="mt-1.5  bg-white border rounded-lg" >
                {filteredLeadSourceData.map((item, index) => (
                    <div onClick={() => handleClick(item)} onMouseEnter={removeFirstClass} onMouseLeave={addLastClass} key={index} className={className}>{item.title}</div>
                ))}
            </div>}
            {
                leadSrc.length ? <div className='flex'>
                    <button className='bg-[#06f] text-white border border-[#06f6] ml-auto mt-[10px] py-2 px-4 rounded-[5px]' onClick={() => { addNodes("leadSourceNode", leadSrc, "Leads from"); toggleModal(false, {}); setLeadSrc([]);
                    toggleSelect(false) }} >Insert</button></div> : ""
            }
        </div>
    )
}

export default ModalLeadInput
