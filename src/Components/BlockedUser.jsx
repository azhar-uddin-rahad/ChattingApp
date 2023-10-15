import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
const BlockedUser = () => {
  const [title, setTitle] = useState("");
  const currentUser = useSelector((state) => state.loginUser.value);
  const [blockList, setBlockList] = useState();
  const db = getDatabase();
  useEffect(() => {
    const blockListRef = ref(db, "block/");
    onValue(blockListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), blockListParentId: item.key });
      });
      setBlockList(arr);
    });
  }, []);

  const handleUnblock = (item) => {
    console.log(item);
    //if friends unblock then if i show this friends on users list then execute this code
    /// remove(ref(db,'block/' +item.blockListParentId))

    set(push(ref(db, "friends/")), {
      whoSendName: item.whoBlockedName,
      whoSendId: item.whoBlockedId,
      whoReceivedName: item.whichBlockedName,
      whoReceivedId: item.whichBlockedId,
    }).then(() => {
      remove(ref(db, "block/" + item.blockListParentId));
    });
  };

  return (
    <div className="box scroll-container">
      <div className="group-heading">
        <h3>Block List</h3>
        <Button>
          <BiDotsVerticalRounded></BiDotsVerticalRounded>
        </Button>
      </div>

      <div className="group-card-body">
        {blockList?.map((item, index) => (
          <>
            {currentUser.uid === item.whoBlockedId ? (
              <div className="group-card-body">
                <div className="profile">
                  <img src={profile} alt="" />
                </div>
                <div className="title">
                  <h4 className="groupsName"> {item.whichBlockedName}</h4>
                  <p className="messageTitle">Hi Guys, Wassup!</p>
                </div>
                {currentUser.uid === item.whoBlockedId && (
                  <Button
                    className="joinBtn"
                    onClick={() => handleUnblock(item)}
                  >
                    unblock
                  </Button>
                )}
              </div>
            ) : currentUser.uid === item.whichBlockedId ? (
              <div className="group-card-body">
                <div className="profile">
                  <img src={profile} alt="" />
                </div>
                <div className="title">
                  <h4 className="groupsName"> {item.whoBlockedName}</h4>
                  <p className="messageTitle">Hi Guys, Wassup!</p>
                </div>
              
              </div>
            ) : ""}
          </>
        ))}
      </div>
    </div>
  );
};

export default BlockedUser;
