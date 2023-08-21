import React, { useState } from "react";
import Image from "../Components/Image";
import reg from "../assets/reg.png";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const auth = getAuth();
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  const [notificationBackgroundColor, setNotificationBackgroundColor] = useState({
    success : "#5F35F5",
    error: "#fff"
  });

  const [fromData, setFromData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "fullName") {
      setFullNameError("");
    }
    if (e.target.name == "email") {
      setEmailError("");
    }
    if (e.target.name == "password") {
      setPasswordError("");
    }

    /*
       when value input any filed then all error gone
       setFullNameError("")
       setPasswordError("")
       setEmailError("") */
  };
  const handleRegistration = () => {
    if (!fromData.fullName) {
      setFullNameError("Full Name is Required");
    }
    if (!fromData.email) {
      setEmailError("Email is Required");
    }
    if (!fromData.password) {
      setPasswordError("Password is Required");
    }
    if (fromData.fullName && fromData.email && fromData.password) {
      /* let pattern =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let passwordRegex= /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if(!pattern.test(fromData.email)){
                setEmailError("Please Enter a Valid email")
            }
            if(!passwordRegex.test(fromData.password)){
                setPasswordError("password not strong")
            }
            if(fromData.fullName.length > 3 && fromData.fullName.length< 30){
                setFullNameError("Enter Valid Name")
            } */
      
       const { email, password } = fromData;
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {  
          sendEmailVerification(auth.currentUser).then(() => {
            setFromData({
              fullName: "",
              email: "",
              password: "",
            });
               setLoader(false);
                toast.success(`Registration Successful! Please Verify Your Email`, {
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
                navigate("/login")
              },1000)   
          })
 
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          
           if(errorCode.includes("email")){
            setLoader(false);
            toast.error(`Email All Ready Exist`, {
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
            setEmailError(errorCode)
           }
          });
        
         
    }
  };
  return (
    <div className="authenticationPage">
      <div className="left">
        <div className="text-container">
          <h1>Get started with Azhar uddin rahad</h1>

          <p>Free register and you can enjoy it</p>

          <TextField
            type="text"
            onChange={handleChange}
            name="fullName"
            id="outlined-basic"
            label="fullName"
            variant="outlined"
            className="inputCss"
          />
          {fullNameError && (
            <Alert severity="error" className="mt-2">
              {fullNameError}
            </Alert>
          )}

          <TextField
            type="text"
            onChange={handleChange}
            name="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="inputCss"
          />
          {emailError && (
            <Alert severity="error" className="mt-2">
              {emailError}
            </Alert>
          )}

          <TextField
            type={open ? "text" : "password"}
            onChange={handleChange}
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
          {passwordError && (
            <Alert severity="error" className="mt-2">
              {passwordError}
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
              onClick={handleRegistration}
              className="SignUpBtn"
            >
              Sign up
            </Button>
          )}

          <Typography variant="p" component="p" className="semiText">
            Already have an account ? <Link className="orange" to="/login">Sign In</Link>
          </Typography>
        </div>
      </div>
      <div className="right">
        <Image ImgSrc={reg} className={"bg"}></Image>
      </div>
    </div>
  );
};

export default Registration;
