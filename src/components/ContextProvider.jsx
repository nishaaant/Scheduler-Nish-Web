import { useEdgesState, useNodesState } from '@xyflow/react';
import React, { createContext, useState } from 'react'
import { initialEdges, initialNodes } from '../utils/initialData';
export const AppContext = createContext();
const ContextProvider = ({ children }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [selectData, setSelectData] = useState(false)
    const [showInputData, setShowInputData] = useState(false)
    const [inputData, setInputData] = useState({})
    const [leadSrc,setLeadSrc] = useState([]);
    const [emailData,setEmailData] = useState(null);
    const [addedData,setAddedData] = useState("");
    const [ errorModal,setErrorModal] = useState(false)
    
    const toggleModal = (modalVal, data) => {
        setModalOpen(modalVal);
        setModalData(data);
    }

    const toggleSelect = (val) => {
        setSelectData(val)
    }
    const setInputWithData = (showVal, data) => {
        setShowInputData(showVal);
        if (showVal)
            setInputData(data);
        else setInputData({});
    }

    return (
        <AppContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, modalOpen, toggleModal, modalData, setModalData, selectData, toggleSelect, showInputData, setInputWithData,leadSrc,setLeadSrc,emailData,setEmailData, addedData,setAddedData,errorModal,setErrorModal }}>
            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider
