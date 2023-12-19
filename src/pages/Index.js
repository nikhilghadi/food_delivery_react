import React, { useEffect, useContext } from 'react';
import Home from './Home'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import Cart from './Cart';
import Order from './Order';
import {VerifyToken} from '../utils/User'
import {fetchCartItems} from '../utils/Cart'
import { useDispatchUser,useDispatchCart } from '../components/ContextReducer'
function Index() {
  const dispatch = useDispatchUser()
  const cartDispatch = useDispatchCart()
  useEffect(()=>{
    const token = localStorage.getItem('authToken');
    if (token){
      VerifyToken(token).then((res)=>{
        dispatch({type:'ADD',json:res.data})
        fetchCartItems(res.data.email).then((res)=>{
          cartDispatch({type:'ADD_MANY',food_item:res.data.cart_items.cart_items})
        })
      })
    }
  },[])
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/cart"} element={<Cart/>}/>
            <Route path={"/orders"} element={<Order/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/sign_up"} element={<SignUp/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default Index;
