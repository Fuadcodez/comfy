import React from 'react'
import {images} from "../assets"
const Hero = () => {
  return (
     <div className="flex justify-center items-center" style={{backgroundImage: `url(${images.heroBcg})`, minHeight: `calc(100vh - 70px)`, }}>
        <div className='text-center bg-[rgba(255,255,255,0.8)] p-8' >
            <h1 className=" text-[3.4rem] uppercase mb-[48px] font-semibold tracking-[0.1rem]">furniture collection</h1>
            <button className=" py-4 px-12 uppercase text-[16px] bg-[#f09d51] text-[#222] rounded-lg border hover:bg-transparent hover:text-[#f09d51] hover:border hover:border-[#f09d51] transition-all duration-[0.3s] tracking-[0.1rem] focus:ring-0 outline-none">shop now</button>
        </div>
    </div>
  )
}

export default Hero