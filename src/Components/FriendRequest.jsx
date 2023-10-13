import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import { getDatabase, ref, onValue, remove,set,push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const FriendRequest = () => {
  const [friendReqList, setFriendReqList] = useState([]);
  const currentUser = useSelector((state) => state.loginUser.value);
  console.log(currentUser.uid)
  const db = getDatabase();


  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val())
        if (item.val().whoReceivedId === currentUser.uid) {
          arr.push({...item.val(),frid:item.key});
        }
    });
    setFriendReqList(arr);
    });
  }, []);
const handleDelete=(item)=>{
  console.log(item.frid)
  remove(ref(db,'friendRequest/' + item.frid))

}
const handleAccept=(items)=>{
  console.log(items)
  set(push(ref(db, 'friends/')), {
   ...items
  }).then(()=>{
    remove(ref(db,'friendRequest/' + items.frid))
  })
}


  console.log(friendReqList);
  return (
    <div className="box scroll-container">
      <div className="group-heading">
        <h3>Friend Request</h3>
        <Button>Create Account</Button>
      </div>
      {friendReqList.map((items,index)=><div key={index} className="group-card-body">
        <div className="profile">
          <img src={profile} alt="" />
        </div>

        <div className="title">
          <h4 className="groupsName">{items.whoSendName}</h4>
          <p className="messageTitle">Hi Guys, Wassup!</p>
        </div>
        <Button onClick={()=>handleAccept(items)} className="joinBtn">A</Button>
        <Button className="addBtn" onClick={()=>{handleDelete(items)}} >D</Button>
      </div>)}
    </div>
  );
};

export default FriendRequest;
