import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.jpg'
import Search from './Search'
import { useCart, useUser, useDispatchCart } from './ContextReducer'
import Modal from '../Modal'
import Cart from '../pages/Cart'
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export default function Navbar() {
  const [viewCart, setViewCart] = useState(false)
  const list_class = 'p-3 cursor-pointer hover:bg-red-200 grid place-content-center hover:border-2'
  const authToken = localStorage.getItem('authToken')
  const navigate = useNavigate()
  const handleLogout =()=>{
    localStorage.removeItem("authToken")
    navigate('/login')
  }
  let data = useCart()
  let user = useUser()
  let dispatch = useDispatchCart()
  const checkOut = async()=>{
    let response = await fetch(`${API_ENDPOINT}/api/create_order`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email: user.email,
        orders: data,
        order_date: new Date().toDateString()
      })
    });
    const json = await response.json()
    if (json.success){
      dispatch({type:'DROP'})
    }
  }

  return (
    <div className="justify-between flex shadow">
      <ul className='flex   w-4/6'>
        <Link to={'/'}  className={''}>
          <img className='w-20' src={Logo} />
        </Link>
        <Link to={'/'}  className={list_class}>Home</Link>
        {
          authToken
          &&
          <Link to={'/orders'} className={list_class}>My Orders</Link>
        }
        
       
      </ul>
      <div className='flex  w-4/6 justify-between items-center'>      
{viewCart ? <Modal  onClose={()=>{setViewCart(false)}} handleClick={()=>{checkOut()}}>
  <Cart></Cart>
</Modal>: ''}
      <Search/>
      {
         authToken?
         <>
         Hello {user.name}
         <span onClick={()=>{setViewCart(true)}} className={list_class + " relative h-full"}>My Cart <sapn className="absolute top-0 right-2  ">{data?.length}</sapn></span>        
          <div onClick={handleLogout} className={"px-4 py-2 font-semibold text-sm bg-red-300 text-white rounded-full shadow-sm h-10 cursor-pointer"} > Sign Out</div>       
         </>
         :
         <div className='flex '>
         <Link to={'/sign_up'} className={'mr-5'}>
         <div className={"px-4 py-2 font-semibold text-sm bg-red-300 text-white rounded-full shadow-sm h-10 cursor-pointer"}> Sign UP</div>

         </Link>
         <Link to={'/login'} className={''}>
         <div className={"px-4 py-2 font-semibold text-sm bg-red-300 text-white rounded-full shadow-sm h-10 cursor-pointer"}> Login</div>

         </Link>
          </div>

      }


      </div>

    </div>
  )
}
