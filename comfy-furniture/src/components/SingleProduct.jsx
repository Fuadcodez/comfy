import React, { useEffect } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from '../store';
import './app.css'
const SingleProduct = ({sys, fields, productFilter, setProductFilter}) => {
     const {title, price} = fields
     const image = fields.image.fields.file.url
     const id = sys.id
    const allProducts = useCartStore(state => state.allProducts)
    const setCartState= useCartStore(state => state.setCartState)
    const addToCart = (id)=>{
        const product = allProducts.find(product => product.sys.id === id)
        console.log(product)
        const newProduct = {...product, "number": 1}
        setProductFilter([...productFilter, newProduct])
        console.log(productFilter)
        localStorage.setItem("filteredProduct", JSON.stringify([...productFilter, newProduct]))
    }
    
  return (
      <>
           <article className="product">
                <div className="img-container">
                    <img src={`${image}`} alt={`${title}-image`} className="product-img"/>
                    <button className={`bag-btn flex items-center gap-3 disabled:text-black/50 disabled:hover:text-[#fff] hover:text-[#fff]`}  onClick={()=> (addToCart(id) ,setCartState(true))} disabled={productFilter.find(product => product.sys.id === id)? true: false}>
                        { productFilter.find(product => product.sys.id === id) ? "IN CART" : <><FaShoppingCart/> add to Cart</> }
                    </button>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center mt-4'>
                <h3 className='text-[1.1rem] capitalize tracking-[0.1rem] font-semibold' >{title}</h3>
                <h4 className='text-[#f09d51] tracking-[0.1rem] font-semibold'>${price}</h4>
                </div>
            </article>
            </>
  )
}

export default SingleProduct