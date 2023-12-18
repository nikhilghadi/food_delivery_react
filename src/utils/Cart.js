import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const  addToCartApi=(email,item, quantity = 1)=>{
  return axios({
    method: 'POST',
    url:`${API_ENDPOINT}/api/add_to_cart`,
    data:{
      email:email,
      item: item,
      quantity: quantity
    }
  })
}

export const fetchCartItems=(email)=>{
  return axios({
    method: 'GET',
    url:`${API_ENDPOINT}/api/cart`,
    params:{
      email:email
    }
  })
}