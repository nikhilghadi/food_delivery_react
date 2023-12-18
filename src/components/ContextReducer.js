import { createContext, useContext, useReducer } from "react"

const CartStateContext=createContext()
const CartDispatchContext  = createContext();

const reducer =(state, action)=>{
  switch (action.type) {
    case 'ADD':
      return [...state,action.food_item]
      break;
    case 'ADD_MANY':
        return action.food_item
        break;
    case 'REMOVE':
      let newArr = [...state]
      newArr.splice(action.index,1)
      return newArr;
    case 'DROP':
      return [];
      break;
    default:
      return [];
      break;
  }
}
export const CartProvider =({children})=>{
  const [state, dispatch] = useReducer(reducer,[])
  return(
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = ()=> useContext(CartStateContext)
export const useDispatchCart = ()=> useContext(CartDispatchContext)

const UserStateContainer = createContext()
const UserDispatchContainer = createContext()

const userReducer = (state, action)=>{
  switch(action.type){
    case 'ADD':
      return action.json
      break;
    default:
      break
  }
}

export const UserProvider = ({children})=>{
  const [state, dispatch] = useReducer(userReducer,[])
  return(
    <UserDispatchContainer.Provider value={dispatch}>
      <UserStateContainer.Provider value={state}>
        {children}
      </UserStateContainer.Provider>
    </UserDispatchContainer.Provider>
  )
}
export const useUser = ()=>useContext(UserStateContainer)
export const useDispatchUser = ()=>useContext(UserDispatchContainer)