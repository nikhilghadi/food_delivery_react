import React,{useState} from 'react'
import { useDispatchCart, useUser } from './ContextReducer'
import {addToCartApi} from '../utils/Cart'
export default function Card({food_item}) {
  const authToken = localStorage.getItem('authToken')
  const [quantity, setQuantity] = useState(1)
  const [type, setType] = useState('')
  let dispatch = useDispatchCart()
  const data = useUser()
  const addToCart=async()=>{
    await dispatch({type:'ADD',food_item})
    addToCartApi(data.email, food_item)
  }
  return (
    <div className='flex flex-col w-60 rounded-lg m-2' >
     
        <img className='rounded-sm w-64 h-64' src={food_item?.img}  />
  
      <div className='p-5 flex flex-col shadow rounded-sm'>
        <h5 className='text-xl font-medium'>{food_item?.name}  </h5>
        <p className='text-sm'>{food_item?.description}  </p>
        <span className='text-lg font-normal'>
          {food_item.price} Rs
        </span>
        {
          authToken &&
          <div className='mt-2 flex flex-row justify-between'>
            <button onClick={addToCart} className='bg-red-200 hover:bg-red-400 p-2 rounded-sm	'>
              Add To Cart
            </button>
            <button className='bg-red-200 hover:bg-red-400 p-2 rounded-sm	'>
              Buy now
            </button>
          </div>
        }
        
      </div>

    </div>
  )
}
