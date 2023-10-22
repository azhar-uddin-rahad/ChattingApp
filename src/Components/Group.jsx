import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
let groupData = [
  {
    groupName: "",
    groupTagLine: "",
  },
];
const Group = () => {
  const [groupInfo, setGroupInfo] = useState(groupData);
  const currentUser = useSelector((state) => state.loginUser.value);
  const [groupList, setGroupList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  const handleInputChange = (e) => {
    setGroupInfo({ ...groupInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(groupInfo);
    set(push(ref(db, "Group/")), {
      groupName: groupInfo.groupName,
      groupTagLine: groupInfo.groupTagLine,
      adminId: currentUser.uid,
      adminName: currentUser.displayName,
    }).then(() => {
      setOpen(false);
      setGroupInfo({
        groupName: "",
        groupTagLine: "",
      });
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "Group/");
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (currentUser.uid !== item.val().adminId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);

const handleJoinGroup = (item) => {
    set(push(ref(db, "joinGroupRequest/")), {
      adminId : item.adminId,
      adminName : item.adminName,
      groupId : item.groupId,
      groupName: item.groupName,
      userId: currentUser.uid,
      userName : currentUser.displayName
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "joinGroupRequest/");
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (currentUser.uid == item.val().userId) {
          arr.push(item.val().groupId);
        }
      });
      setGroupMemberList(arr);
    });
  }, []);


  return (
    <div className="box scroll-container">
      <div className="group-heading">
        <h3>Groups List</h3>
        <Button onClick={handleOpen} color="success">
          Create Group
        </Button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                id="margin-dense"
                margin="dense"
                label="Outlined"
                name="groupName"
                variant="outlined"
                onChange={(e) => handleInputChange(e)}
                sx={{ width: "100%" }}
              />
              <TextField
                id="margin-none"
                onChange={(e) => handleInputChange(e)}
                name="groupTagLine"
                label="Filled"
                variant="outlined"
                sx={{ width: "100%", marginTop: "20px" }}
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  marginTop: "20px",
                  padding: "20px 30px",
                  backgroundColor: "#5f35f5",
                }}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
      {groupList.map((item, index) => (
        <div key={index} className="group-card-body">
          <div className="profile">
            <img src={profile} alt="" />
          </div>
          <div className="title">
            <p className="messageTitle">Admin :{item.adminName}</p>
            <h4 className="groupsName">{item.groupName}</h4>
            <p className="messageTitle">{item.groupTagLine}</p>
          </div>
          {groupMemberList.indexOf(item.groupId) != -1 ? 
          <Button
          onClick={() => handleJoinGroup(item)}
          variant="contained"
          sx={{ backgroundColor: "#5f35f5" }}
        >
           Request Send
        </Button>
          :
          <Button
          onClick={() => handleJoinGroup(item)}
          variant="contained"
          sx={{ padding: "15px 0px", backgroundColor: "#5f35f5" }}
        >
          Join
        </Button>

          }
          
        </div>
      ))}
    </div>
  );
};

export default Group;
