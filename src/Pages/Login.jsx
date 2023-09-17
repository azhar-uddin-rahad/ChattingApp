import React, { useState } from "react";
import Image from "../Components/Image";
import log from "../assets/log.png";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {getAuth, signInWithEmailAndPassword,FacebookAuthProvider,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import google from '../assets/image 4 (1).png'
import {FaFacebook} from 'react-icons/fa'
import { useDispatch } from "react-redux";
import { logUser } from "../slice/UserSlice";
const Login = () => {
    const auth = getAuth();
    const navigate=useNavigate();
    const dispatch=useDispatch()

const [loader, setLoader] = useState(false);
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });
  const [faUser,setFaUser]=useState(null)
  const [notificationBackgroundColor, setNotificationBackgroundColor] = useState({
    success : "#5F35F5",
    error: "#fff"
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setError({ ...error, emailError: "" });
    }
    if (e.target.name === "password") {
      setError({ ...error, passwordError: "" });
    }
  };
  const handleLogin = () => {
    const newError = {};
    if (!fromData.password) {
      newError.passwordError = "Password is required";
    }
    if (!fromData.email) {
      newError.emailError = "Email is required";
    }
    setError({
      ...error,
      ...newError,
    });
    if (fromData.email && fromData.password) {
        setLoader(true)
      signInWithEmailAndPassword(auth, fromData.email, fromData.password)
        .then((user) => {
       
        setLoader(false);
        if(user.user.emailVerified){
            setFromData({
                email: "",
                password: "",
              });
            toast.success(`Login Successful!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: { '--dynamic-bg-color': notificationBackgroundColor.success },
              })
              
              setTimeout(()=>{
                navigate("/home")
                dispatch(logUser(user.user))
              },1000)
        }
        else{
                setLoader(false);
                toast.error(`Please Verify Your Email`, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  style: { '--dynamic-bg-color':  notificationBackgroundColor.error}
                     
                })
              
               
        }
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);   

          if(errorCode.includes("auth")){
            console.log("Hello world")
            setLoader(false);
            toast.error(`${errorCode}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: { '--dynamic-bg-color':  notificationBackgroundColor.error}
            })
           }
        });
    }
  };
const handleFaLogin=async()=>{
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // Update the user state
    setFaUser(user);

    console.log('Facebook user:', user);
    console.log('Access token:', accessToken);
  }
  catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/popup-closed-by-user') {
      console.log('User closed the popup');
    } else {
      console.error('Error code:', errorCode);
      console.error('Error message:', errorMessage);
    }
  }
  console.log('Current faUser:', faUser);
};
const singUpWithGoogle=()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user)
   
  }).catch((error) => {
   
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
      console.log(errorMessage)
 
  });

}

  return (
    <div className="authenticationPage">
      <div className="left">
        <div className="text-container">
          <h1>Login to your account!</h1>

          <p>Free register and you can enjoy it</p>
          <TextField
            type="text"
            onChange={(e) => handleChange(e)}
            name="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            className="inputCss"
          />
          {error.emailError && (
            <Alert severity="error" className="mt-2">
              {error.emailError}
            </Alert>
          )}

          <TextField
            type={open ? "text" : "password"}
            onChange={(e) => handleChange(e)}
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="inputCss"
          />
          {open ? (
            <AiFillEye
              onClick={() => setOpen(false)}
              className="eye"
            ></AiFillEye>
          ) : (
            <AiFillEyeInvisible
              onClick={() => setOpen(true)}
              className="eye"
            ></AiFillEyeInvisible>
          )}

          {error.passwordError && (
            <Alert severity="error" className="mt-2">
              {error.passwordError}
            </Alert>
          )}

{loader ? (
            <Button className="SignUpBtn">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleLogin}
              className="SignUpBtn"
            >
              Login to Continue
            </Button>
          )}
         
          <Typography variant="p" component="p" className="semiText">
            Don’t have an account ? <Link className="orange" to="/"> Sign up</Link>
          </Typography>
        <div className="loginWithAccount">
            <button onClick={singUpWithGoogle}><img src={google} alt="" /></button>
            <button onClick={handleFaLogin}><FaFacebook></FaFacebook></button>
        </div>
        </div>
      </div>
      <div className="right">
        <Image ImgSrc={log} className={"bg"}></Image>
      </div>
    </div>
  );
};

export default Login;
