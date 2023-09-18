import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
const RootLayout = () => {
    const userData=useSelector((state)=>state.loginUser.value)
    return (
        <div>
             <Grid container spacing={2}>
        <Grid item xs={1}>
          <h1>{userData.displayName}</h1>
          <img src={userData?.photoURL} alt="" />
        </Grid>
        <Grid item xs={11}>
        <Outlet></Outlet>
        </Grid>
        </Grid>
        
        </div>
    );
};

export default RootLayout;