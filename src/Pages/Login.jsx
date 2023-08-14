import React, { useState } from 'react';
import Image from '../Components/Image';
import log from "../assets/log.png";
import { Alert, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai';

const Login = () => {
    const [fromData,setFromData]=useState({
        email: "",
        password:""
    })
    const [error,setError]=useState({
        emailError : "",
        passwordError: ""
    })
    const [open,setOpen]=useState(false)
    const handleChange=(e)=>{
        setFromData({
            ...fromData,
            [e.target.name] : e.target.value
        })
        if(e.target.name === "email"){
            setError({...error,emailError:""})
        }
        if(e.target.name === "password"){
            setError({...error,passwordError:""})
        }
    }
    const handleLogin=()=>{        
        const newError = {};
        if (!fromData.password) {
            newError.passwordError = "Password is required";
        }
        if (!fromData.email) {
            newError.emailError = "Email is required";
        }
        setError({
            ...error,
            ...newError
        });
    }

  return (
    <div className='authenticationPage'>
    <div className='left'>
        <div className='text-container'>
            <h1>Login to your account!</h1>

            <p>Free register and you can enjoy it</p>   
            <TextField type='text' onChange={(e)=>handleChange(e)} name='email' id="outlined-basic" label="Email Address" variant="outlined"  className='inputCss'/>
            {error.emailError && <Alert severity="error" className="mt-2">
              {error.emailError}
            </Alert>

            }

            <TextField type='password' onChange={(e)=>handleChange(e)} name='password' id="outlined-basic" label="Password" variant="outlined"  className='inputCss'/>
            {open ? (
             <AiFillEye onClick={()=>setOpen(false)} className="eye"></AiFillEye>
          ) : (
            <AiFillEyeInvisible onClick={()=>setOpen(true)} className="eye"></AiFillEyeInvisible>
          )}
           
            {error.passwordError && <Alert severity="error" className="mt-2">
              {error.passwordError}
            </Alert>}
            <Button variant="contained" onClick={handleLogin} className='SignUpBtn'>Login to Continue</Button>
            <Typography variant="p" component="p" className='semiText'>Don’t have an account ? <Link className='orange'> Sign up</Link></Typography>
        </div>
    </div>
    <div className='right'>
        <Image ImgSrc={log} className={"bg"}></Image>
    </div>
    
</div>
  )
}

export default Login