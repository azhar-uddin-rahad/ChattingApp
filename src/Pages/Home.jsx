import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logUser } from '../slice/UserSlice';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Group from '../Components/Group';
import FriendsList from '../Components/FriendsList';
import UserList from '../Components/UserList';
import FriendRequest from '../Components/FriendRequest';
import MyGroup from '../Components/MyGroup';
import BlockedUser from '../Components/BlockedUser';

const Home = () => {
const auth = getAuth();
const navigate=useNavigate()
const dispatch=useDispatch()
const isLoginUserData=useSelector((state)=>(state.loginUser.value))


  return (
    <div>
       <Grid container spacing={2}>
        <Grid item xs={4}>
        <Group/>
        <FriendRequest></FriendRequest>
        </Grid>
        <Grid item xs={4}>
         <FriendsList></FriendsList>
         <MyGroup></MyGroup>
        </Grid>
        <Grid item xs={4} >
        <UserList></UserList>
        <BlockedUser></BlockedUser>
        </Grid>
        
      </Grid>
       
    </div>
  )
}

export default Home