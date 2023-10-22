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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const MyGroup = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [myGroupList, setMyGroupList] = useState([]);
  const [myGroupListReq, setMyGroupListReq] = useState([]);
  const db = getDatabase();
  const currentUser = useSelector((state) => state.loginUser.value);
  const handleOpen = (groupInfo) => {
    const groupRef = ref(db, "joinGroupRequest/");
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (
          currentUser.uid === item.val().adminId &&
          item.val().groupId === groupInfo.groupId
        ) {
          arr.push({...item.val(),groupReqId:item.key});
        }
      });
      setMyGroupListReq(arr);
    });

    setOpen(true);
  };

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

  const handleGroupReqAccept=(item)=>{
    // console.log(item)
    set(push(ref(db, 'groupMembers/')), {
     ...item
    }).then(()=>{
      remove(ref(db,'joinGroupRequest/' + item.groupReqId))

    });
  }
  
  const handleGroupReqDelete=(item)=>{
    // console.log(item.groupReqId)
    remove(ref(db,'joinGroupRequest/' + item.groupReqId))

  }



  return (
    <div className="box scroll-container">
      <div className="group-heading">
        <h3>My Group</h3>
        <Button>
          <BsThreeDotsVertical></BsThreeDotsVertical>
        </Button>
      </div>
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
            onClick={() => {
              handleOpen(item);
            }}
            variant="contained"
            sx={{ padding: "0px 10px", backgroundColor: "#5f35f5" }}
          >
            Request
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                      sx={{
                        display: "block",
                        fontSize: "24px",
                        borderBottom: "1px solid gray",
                        padding: "10px",
                      }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Join Request
                    </Typography>
                {myGroupListReq.map((item, index) => (
                  <>
                    
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.userName}`}
                        secondary={
                          <React.Fragment>
                            {" — This user wants to join This group…"}

                            <div style={{marginTop: "10px"}}>
                            <Button onClick={()=>handleGroupReqAccept(item)} variant="contained" sx={{marginLeft: "5px",
                                padding: "0px 10px",
                                backgroundColor: "green",
                                color:"white"
                              }}
                            >
                              Accept
                            </Button>
                            <Button onClick={()=>handleGroupReqDelete(item)} variant="contained" sx={{marginLeft: "5px",
                                padding: "0px 10px",
                                backgroundColor: "red",
                                color:"white"
                              }}
                            >
                              Delete
                            </Button>
                            </div>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))}
              </List>
            </Box>
          </Modal>
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
  );
};

export default MyGroup;
