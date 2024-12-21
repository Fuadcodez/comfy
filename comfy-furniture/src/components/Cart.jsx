import React, {useEffect} from 'react'
import { IoMdClose } from "react-icons/io";
import { useCartStore } from '../store';
import SingleCartProduct from './SingleCartProduct';
const Cart = ({productFilter, setProductFilter}) => {
    const cartState = useCartStore(state => state.cartState)
    const setCartState = useCartStore(state => state.setCartState)
    const totalAmount = useCartStore(state=> state.totalAmount)
    const clearCart = ()=>{
        setProductFilter([])
        setCartState(false)
        localStorage.setItem("filteredProduct", [])
    }
     const incrementandDeCrement = (type, id)=>{
      if(type === "increment"){
        const newProduct = productFilter.map(product =>{
          if(product.sys.id === id){
            return {...product, number: product.number + 1}
          }
          return product

        }
      )
      setProductFilter(newProduct)
    localStorage.setItem("filteredProduct", JSON.stringify(newProduct))
    }
        if(type === "decrement"){
         const newProduct = productFilter.map(product =>{
          if(product.sys.id === id){
            return {...product, number: product.number - 1}
          }
          return product

        }
      )
      const newP = newProduct.filter(product=>product.number > 0)
      setProductFilter(newP)
      localStorage.setItem("filteredProduct", newP)
        }
      }
  return (
    <div className={` fixed top-0 right-0 w-full h-full bg-[rgb(240,157,81,0.5)] z-[51] ${cartState? "visible": "hidden"} md:w-[30vw] md:min-w-[450px] `}>
        <div className={` fixed top-0 right-0 w-full h-full overflow-scroll z-[1000] bg-[rgb(231,226,221)] p-6 transition-all duration-[0.3s] ease-linear md:w-[30vw] md:min-w-[450px] ${cartState ? "translate-x-[0]":"translate-x-[100%]"}`}>
            <div className=" relative ">
                <div className='bg-black text-white p-1 rounded-lg cursor-pointer absolute top-0' onClick={()=>setCartState(false)}>
                <IoMdClose size={20} className=''/>
                </div>
            </div>
            <h2 className='capitalize text-center tracking-[0.1rem] mb-[2rem] font-semibold text-3xl'>your cart</h2>
            <div className="">
                  {productFilter.length > 0 && productFilter.map((product, index)=>(
                    <SingleCartProduct key={product?.sys?.id} {...product} productFilter={productFilter} setProductFilter={setProductFilter} incrementandDeCrement={incrementandDeCrement}/>
                    ))}
                
            </div>
            {productFilter.length >0 ? <div className="mt-8 traccking-[1.6px] text-center font-semibold">
                <h3 className='uppercase mb-3'>your total : $ <span className="">{totalAmount}</span></h3>
                <button className=" banner-btn py-4 px-12 uppercase tracking-[1.6px] text-[1rem] bg-[#f09d51] border border-[#f09d51] transition-all duration-[0.3s] ease-linear hover:bg-transparent hover:text-[#f09d51]" onClick={clearCart}>clear cart</button>
            </div>: (<div className='flex flex-col items-center gap-2'>
                <h3 className='uppercase'>The cart is Empty</h3>
                <button className=" banner-btn py-4 px-12 uppercase tracking-[1.6px] text-[1rem] bg-[#f09d51] border border-[#f09d51] transition-all duration-[0.3s] ease-linear hover:bg-transparent hover:text-[#f09d51] w-full rounded-lg" onClick={()=>setCartState(false)}>Go back to shop</button>
            </div>)}
        </div>
    </div>
  )
}

export default Cart