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
function App() {
 
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration></Registration>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<RootLayout></RootLayout>}>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/message" element={<Msg></Msg>}></Route>
        <Route path="/notification" element={<Notification></Notification>}>
          
        </Route>
        </Route>
      </Route>
    )
  );

  return <div className="App">
  
  <RouterProvider router={route}></RouterProvider>
  <ToastContainer />
  </div>;
}

export default App;
