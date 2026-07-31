import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true); // conditional rendering
  const dispatch = useDispatch();

  // getting a current user
  useEffect(() => {
    authService.getCurrentUser()   // getCurrentUser() is service
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));  // login() is state
      } else{
        dispatch(logout());       //logout() is also state
      }
    })
    .finally(() => setLoading(false));  
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         TODO : {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ): null 
}

export default App
