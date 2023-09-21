import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import { IoMdAdd } from "react-icons/io";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  const [user,setUser]=useState([]);
  const currentUser=useSelector((state)=>state.loginUser.value);
  console.log()
  useEffect(()=>{
    const listUser = ref(db, 'users/');
onValue(listUser, (snapshot) => {
   let arr=[]
  snapshot.forEach((item)=>{
   if(currentUser.uid != item.key){
     arr.push(item.val())

   }
  })
  setUser(arr)
  
});

  },[])
   
  return (
    <div className="box">
      <div className="group-heading">
        <h3>User List</h3>
        <Button>Create Account</Button>
      </div>
          {user.map((item,index)=><><div key={index} className="group-card-body">
             <div className="profile">
               <img src={item.photoURL} alt="" />
             </div>
             <div className="title">
               <h4 className="groupsName">{item.username}</h4>
               <p className="messageTitle">Chat Me Now</p>
             </div>
             
              <Button className="addBtn" >
              <IoMdAdd className="addIcon" />
            </Button>
            
            
           
           </div>
          
          
          </>)

          }
             
       
      
    </div>
  );
};

export default UserList;
