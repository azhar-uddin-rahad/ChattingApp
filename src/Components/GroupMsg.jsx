import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import profile from "../assets/profile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { activeChatMessage } from "../slice/ActiveChatSlice";

const GroupMsg = () => {
  const db = getDatabase();
  const dispatch=useDispatch()
  const currentUser = useSelector((state) => state.loginUser.value);
  
  const [myGroupList, setMyGroupList] = useState([]);
  const [myGroupMember, setMyGroupMember] = useState([]);
  useEffect(() => {
    const groupRef = ref(db, "Group/");
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupId: item.key });
      });
      setMyGroupList(arr);
    });
  }, []);

  useEffect(() => {
    const groupMemberRef = ref(db, "groupMembers/");
    onValue(groupMemberRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        console.log(item.val())
        arr.push(item.val());
      });
      setMyGroupMember(arr);
    });
  }, []);
  const handleGroupMessage=(item)=>{
      console.log(item)
      dispatch(activeChatMessage({
        type : "groupMsg",
        name : item.groupName,
        id :item.groupId
      }))
      localStorage.setItem("activeChat",JSON.stringify({
        type : "groupMsg",
        name : item.groupName,
        id :item.groupId
      }))

  }
  return (
    <div className="box scroll-container">
      <div className="group-heading">
      <h3>Groups List</h3>
      </div>
        {myGroupList.map((item, index) => 
          currentUser.uid == item.adminId ? (
          <div key={index} className="group-card-body">
            <div className="profile">
              <img src={profile} alt="" />
            </div>
            <div className="title">
              <p className="messageTitle">Admin :{item.adminName}</p>
              <h4 className="groupsName">{item.groupName}</h4>
              <p className="messageTitle">{item.groupTagLine}</p>
            </div>
            <Button
              variant="contained"
              sx={{ padding: "0px 10px", backgroundColor: "#5f35f5" }}
              onClick={()=>handleGroupMessage(item)}
            >
              Admin
            </Button>

           
          </div>
        ) : myGroupMember.map((member,idx)=>(
          currentUser.uid == member.userId && item.groupId === member.groupId &&  <div key={index} className="group-card-body">
          <div className="profile">
            <img src={profile} alt="" />
          </div>
          <div className="title">
            <p className="messageTitle">Admin :{member.adminName}</p>
            <h4 className="groupsName">{member.groupName}</h4>
            <p className="messageTitle">{member.groupTagLine}</p>
          </div>
          <Button
            variant="contained"
            sx={{
              marginLeft: "5px",
              padding: "0px 10px",
              backgroundColor: "#5f35f5",
            }}
            onClick={()=>handleGroupMessage(item)}
          >
            Member
          </Button>
        </div>
        )))}
       

     
    </div>
  );
};

export default GroupMsg;
