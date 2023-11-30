import React,{useEffect, useState} from 'react'
import { useUser } from '../components/ContextReducer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function Order() {
  const [orders, setOrders] = useState([])
  const data = useUser()
  useEffect(()=>{
    if(data?.email)
    fetch('http://3.108.220.147:3001/api/my_orders?'+new URLSearchParams({
      email:data.email,
  }),{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        'Accept':'*/*',
        'User-Agent':'Thunder Client (https://www.thunderclient.com)'
      },
    }).then((data, err)=>{
      data.json().then((data)=>{
        setOrders(data.orders.orders)
      })
    })
  },[])
  return (
    <div>
      <Navbar/>
      <div className=' m-3 mr-24 ml-24'>

      {
        
        orders.map((order,i)=>{
          return <div key={i}>
          {
            order.order_date ?
            <div className='p-3 border-2 flex justify-between bg-red-100 rounded-full' ><span>{order.order_date}</span>
            <span>{order.total || 0} Rs.</span></div>
: ''
          }
          <div className='p-3 ml-5'>{order.name}</div>

          </div>
        })
      }
      </div>
      <Footer/>
    </div>

  )
}
