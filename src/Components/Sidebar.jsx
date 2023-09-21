import React, { useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AiOutlineHome, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { useSelector,useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { logUser } from '../slice/UserSlice';

const Sidebar = () => {
  const userData=useSelector((state)=>state.loginUser.value)
 const auth = getAuth();
const navigate=useNavigate()
const dispatch=useDispatch()
const isLoginUserData=useSelector((state)=>(state.loginUser.value))
const handleSignOut=()=>{
    signOut(auth).then(() => {
        dispatch(logUser(null))
        localStorage.removeItem("userInfo")
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
         <div className="navbar">
        <div className="navbar-container">
        <div className='navbarImg'>
                <img src={isLoginUserData?.photoURL} alt="" />
                <p className="author">{isLoginUserData?.displayName.split(" ").slice(0,2).join(" ")}</p>
            </div>
            <ul className='list'>
            <li><NavLink className="icon" to="/home"><AiOutlineHome></AiOutlineHome></NavLink></li>
            <li><NavLink className="icon" to="/message"><AiFillMessage></AiFillMessage></NavLink></li>
            <li><NavLink className="icon"  to="/notification"><IoIosNotifications></IoIosNotifications></NavLink></li>
            <li><NavLink className="icon"  to="/setting"><AiFillSetting></AiFillSetting></NavLink></li>
            <li onClick={handleSignOut}><NavLink className="logout" ><VscSignOut></VscSignOut></NavLink></li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Sidebar