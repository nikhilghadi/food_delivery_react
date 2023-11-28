import React, { useState } from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
export default function Cart() {
  let data = useCart()||[]
  let dispatch = useDispatchCart()
  const total = data.reduce((a,b)=>a+b.price,0)
  if (data.length == 0){
    return (<div>Data not available</div>)

  }
  return (
    <div>
      <table class="table-fixed">
        <thead>
          <tr>
            <th className='w-50 '>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>

          </tr>
        </thead>
        <tbody >
          {
            data.map((item, index)=>{
              return <tr key={'item_'+item.id}>
                <td>{item.name}</td>
                <td>{1}</td>
                <td>{item.price}</td>
                <td><span onClick={()=>dispatch({type:"REMOVE",index: index})}>Remove</span></td>

              </tr>
            })
          }
          <tr className='border-t-0'>

          <td className="font-bold">
            Total
          </td>
          <td>

          </td>
          <td>
            {total}
          </td>
          </tr>
          
        </tbody>
      </table>

    </div>
  )
}
