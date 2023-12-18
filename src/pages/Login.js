import React,{useState} from 'react'
import Logo from '../assets/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatchUser, useDispatchCart } from '../components/ContextReducer'
import {fetchCartItems} from '../utils/Cart'
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export default function Login() {
  const [credentials, setCredentials] = useState({email:'',password:''})
  const navigate = useNavigate()
  let dispatch = useDispatchUser()
  let cartDispatch = useDispatchCart()
  const handleSubmit= async(e)=>{ 
    e.preventDefault()
    const response = await fetch(`${API_ENDPOINT}/api/login`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(credentials)
    })
    const json = await response.json()
    if (json.success){
      // alert("Done")
      dispatch({type:'ADD',json})
      localStorage.setItem('authToken',json.authToken)
      fetchCartItems(json.email).then((res)=>{
        cartDispatch({type:'ADD_MANY',food_item:res.data.cart_items.cart_items})
      })
      navigate('/')
    }else{
      alert(json.message)
    }
  }
  const handleChange=(e)=>{ 
    const {name, value} = e.target 
    let hash = {}
    hash[name] = value
    setCredentials({...credentials, ...hash})
  }
  return (
    <div>
      <section className="bg-white-50 dark:bg-white">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center  text-2xl font-semibold">
          <img className="w-36 h-30 mr-2" src={Logo} alt="logo"/>
      </a>
      <div className="w-full bg-red-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-transparent">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                 Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit} onChange={handleChange}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                      <input value={credentials.email} type="email" name="email" id="email" className="bg-gray-50 border border-white-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-200 dark:border-white-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-green-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-whiblackte">Password</label>
                      <input value={credentials.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-white-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-200 dark:border-white-600 dark:placeholder-white-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-white-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-red-400 dark:border-white-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-black-500 dark:text-black-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                  <p className="text-sm font-light text-black-500 dark:text-black-400">
                      Don't have an account? 
                      <Link to={'/sign_up'} className={"font-medium text-primary-600 hover:underline dark:text-primary-500"}>Create account</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}
