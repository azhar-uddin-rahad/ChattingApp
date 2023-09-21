import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import Sidebar from '../Components/Sidebar';
const RootLayout = () => {
   
    return (
        <div>
             <Grid container spacing={2}>
          <Grid item xs={2}>
          <Sidebar></Sidebar>
        </Grid>
        <Grid item xs={10}>
        <Outlet></Outlet>
        </Grid>
        </Grid>
        
        </div>
    );
};

export default RootLayout;