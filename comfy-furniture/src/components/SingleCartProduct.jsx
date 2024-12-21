import React, { useEffect } from 'react'
import { useCartStore } from '../store';
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
const SingleCartProduct = ({sys, fields, number, setProductFilter, productFilter, incrementandDeCrement}) => {
       const {title, price} = fields
     const image = fields.image.fields.file.url
     const id = sys.id
     const setAllProducts = useCartStore(state => state.setAllProducts)
    const removeProduct = ()=>{
        const newProduct = productFilter.filter(product => product.sys.id !== id)
        setProductFilter(newProduct)
        localStorage.setItem("filteredProduct", JSON.stringify(newProduct))
    }
  return (
      <div  className="cart-item grid items-center grid-cols-[auto_1fr_auto] gap-x-6 my-6 mx-0">
            <img src={image} alt="product" className='w-[75px] h-[75px]'/>
            <div  className='font-semibold'>
                <h4 className='text-[0.85rem] capitalize tracking-[0.1rem]' >{title}</h4>
                <h5>${price}</h5>
                <span className=" text-gray-400 cursor-pointer" onClick={removeProduct}>remove</span>
            </div>
            <div className='flex flex-col items-center '>
                <FaAngleUp className='text-[#f09d51]' onClick={()=>incrementandDeCrement("increment", id)}/>
                <p className="">{number}</p>
                <FaAngleDown className='text-[#f09d51]' onClick={()=>incrementandDeCrement("decrement", id)}/>
            </div>
        </div> 
  )
}

export default SingleCartProduct