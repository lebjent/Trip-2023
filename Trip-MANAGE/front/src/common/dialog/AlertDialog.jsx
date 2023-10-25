import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp'
import React from 'react'

function AlertDialog(props) {

  const {isOpen,onClose,msg} = props;
    
  return (
    <div>
        <Dialog
            open={isOpen}
            keepMounted
            onClose={onClose}
        >
        <DialogTitle>
            <Typography gutterBottom  sx={{ fontWeight: 'bold', color: 'black', fontSize: '13pt' }}>  
                {"※알림"}
            </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
            <DialogContentText sx={{width:'400px',fontWeight: 'bold', fontSize: '10pt'}}>
                    {msg}
            </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button variant="contained" startIcon={<ExitToApp />} onClick={onClose}>닫기</Button>
        </DialogActions>
        </Dialog>
  </div>
  )
}

export default AlertDialog