import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Home from "./Pages/Home";
import RootLayout from "./RootLayout/RootLayout";
import Msg from "./Pages/Msg";
import Notification from "./Pages/Notification";
import Setting from "./Pages/Setting";
import Switch from '@mui/material/Switch';
import { useState } from "react";
function App() {
 const [dark,setDark]=useState(false);
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration></Registration>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<RootLayout></RootLayout>}>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/message" element={<Msg></Msg>}></Route>
        <Route path="/setting" element={<Setting></Setting>}></Route>
        <Route path="/notification" element={<Notification></Notification>}> 
        </Route>
        </Route>
      </Route>
    )
  );
  const handleTheme=(e)=>{
    console.log(e.target.value);
    if(dark){
      setDark(false)
      console.log("light")
    }
    else{
      setDark(true)
     
      console.log("dark")
    }
 }

  return <div className="App">
   <Switch onChange={(e)=>{handleTheme(e)}} className="switchBtn" />
  <div className={`${dark ? "dark" : ""}`}>
  <RouterProvider router={route}></RouterProvider>
  </div>
  <ToastContainer />
  </div>;
}

export default App;
