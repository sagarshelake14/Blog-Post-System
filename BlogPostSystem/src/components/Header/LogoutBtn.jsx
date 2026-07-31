import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'  // service
import logout from '../../store/authSlice' // state

function LogoutBtn() {

  const dispatch = useDispatch();

  const logoutHandler = () => {
         authService.logout()  // it returns a promises
         .then(() => (
                  dispatch(logout())
         ))
         .catch(() => (
                  console.log("logout button is not working properly")
         ))
  }

  return (
         <button onClick={logoutHandler}
         className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
         >Logout</button>
  )
  
}

export default LogoutBtn