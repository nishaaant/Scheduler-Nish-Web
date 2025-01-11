import React, { useContext, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AppContext } from '../ContextProvider'
import { RxCross2 } from 'react-icons/rx'
import { emailTemplateData } from '../../utils/SelectData'
import ErrorModal from './ErrorModal'

const ModalEmailInput = () => {
    const { nodes, edges, setEdges, showInputData, setInputWithData, emailData, setEmailData, setNodes, toggleModal, toggleSelect, setAddedData, addedData, setErrorModal } = useContext(AppContext)
    const [className, setClassName] = useState("cursor-pointer text-sm my-0.5 px-2 py-1.5 first:bg-blue-300 hover:bg-blue-300");
    const [delay, setDelay] = useState();
    const [selectVal, setSelectVal] = useState(addedData === "ReEmail" ? "RE: Follow Up" : "days")

    const addNodes = (type, data, title) => {

        const label = data.title;
        const findId = nodes.find(item => item.id == nodes.length + 1)
        setNodes((nds) => {
            const updatedNodes = nds.map((item) => {
                if (item.type === "addMoreNode") {
                    return {
                        ...item,
                        position: {
                            x: item.position.x,
                            y: item.position.y + 200,
                        },
                    };
                }
                return item;
            });
            const node = nds.find(item => item.type === "addMoreNode")
            const newNode = {
                id: `${findId ? Number(updatedNodes[updatedNodes.length - 1].id) + 1 : updatedNodes.length + 1}`,
                position: { x: 200, y: node.position.y },
                data: {
                    title: title, label: label, id: `${findId ? Number(updatedNodes[updatedNodes.length - 1].id) + 1 : updatedNodes.length + 1}`,
                    type: addedData === "ReEmail" ? selectVal : ""
                },
                type: type,
                draggable: false,

            };
            return [...updatedNodes, newNode];
        });
        // const updatedEdges = edges.filter(item => item.target !== "n");
        const edge = [...edges, { id: `${findId?Number(nodes[nodes.length-1].id)+1:nodes.length + 1}->2`, source: `2`, target: `${findId?Number(nodes[nodes.length-1].id)+1:nodes.length + 1}`, type: "straight", targetHandle: "a" }, { id: `${nodes.length + 1}->n`, source: `${nodes.length + 1}`, target: "n", type: "straight", sourceHandle: "b" }]
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
        setEmailData(item)
        setInputWithData(false, {})
    }
    return (
        <div className='p-[10px] mt-[20px] text-[18px] h-[500px]'>
            <p className={`${addedData === "email" ? "" : "font-bold"} `}>{addedData === "email" ? "Wait For" : "Email Template"}</p>
            {
                addedData === "email" ? <>
                    <input type="number" value={delay} className='focus:outline-none  w-full bg-white border mt-[10px] rounded-lg shadow-sm  p-[10px]' onChange={(e) => setDelay(e.target.value)} />
                    <select value={selectVal} className='focus:outline-none  w-full bg-white border mt-[10px] rounded-lg shadow-sm  p-[10px]' onChange={(e) => setSelectVal(e.target.value)}>
                        <option value="">Please Select an option</option>
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                    </select>
                    <div className='flex'>
                        <button className='bg-[#06f] text-white border border-[#06f6] ml-auto mt-[10px] py-2 px-4 rounded-[5px]' onClick={() => {
                            if (!delay) {
                                setErrorModal(true)
                            }
                            else {
                                addNodes("waitDelayNode", { title: `${delay} ${selectVal}` }, "Delay"); toggleModal(false, {});

                                setAddedData("wait")

                                    ; toggleSelect(false);
                            }


                        }} >Insert</button></div>
                </> :
                    <>
                        <div className=' flex flex-wrap items-center bg-white border mt-[10px] rounded-lg shadow-sm  p-[10px] ' >
                            <input type="text" value={emailData ? emailData.title : ""} placeholder='Search for an Email Template' className={`w-[90%] focus:outline-none  `} onClick={() => {
                                setInputWithData(!showInputData, emailTemplateData);
                                addFirstClass()
                            }} />
                            <div className="ml-auto flex">
                                {emailData ? <RxCross2
                                    onClick={() => setEmailData(null)} className="mr-2  my-auto" sx={{ fontSize: "14px" }} /> : ""}
                                <MdKeyboardArrowDown className=' text-[25px]  border-l  ' onClick={() => {
                                    setInputWithData(!showInputData, emailTemplateData);
                                    addFirstClass()
                                }} />
                            </div>

                        </div>
                        {showInputData && <div className="mt-1.5  bg-white border rounded-lg" >
                            {emailTemplateData.map((item, index) => (
                                <div onClick={() => handleClick(item)} onMouseEnter={removeFirstClass} onMouseLeave={addLastClass} key={index} className={className}>{item.title}</div>
                            ))}
                        </div>}
                        {addedData === "ReEmail" ?
                            <>
                                <p className={`font-bold my-2`}>Send Email As</p>
                                <select value={selectVal} className='focus:outline-none  w-full bg-white border rounded-lg shadow-sm  p-[10px]' onChange={(e) => setSelectVal(e.target.value)}>
                                    <option value="">Please Select an option</option>
                                    <option value="New Email">New Email</option>
                                    <option value="RE: Follow Up">RE: Follow Up</option>
                                </select>
                                {selectVal == "RE: Follow Up" ? <><p className='text-[14px] mt-2'>Since you are sending the email as “RE: Follow Up“,</p>
                                    <p className='text-[14px]'>Subject Line of this template will be ignored & follow-up email will be sent in same thread as a reply to the last email.</p></> : ""}
                            </>
                            : ""}
                        {emailData ? <div className='flex'>
                            <button className='bg-[#06f] text-white border border-[#06f6] ml-auto mt-[10px] py-2 px-4 rounded-[5px]' onClick={() => {
                                if (addedData === "ReEmail") {
                                    if (!selectVal) {
                                        setErrorModal(true);
                                        return
                                    }
                                }

                                addNodes("coldEmailNode", emailData, "Email"); toggleModal(false, {});

                                setAddedData("email");

                                setEmailData(null); toggleSelect(false);
                            }} >Insert</button></div> : ""

                        }</>}

        </div>
    )
}

export default ModalEmailInput
