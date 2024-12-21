import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Main from './components/Main'
import Cart from './components/Cart'
import { useCartStore } from './store'
function App() {

const [productFilter, setProductFilter] = useState([])
// const [allProducts, setAllProducts] = useState([products])
 const setAllProducts = useCartStore(state => state.setAllProducts)
 const setTotalAmount = useCartStore(state => state.setTotalAmount)
const setCartNumber = useCartStore(state => state.setCartNumber)
//  useEffect(()=>{
//   const getProduct = async()=>{
//     const data = await fetch("/products.json")
//     const resp = await data.json()
//     const pr = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")):localStorage.setItem("products", JSON.stringify(resp))
    
//     setAllProducts(pr.items)

//   }
//   getProduct()
//  },[])
    useEffect(()=>{
        
     const getFilterProduct = ()=>{
       const filter =  localStorage.getItem("filteredProduct") ? JSON.parse(localStorage.getItem("filteredProduct")): []
       
       if(filter.length > 0){
         setProductFilter(filter)
        
       }
     }
     getFilterProduct()
     },[])
 useEffect(()=>{
  let itemAmount = 0;
  let TotalAmount = 0
  productFilter.forEach(product => itemAmount += product.number)
  console.log(itemAmount)
  setCartNumber(itemAmount)
    productFilter.forEach(product => TotalAmount+= (product.fields.price * product.number))
    const roundedAmount = parseFloat(TotalAmount.toFixed(2))
    setTotalAmount(roundedAmount)
 }, [productFilter])
  return (
    <div className='relative h-[100vh] overflow-y-auto scroll-smooth'>
      <Header/>
      <Hero/>
      <Main productFilter={productFilter } setProductFilter={setProductFilter}  />
      <Cart productFilter={productFilter } setProductFilter={setProductFilter}/>
    </div>
    
  )
}

export default App
