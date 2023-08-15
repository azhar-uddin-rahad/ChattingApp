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
function App() {
 
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration></Registration>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Route>
    )
  );

  return <div className="App">
  
  <RouterProvider router={route}></RouterProvider>
  <ToastContainer />
  </div>;
}

export default App;
