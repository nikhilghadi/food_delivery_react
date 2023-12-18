import React,{useState, useEffect} from 'react'
import Card from './Card'
import Carousel from './Carousel'
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export default function Body() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])

  useEffect( ()=>{
    let res =  fetch(`${API_ENDPOINT}/api/food_data`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      },
    }).then((data, err)=>{
      data.json().then((data)=>{
        setFoodItems(data[0])
        setFoodCat(data[1])
      })
    })
   
  },[])
  

  return (
    <>
    <Carousel/>
    <div className='flex flex-wrap m-3 mr-24 ml-24'>
      
      {
        foodItems.map((food_item,i)=><Card food_item={food_item} key={food_item.id}/>)
      }
      
    

    </div>
    </>
    
  )
}
