import React from 'react'
import {
    Avatar,
     Card, 
     CardContent,
     Grid,
     Typography   
 } from '@mui/material';
import { Box } from '@mui/system';




  
  const CartItem = ({title,value,icon,backgroundColor,...props}) => {
  

    return(
    <Card
     style={{backgroundColor:`${backgroundColor}`}}
      sx={{ height: '100%', }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
             {title}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
           {value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
           
              sx={{
                backgroundColor:"white",
                height: 56,
                width: 56
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >  
        </Box>
      </CardContent>
    </Card>
    );
 }
  
  export default CartItem;
  