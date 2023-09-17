import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logUser } from '../slice/UserSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
const auth = getAuth();
const navigate=useNavigate()
const dispatch=useDispatch()
const isLoginUserData=useSelector((state)=>(state.loginUser.value))
const handleSignOut=()=>{
    signOut(auth).then(() => {
        dispatch(logUser(null))
        navigate("/login")
      })
}
useEffect(()=>{
  if(isLoginUserData == null){
    navigate("/login")
  }
  
},[isLoginUserData])

  return (
    <div>
        <Button onClick={handleSignOut} variant="contained">Sign Out</Button>
        <Button  variant="contained"><Link to="/">reg</Link></Button>
    </div>
  )
}

export default Home