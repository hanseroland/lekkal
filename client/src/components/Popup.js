import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import { ClosedCaption, CloseOutlined } from '@mui/icons-material';



export default function Popup({title,children,openPopup,setRecordForEdit, setOpenPopup,...props}) {


  return (
    <div>
      <Dialog 
        open={openPopup}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{textAlign:'center'}} >
          <div style={{display:'flex'}}>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                </Typography>
                    <IconButton
                        color="warning"
                        onClick={()=>{setOpenPopup(false);setRecordForEdit(null)}}>
                        <CloseOutlined />
                  </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
         
               {children}
         
        </DialogContent>
      </Dialog>
    </div>
  );
}