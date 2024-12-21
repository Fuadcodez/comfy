import React from 'react'
import SingleProduct from './SingleProduct'
import {useCartStore} from '../store'
const Main = ({productFilter, setProductFilter}) => {
  const allProducts = useCartStore(state => state.allProducts)
  

  return (
    <section className="py-[4rem]">
        <div>
            <h2 className='text-center text-[2.5rem] mb-[5rem] capitalize tracking-[0.1rem] font-semibold'>our products</h2>
        </div>
        <div className="products-center w-[90vw] my-0 mx-auto max-w-[1170px] grid md:grid-cols-custom gap-x-[1.5rem] gap-y-[2rem]">
        {allProducts.map((product, index)=>(
       <SingleProduct key={product.sys.id} {...product} productFilter={productFilter } setProductFilter={setProductFilter}/>
        ))}
        </div>
    </section>
  )
}

export default Main