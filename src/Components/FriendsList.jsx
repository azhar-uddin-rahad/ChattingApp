import { Button } from '@mui/material'
import profile from '../assets/profile.png';
import {BsThreeDotsVertical} from "react-icons/bs"
import { useSelector } from 'react-redux';

import { getDatabase, ref, set,onValue } from "firebase/database";
import { useEffect, useState } from 'react';
const FriendsList = () => {
    const currentUser=useSelector((state)=>state.loginUser.value);
    const db = getDatabase();
    const [friends,setFriends]=useState([])

    useEffect(()=>{
const starCountRef = ref(db, 'friends/');
onValue(starCountRef, (snapshot) => {
    const arr =[]
  snapshot.forEach((item,index)=>{
    console.log(item)
    if(currentUser.uid === item.val().whoReceivedId || currentUser.uid === item.val().whoSendId){
        arr.push(item.val())

    }
    
  })
  setFriends(arr)

});

    },[])

    return (
        <div className='box scroll-container'>
       <div className='group-heading'>
       <h3 >Friends List</h3>
       <Button><BsThreeDotsVertical></BsThreeDotsVertical></Button>
       </div>
       {friends.map((item,index)=><div key={index} className='group-card-body'>
            <div className='profile'>
                <img src={profile} alt="" />
            </div>
            <div className='title'>
                <h4 className='groupsName'>
                    {item.whoReceivedId === currentUser.uid 
                    ?
                    item.whoSendName
                    :
                    item.whoReceivedName
                    }
                </h4>
                <p className='messageTitle'>Hi Guys, Wassup!</p>
            </div>
            <Button className="addBtn"  >
            Block
          </Button>

       </div>)

       }
    
       
       
    </div>
    );
};

export default FriendsList;