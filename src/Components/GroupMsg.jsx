import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import profile from "../assets/profile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const GroupMsg = () => {
    const db = getDatabase();
  const currentUser = useSelector((state) => state.loginUser.value);
  const [open, setOpen] = useState(false);
  const [myGroupList, setMyGroupList] = useState([]);
  const [myGroupListReq, setMyGroupListReq] = useState([]);
  const [myGroupMember,setMyGroupMember]=useState([]);
  useEffect(() => {
    const groupRef = ref(db, "Group/");
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (currentUser.uid == item.val().adminId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setMyGroupList(arr);
    });
  }, []);
  return (
    <div className="box scroll-container">
    <div className="group-heading">
         {myGroupList.map((item, index) => (
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
          >
            Request
          </Button>
        
            
          <Button
            
            variant="contained"
            sx={{
              marginLeft: "5px",
              padding: "0px 10px",
              backgroundColor: "#5f35f5",
            }}
          >
            Member
          </Button>

         
    </div>

        ))}
        </div>
  
</div>
  
  
  
  )}

export default GroupMsg