import { Button } from '@mui/material'
import profile from '../assets/profile.png'
const BlockedUser = () => {
  return (
    <div className='box scroll-container'>
    <div className='group-heading'>
    <h3 >Groups List</h3>
    <Button>Create Account</Button>
    </div>
    <div className='group-card-body'>
         <div className='profile'>
             <img src={profile} alt="" />
         </div>

         <div className='title'>
             <h4 className='groupsName'>Friends Reunion</h4>
             <p className='messageTitle'>Hi Guys, Wassup!</p>
         </div>
         <Button className='joinBtn'>unblock</Button>

    </div>
    <div className='group-card-body'>
         <div className='profile'>
             <img src={profile} alt="" />
         </div>

         <div className='title'>
             <h4 className='groupsName'>Friends Reunion</h4>
             <p className='messageTitle'>Hi Guys, Wassup!</p>
         </div>
         <Button className='joinBtn'>unblock</Button>

    </div>
    <div className='group-card-body'>
         <div className='profile'>
             <img src={profile} alt="" />
         </div>

         <div className='title'>
             <h4 className='groupsName'>Friends Reunion</h4>
             <p className='messageTitle'>Hi Guys, Wassup!</p>
         </div>
         <Button className='joinBtn'>unblock</Button>

    </div>
     <div className='group-card-body'>
         <div className='profile'>
             <img src={profile} alt="" />
         </div>

         <div className='title'>
             <h4 className='groupsName'>Friends Reunion</h4>
             <p className='messageTitle'>Hi Guys, Wassup!</p>
         </div>
         <Button className='joinBtn'>unblock</Button>

    </div>
 </div>
  )
}

export default BlockedUser