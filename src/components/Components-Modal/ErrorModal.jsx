import React, { useContext } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AppContext } from '../ContextProvider'

const ErrorModal = () => {
    const {setErrorModal} = useContext(AppContext)
    const handleClick=()=>{
        setErrorModal(false)
    }
  return (
    <div className='fixed  z-10 top-0 mx-auto w-[100%] h-[100%] bg-[#00000080]  flex'>
    <div className="bg-[#f2f2f2]  w-[30%]  rounded-lg shadow-lg max-h-[100vh] m-auto p-[30px]">
      <div className='flex justify-center'><RiErrorWarningLine style={{fontSize:"100px", color:"#3fc3ee"}} /></div>
      <p className='text-center text-[20px] mt-2'>Invalid Values Found, Please check all fields!</p>
      <div className='flex justify-center gap-4 mt-8'>
        <button className='bg-[#06f] text-white px-4  py-2 rounded' onClick={handleClick}>Ok</button>
        <button className='bg-[#6e7881] text-white px-4 py-2 rounded' onClick={handleClick}>Cancel</button>
        
      </div>
    </div>
</div>
  )
}

export default ErrorModal
