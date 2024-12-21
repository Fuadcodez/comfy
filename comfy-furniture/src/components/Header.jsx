import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import{ useCartStore } from '../store';
const Header = () => {
  const cartNumber = useCartStore(state => state.cartNumber)
  const setCartState = useCartStore(state => state.setCartState)
  return (
    <div className='bg-[rgb(231,226,221)] sticky top-0 shadow-md z-50 flex justify-center items-center p-4 w-full'>
    <nav className='flex justify-between items-center max-w-[1170px] w-full'>
        <div className='w-[150px] md:w-[200px]'>
            <img src='/assets/images/logo.svg' alt="store logo" />
          </div>
            <div className='relative cursor-pointer w-[50px] h-[30px]' onClick={()=>setCartState(true)}>
                <FaCartPlus  className='w-full ' size={25}/>
                <div className="absolute -top-2 right-1 text-white bg-[#f09d51] text-sm  rounded-lg px-1 py-0.5">{cartNumber}</div>
            </div>
    </nav>
    </div>

    
  )
}

export default Header