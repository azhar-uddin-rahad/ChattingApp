import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { FaComments } from "react-icons/fa";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import { activeChatMessage } from "../slice/ActiveChatSlice";
const FriendsList = ({ buttons }) => {
  const currentUser = useSelector((state) => state.loginUser.value);
  const dispatch = useDispatch();

  const db = getDatabase();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item, index) => {
        console.log(item);
        if (
          currentUser.uid === item.val().whoReceivedId ||
          currentUser.uid === item.val().whoSendId
        ) {
          arr.push({ ...item.val(), friendsDataCollectionId: item.key });
        }
      });
      setFriends(arr);
      if (currentUser.uid === arr[0].whoSendId) {
        console.log(arr[0].whoReceivedId);
        dispatch(activeChatMessage({
          type : "singleMsg",
          name : arr[0].whoReceivedName,
          id :arr[0].whoReceivedId
        }))
        localStorage.setItem("activeChat",JSON.stringify({
          type : "singleMsg",
          name : arr[0].whoReceivedName,
          id :arr[0].whoReceivedId
        }))
      } else {
        console.log(arr[0].whoSendId);
        dispatch(activeChatMessage({
          type : "singleMsg",
          name : arr[0].whoSendName,
          id :arr[0].whoSendId
        }))
        localStorage.setItem("activeChat",JSON.stringify({
          type : "singleMsg",
          name : arr[0].whoSendName,
          id :arr[0].whoSendId
        }))
      }

    });
  }, []);

  const cancelFndShip = (item) => {
    console.log(item.friendsDataCollectionId);
    remove(ref(db, "friends/" + item.friendsDataCollectionId));
  };

  const handleBlockFnd = (item) => {
    console.log(item);
    if (currentUser.uid == item.whoSendId) {
      set(push(ref(db, "block/")), {
        whichBlockedId: item.whoReceivedId,
        whichBlockedName: item.whoReceivedName,
        whoBlockedId: item.whoSendId,
        whoBlockedName: item.whoSendName,
      }).then(() => {
        remove(ref(db, "friends/" + item.friendsDataCollectionId));
      });
    } else {
      set(push(ref(db, "block/")), {
        whichBlockedId: item.whoSendId,
        whichBlockedName: item.whoSendName,
        whoBlockedId: item.whoReceivedId,
        whoBlockedName: item.whoReceivedName,
      }).then(() => {
        remove(ref(db, "friends/" + item.friendsDataCollectionId));
      });
    }
  };

  const handleMsg = (item) => {
    if (currentUser.uid === item.whoSendId) {
      console.log(item.whoReceivedId);
      dispatch(activeChatMessage({
        type : "singleMsg",
        name : item.whoReceivedName,
        id :item.whoReceivedId
      }))
      localStorage.setItem("activeChat",JSON.stringify({
        type : "singleMsg",
        name : item.whoReceivedName,
        id :item.whoReceivedId
      }))
    } else {
      console.log(item.whoSendId);
      dispatch(activeChatMessage({
        type : "singleMsg",
        name : item.whoSendName,
        id :item.whoSendId
      }))
      localStorage.setItem("activeChat",JSON.stringify({
        type : "singleMsg",
        name : item.whoSendName,
        id :item.whoSendId
      }))
    }
  };

  return (
    <div className="box scroll-container">
      <div className="group-heading">
        <h3>Friends List</h3>
        <Button>
          <BsThreeDotsVertical></BsThreeDotsVertical>
        </Button>
      </div>
      {friends.map((item, index) => (
        <div key={index} className="group-card-body">
          <div className="profile">
            <img src={profile} alt="" />
          </div>
          <div className="title">
            <h4 className="groupsName">
              {item.whoReceivedId === currentUser.uid
                ? item.whoSendName
                : item.whoReceivedName}
            </h4>
            <p className="messageTitle">Hi Guys, Wassup!</p>
          </div>
          {buttons === "msg" ? (
            <Button
              className="addBtn"
              onClick={() => {
                handleMsg(item);
              }}
            >
              <FaComments></FaComments>MSG
            </Button>
          ) : (
            <>
              <Button className="joinBtn" onClick={() => handleBlockFnd(item)}>
                B
              </Button>
              <Button
                className="addBtn"
                onClick={() => {
                  cancelFndShip(item);
                }}
              >
                C
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
