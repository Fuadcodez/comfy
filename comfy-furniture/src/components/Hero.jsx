import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
    
     <div className="flex justify-center items-center bg-cover" style={{backgroundImage: `url(/assets/images/hero-bcg.jpeg)`, minHeight: "calc(100vh - 60px)" }}>
        <div className=' bg-[rgba(255,255,255,0.8)] p-8 text-center' >
            <h1 className="text-[3.4rem] uppercase mb-4 font-semibold tracking-[0.1rem]">furniture collection</h1>
            <a href='#product' className=" py-4 px-12 uppercase text-[16px] bg-[#f09d51] text-[#222] rounded-lg border hover:bg-transparent hover:text-[#f09d51] hover:border hover:border-[#f09d51] transition-all duration-[0.3s] tracking-[0.1rem] focus:ring-0 outline-none">shop now</a>
        </div>
    </div>
    
    </>
  )
}

export default Hero