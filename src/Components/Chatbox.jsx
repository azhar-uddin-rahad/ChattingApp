import React from "react";
import profile from "../assets/profile.png";
import uploadPhoto from "../assets/reg.png";
import { BiDotsVertical } from "react-icons/bi";
import ModalImage from "react-modal-image";

const Chatbox = () => {
  return (
    <div>
      <div className="chatBox">
        <div className="profileSection">
          <div className="profileContent">
            <div className="profilePicture">
              <img src={profile} alt="" />
            </div>
            <div>
              <p>Azhar uddin Rahad</p>
              <p>Online</p>
            </div>
          </div>
          <p>
            <BiDotsVertical></BiDotsVertical>
          </p>
        </div>
        <div className="middleContent">
          <div className="msg">
            <div className="getMsg">
              <div className="getMsgContent">
                <p>This is a senders message with the arrow on the left.</p>
              </div>
              <div className="getMsgArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>

          <div className="msg">
            <div className="sendMsg">
              <div className="sendMsContent">
                <p>This is a senders message with the arrow on the left.</p>
              </div>
              <div className="sendMsArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>

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

          <div className="msg">
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
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Chatbox;
