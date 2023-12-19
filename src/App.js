import React, { useEffect, useContext } from 'react';
import './App.css';
import Home from './pages/Home';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Order from './pages/Order';
import { CartProvider } from './components/ContextReducer';
import { UserProvider} from './components/ContextReducer'
import {VerifyToken} from './utils/User'
import { useDispatchUser } from './components/ContextReducer'
import Index from './pages/Index';
function App() {
  return (
    <CartProvider>
      <UserProvider>
        <Index/>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
