import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Order from './pages/Order';
import { CartProvider } from './components/ContextReducer';
import { UserProvider} from './components/ContextReducer'
function App() {
  return (
    <CartProvider>
      <UserProvider>
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
      </UserProvider>
    </CartProvider>
  );
}

export default App;
