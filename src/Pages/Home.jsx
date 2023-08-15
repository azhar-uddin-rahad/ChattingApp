import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Home = () => {
const auth = getAuth();
const navigate=useNavigate()

const handleSignOut=()=>{
    signOut(auth).then(() => {
        navigate("/login")
      })
}
  return (
    <div>
        <Button onClick={handleSignOut} variant="contained">Sign Out</Button>
    </div>
  )
}

export default Home