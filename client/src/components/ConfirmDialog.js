import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import { NotListedLocation } from '@mui/icons-material';

   

export default function ConfirmDialog(props) {

  const { confirmDialog, setConfirmDialog } = props;

  return (
    <div>
      <Dialog
        open={confirmDialog.open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{textAlign:'center'}} >
                <IconButton disableRipple style={{color:"red"}}>
                    <NotListedLocation fontSize="large"/>
                </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                <Typography variant="h6">
                     Etes-vous sûr de vouloir supprimer cet enrégistrement?
                </Typography>
                <Typography variant="subtitle2">
                     Vous pouvez annuler cette opération
                </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit"  onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Non</Button>
          <Button variant="contained" color="error"  onClick={confirmDialog.onConfirm} >Oui</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}