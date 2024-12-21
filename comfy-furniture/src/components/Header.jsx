import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import{ useCartStore } from '../store';
const Header = () => {
  const cartNumber = useCartStore(state => state.cartNumber)
  const setCartState = useCartStore(state => state.setCartState)
  return (
    <header className='bg-[rgb(231,226,221)] sticky top-0  w-full shadow-md z-50 p-5'>
    <nav className='flex justify-between items-center max-w-[1170px] mx-auto'>
        <div>
            <img src='/assets/images/logo.svg' alt="store logo" className='w-[150px] md:w-[200px]'/>
            </div>
            <div className='relative cursor-pointer' onClick={()=>setCartState(true)}>
                <FaCartPlus  className='w-[50px] h-[30px]' />
                <div className="absolute -top-[15px] right-0 text-white bg-[#f09d51] text-lg px-1 rounded-lg">{cartNumber}</div>
            </div>
    </nav>
    </header>
  )
}

export default Header