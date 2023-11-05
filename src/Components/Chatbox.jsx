import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import uploadPhoto from "../assets/reg.png";
import { BiDotsVertical } from "react-icons/bi";
import ModalImage from "react-modal-image";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { LinearProgressWithLabel } from "../Components/ImageProgress";
import {
  getStorage,
  ref as imgRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { BsFileEarmarkImage } from "react-icons/bs";
import moment from "moment";

const Chatbox = () => {
  const currentUser = useSelector((state) => state.loginUser.value);
  const activeChat = useSelector((state) => state.activeChat.chat);
  const [msg, setMsg] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [groupMessageList, setGroupMessageList] = useState([]);
  const db = getDatabase();
  const [progress, setProgress] = useState(0);

  const handleSendMessage = () => {
    if (activeChat.type == "groupMsg") {
      if (msg != "") {
        set(push(ref(db, "groupmsg/")), {
          whoSendName: currentUser.displayName,
          whoSendId: currentUser.uid,
          whoReceiveName: activeChat.name,
          whoReceivedId: activeChat.id,
          msg: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      }
    } else {
      if (msg != "") {
        set(push(ref(db, "singlemsg/")), {
          whoSendName: currentUser.displayName,
          whoSendId: currentUser.uid,
          whoReceiveName: activeChat.name,
          whoReceivedId: activeChat.id,
          msg: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      }
    }
  };
  useEffect(() => {
    const starCountRef = ref(db, "singlemsg/");
    onValue(starCountRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          (item.val().whoSendId === currentUser.uid &&
            item.val().whoReceivedId === activeChat.id) ||
          (item.val().whoSendId === activeChat.id &&
            item.val().whoReceivedId === currentUser.uid)
        ) {
          arr.push(item.val());
        }
      });
      setMessageList(arr);
    });
  }, [activeChat.id]);
  useEffect(() => {
    const starCountRef = ref(db, "groupmsg/");
    onValue(starCountRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        arr.push(item.val());
      });
      setGroupMessageList(arr);
    });
  }, [activeChat.id]);
  console.log(messageList);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (activeChat.type == "groupMsg") {
        if (msg != "") {
          set(push(ref(db, "groupmsg/")), {
            whoSendName: currentUser.displayName,
            whoSendId: currentUser.uid,
            whoReceiveName: activeChat.name,
            whoReceivedId: activeChat.id,
            msg: msg,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          });
        }
      } else {
        if (msg != "") {
          set(push(ref(db, "singlemsg/")), {
            whoSendName: currentUser.displayName,
            whoSendId: currentUser.uid,
            whoReceiveName: activeChat.name,
            whoReceivedId: activeChat.id,
            msg: msg,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          });
        }
      }
    }
  };
  const handleMessage = (e) => {
    setMsg(e.target.value);
  };
  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    const storage = getStorage();
    const storageRef = imgRef(storage, `${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

        /* 
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        } */
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(0);
          if (activeChat.type == "groupMsg") {
            set(push(ref(db, "groupmsg/")), {
              whoSendName: currentUser.displayName,
              whoSendId: currentUser.uid,
              whoReceiveName: activeChat.name,
              whoReceivedId: activeChat.id,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
          } else {
            set(push(ref(db, "singlemsg/")), {
              whoSendName: currentUser.displayName,
              whoSendId: currentUser.uid,
              whoReceiveName: activeChat.name,
              whoReceivedId: activeChat.id,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
          }
        });
      }
    );
  };
  return (
    <div className="chatBoxContainer">
      <div className="chatBox">
        <div className="profileSection">
          <div className="profileContent">
            <div className="profilePicture">
              <img src={profile} alt="" />
            </div>
            <div>
              <p>{activeChat.name}</p>
              <p>Online</p>
            </div>
          </div>
          <p>
            <BiDotsVertical></BiDotsVertical>
          </p>
        </div>
        <div className="middleContent">
          {activeChat.type === "singleMsg"
            ? messageList.map((item, index) =>
                item.whoSendId === currentUser.uid &&
                activeChat.id === item.whoReceivedId ? (
                  <div key={index} className="msg">
                    {item.msg ? (
                      <>
                        <div className="sendMsg">
                          <div className="sendMsContent">
                            <p>{item.msg}</p>
                          </div>
                          <div className="sendMsArrow"></div>
                        </div>
                        <p className="time">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="sendImg">
                          <ModalImage
                            small={item.img}
                            large={item.img}
                            alt="picture"
                          />
                           <div className="sendImgArrow"></div>
                        </div>
                        <p className="time">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  item.whoSendId === activeChat.id &&
                  item.whoReceivedId === currentUser.uid && (
                    <div key={index} className="msg">
                      {item.msg ? (
                        <>
                          <div className="getMsg">
                            <div className="getMsgContent">
                              <p>{item.msg}</p>
                            </div>
                            <div className="getMsgArrow"></div>
                          </div>
                          <p className="time">
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="getImg">
                            <ModalImage
                              small={item.img}
                              large={item.img}
                              alt="Hello World!"
                            />
                            <div className="getImgArrow"></div>
                          </div>
                          <p className="time">
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </p>

                        </>
                      )}
                    </div>
                  )
                )
              )
            : groupMessageList.map((item, index) =>
                item.whoSendId === currentUser.uid ? (
                  <div key={index} className="msg">
                    {item.msg ? (
                      <>
                        <div className="sendMsg">
                          <div className="sendMsContent">
                            <p>{item.msg}</p>
                          </div>
                          <div className="sendMsArrow"></div>
                        </div>
                        <p className="time">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="sendImg">
                          <ModalImage
                            small={item.img}
                            large={item.img}
                            alt="picture"
                          />
                           <div className="sendImgArrow"></div>
                        </div>
                        <p className="time">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  item.whoReceivedId == activeChat.id && (
                    <div key={index} className="msg">
                      {item.msg ? (
                        <>
                          <div className="getMsg">
                            <div className="getMsgContent">
                              <p>{item.msg}</p>
                            </div>
                            <div className="getMsgArrow"></div>
                          </div>
                          <p className="time">
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="getImg">
                            <ModalImage
                              small={item.img}
                              large={item.img}
                              alt="Hello World!"
                            />
                            <div className="getImgArrow"></div>
                          </div>
                          <p className="time">
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </p>

                        </>
                      )}
                    </div>
                  )
                )
              )}

          {/*  <div className="msg">
            <div className="getImg">
              <ModalImage
                small={uploadPhoto}
                large={uploadPhoto}
                alt="Hello World!"
              />

              <div className="getImgArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>

          <div className="msg">
            <div className="sendImg">
              <ModalImage
                small={uploadPhoto}
                large={uploadPhoto}
                alt="picture"
              />

              <div className="sendImgArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div> */}

          {/*  <div className="msg">
            <div className="getVideo">
              <video width="320" height="240" controls></video>
              <div className="getMsgArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>
          <div className="msg">
            <div className="sendVideo">
            <video width="320" height="240" controls></video>
              <div className="sendVideoArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div> */}

          {/* <div className="msg">
            <div className="getVoice">
              <audio controls></audio>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>
          <div className="msg">
            <div className="sendVoice">
              <audio controls></audio>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div> */}
        </div>
      </div>
      {progress != 0 && (
        <LinearProgressWithLabel value={progress}></LinearProgressWithLabel>
      )}
      <div className="messageInputBox">
        <div className="inputBox">
          <input
            onKeyUp={handleKeyPress}
            onChange={(e) => handleMessage(e)}
            type="text"
          />
        </div>
        <label htmlFor="uploadImg">
          <BsFileEarmarkImage
            style={{
              fontSize: "40px",
              position: "absolute",
              right: "15%",
              bottom: "10px",
            }}
          ></BsFileEarmarkImage>
          <input
            type="file"
            onChange={(e) => {
              handleImageUpload(e);
            }}
            style={{ display: "none" }}
            id="uploadImg"
          />
        </label>
        <Button
          onClick={handleSendMessage}
          variant="contained"
          sx={{ background: "#5f35f5", padding: "10px 30px", color: "#fff" }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbox;
