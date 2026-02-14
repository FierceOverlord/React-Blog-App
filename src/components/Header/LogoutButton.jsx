import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutButton() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-2 hover:bg-blue-200 rounded-full duration-200'
        onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutButton