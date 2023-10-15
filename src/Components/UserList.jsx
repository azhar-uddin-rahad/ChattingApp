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
  const [fndRequest,setFndRequest]=useState([])
  const[fnd,setFnd]=useState([])
  const currentUser=useSelector((state)=>state.loginUser.value);
  const [blockUser,setBlockUser]=useState([])
  console.log()
  useEffect(()=>{
    const listUser = ref(db, 'users/');
onValue(listUser, (snapshot) => {
   let arr=[]
  snapshot.forEach((item)=>{
   if(currentUser.uid != item.key){
    
     arr.push({...item.val(),userId:item.key})

   }
  })
  setUser(arr)
});
  },[])
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {   
       arr.push(item.val().whoReceivedId + item.val().whoSendId);  
    });
    setFndRequest(arr);
    });
  }, []);
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {   
       arr.push(item.val().whoBlockedId + item.val().whichBlockedId);  
    });
    setBlockUser(arr);
    });
  }, []);

console.log(blockUser)

  useEffect(() => {
    const fnds = ref(db, "friends");
    onValue(fnds, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val())
       arr.push(item.val().whoReceivedId + item.val().whoSendId);
       
    });
    setFnd(arr);
    });
  }, []);
  const handleFriendRuk=(info)=>{
    
     set(ref(db, 'friendRequest/' + info.userId), {
      whoSendName: currentUser.displayName,
      whoSendId: currentUser.uid,
      whoReceivedName: info.username,
      whoReceivedId: info.userId
    }); 
    
  }
  const cancelFndReq=(item)=>{
    console.log(item.userId);
    remove(ref(db,'friendRequest/' + item.userId))

  }

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
             {fndRequest.includes(item.userId + currentUser.uid) ?
             <>
             <Button className="joinBtn" color="error" onClick={()=>{cancelFndReq(item)}}>
            cancel
           </Button>
            <Button className="addBtn"  >
            Pending
          </Button>
          </>
             :
             fndRequest.includes(currentUser.uid  + item.userId) ? 
             <Button className="addBtn"  >
             Pending
           </Button>
           : fnd.includes(item.userId + currentUser.uid) || fnd.includes(currentUser.uid + item.userId) ?
           <Button className="addBtn"  >
             Friends
           </Button>
           :
          blockUser?.includes(item.userId + currentUser.uid) || blockUser.includes(currentUser.uid + item.userId) ?
           <Button variant="contained" className="addIcon" color="error" >
             Block
           </Button>
           :
             <Button className="joinBtn" onClick={()=>{handleFriendRuk(item)}} >
             <IoMdAdd className="addIcon" />
           </Button>
            
             }
        </div>
        </>)

          }
             
       
      
    </div>
  );
};

export default UserList;
