import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function ListCart(props) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >  
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={props.name} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={props.address} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={props.telephone} />
        </ListItemButton>
      </ListItem>
     
    </List>
  );
}
