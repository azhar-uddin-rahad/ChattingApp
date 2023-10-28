import React from 'react'
import Grid from '@mui/material/Grid';
import Group from '../Components/Group';
import FriendsList from '../Components/FriendsList';
import UserList from '../Components/UserList';
import FriendRequest from '../Components/FriendRequest';
import MyGroup from '../Components/MyGroup';
import BlockedUser from '../Components/BlockedUser';
import GroupMsg from '../Components/GroupMsg';
import Chatbox from '../Components/Chatbox';
const Msg = () => {
  return (
    <div>
       <Grid container spacing={2}>
        <Grid item xs={4}>
        <FriendsList buttons="msg"></FriendsList>
        <GroupMsg/>
        </Grid>
        <Grid item xs={8}>        
       < Chatbox/> 
        </Grid>
          
      </Grid>
       
    </div>
  )
}

export default Msg