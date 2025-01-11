import React, { useContext } from 'react'
import { BsPersonPlus } from 'react-icons/bs';
import { AppContext } from '../ContextProvider';
import { MdOutlineMail } from 'react-icons/md';
import { FaRegHourglassHalf } from 'react-icons/fa6';

const ModalButton = () => {
   
    const { toggleModal, toggleSelect, nodes, modalData, addedData, setAddedData } = useContext(AppContext)
    const text = modalData.type==="addLeadSource"?"Sources":"Outreach"
    const data = {
        title: modalData.type==="addLeadSource"?"Leads from List(s)":"Cold Email",
        subTitle:modalData.type==="addLeadSource"? "Connect multiple lists as source for this sequence.":"Send an email to a lead.",
        type:modalData.type
    }

    const data2 ={
        title:"Wait",
        subTitle:"Add a delay between blocks",
        type:modalData.type
    }
   console.log() 
    return (
        <div className='p-[10px] h-[500px] cursor-pointer'>
            <h1 className='text-[20px]'>{text}</h1>
            <div className='mt-[10px] bg-[#f9f9f9]  w-[400px] p-[15px] rounded-[5px] shadow-lg  border  border-[#d7d7d7] flex items-center gap-4'  onClick={() => {
                if(addedData=="email" || addedData =="wait"){
                   setAddedData("ReEmail")
                }
               
            toggleModal(true, data)
            toggleSelect(true);
        }}>
                <div className={`h-[60px] w-[60px] p-[10px] border ${modalData.type==="addLeadSource"?" border-[#f484b2] bg-[#fbd6e5]":" border-[#9f52e6] bg-[#e3ccf8]" } rounded-[5px]`}>
                   {modalData.type==="addLeadSource" ?<BsPersonPlus style={{ color: "#ed317f", fontSize: "30px" }} />:<MdOutlineMail style={{ color: "#8929e0", fontSize: "40px" }}/>}
                </div>
                <div>
                    <h1 className='text-[25px] flex'>{data.title}</h1>
                    <p>{data.subTitle}</p>
                </div>
            </div>
            {
                addedData==="email" && modalData.type!=="addLeadSource" ?<>
                 <h1 className='text-[20px] mt-8'>Conditions</h1>
            <div className='mt-[10px] bg-[#f9f9f9]  w-[400px] p-[15px] rounded-[5px] shadow-lg  border  border-[#d7d7d7] flex items-center gap-4'  onClick={() => {
                 if(addedData=="ReEmail"){
                    console.log("dfh")
                    setAddedData("email")
                }
            toggleModal(true, data2)
            toggleSelect(true);
        }}>
                <div className={`h-[60px] w-[60px] p-[10px] border border-[#93ccf3] bg-[#eaf1f7]  rounded-[5px]`}>
                  <FaRegHourglassHalf style={{ color: "#03a6ff", fontSize: "40px" }}/>
                </div>
                <div>
                    <h1 className='text-[25px] flex'>{data2.title}</h1>
                    <p>{data2.subTitle}</p>
                </div>
            </div>
                </>
                :""
            }
        </div>
    )
}

export default ModalButton
