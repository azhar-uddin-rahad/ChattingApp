import { Button } from '@mui/material'
import profile from '../assets/profile.png'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 let groupData=[{
    groupName: "",
    groupTagLine: "",
 }]
const Group = () => {
    const [groupInfo,setGroupInfo]=useState(groupData)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleInputChange=(e)=>{
       setGroupInfo({...groupInfo,
        [e.target.name]: e.target.value
        })

    }
    const handleSubmit=()=>{

        console.log(groupInfo.groupName)
    }


  return (
    <div className='box scroll-container'>
       <div className='group-heading'>
       <h3 >Groups List</h3>
       <Button onClick={handleOpen} color='success'>Create Group</Button>
       <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField id="margin-dense" margin="dense" label="Outlined" name='groupName' variant="outlined" onChange={(e)=>handleInputChange(e)} sx={{ width: '100%' }}/>
      <TextField id="margin-none" onChange={(e)=>handleInputChange(e)} name='groupTagLine' label="Filled" variant="filled"  sx={{ width: '100%' }}/>
      <Button onClick={handleSubmit} className="joinBtn" color="error" sx={{marginTop:'20px'}}>Submit</Button>
      
        </Box>
      </Modal>
    </div>
       </div>
       <div className='group-card-body'>
            <div className='profile'>
                <img src={profile} alt="" />
            </div>

            <div className='title'>
                <h4 className='groupsName'>Friends Reunion</h4>
                <p className='messageTitle'>Hi Guys, Wassup!</p>
            </div>
            <Button className='joinBtn'>Join</Button>

       </div>
       <div className='group-card-body'>
            <div className='profile'>
                <img src={profile} alt="" />
            </div>

            <div className='title'>
                <h4 className='groupsName'>Friends Reunion</h4>
                <p className='messageTitle'>Hi Guys, Wassup!</p>
            </div>
            <Button className='joinBtn'>Join</Button>

       </div>
       <div className='group-card-body'>
            <div className='profile'>
                <img src={profile} alt="" />
            </div>

            <div className='title'>
                <h4 className='groupsName'>Friends Reunion</h4>
                <p className='messageTitle'>Hi Guys, Wassup!</p>
            </div>
            <Button className='joinBtn'>Join</Button>

       </div>
        <div className='group-card-body'>
            <div className='profile'>
                <img src={profile} alt="" />
            </div>

            <div className='title'>
                <h4 className='groupsName'>Friends Reunion</h4>
                <p className='messageTitle'>Hi Guys, Wassup!</p>
            </div>
            <Button className='joinBtn'>Join</Button>

       </div>
    </div>
  )
}

export default Group