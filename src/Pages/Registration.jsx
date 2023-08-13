import React, { useState } from "react";
import Image from "../Components/Image";
import reg from "../assets/reg.png";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Registration = () => {
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);

  const [fromData, setFromData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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
    }
  };
  return (
    <div className="authenticationPage">
      <div className="left">
        <div className="text-container">
          <h1>Get started with easily register</h1>

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
             <AiFillEye onClick={()=>setOpen(false)} className="eye"></AiFillEye>
          ) : (
            <AiFillEyeInvisible onClick={()=>setOpen(true)} className="eye"></AiFillEyeInvisible>
          )}
          {passwordError && (
            <Alert severity="error" className="mt-2">
              {passwordError}
            </Alert>
          )}
          

          <Button
            variant="contained"
            onClick={handleRegistration}
            className="SignUpBtn"
          >
            Sign up
          </Button>
          <Typography variant="p" component="p" className="semiText">
            Already have an account ? <Link className="orange">Sign In</Link>
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
