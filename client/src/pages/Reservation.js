import React, { useEffect,useState } from 'react';
import { Container, Divider, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components'
import axios from 'axios';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import { publiqueRequest } from '../requestMethods';
import { useSelector } from 'react-redux';





export const MainContainer = styled.div`
    width: auto;
    height: 100vh;
    margin-left: 17rem;
    position: relative; 
    margin-top: 15px;
   // padding: 0 1rem;
    color:#000;
    background-color: #e8eaeb;
   

    @media screen  and (max-width:768px){
        margin-left: 0px;
        padding: 0 0rem;
    }
`;

 function Reservation(props){

    const location = useLocation();
    const [reservation,setReservation] = useState({});
    const [restaurant,setRestaurant] = useState({});
    const [table,setTable] = useState({});
    const reservationId = location.pathname.split("/")[3];
    const [restaurantId,setRestaurandId] = useState(location.state.restaurantId);
    const [tableId,setTableId] = useState(location.state.tableId);

    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    
   

    useEffect(() => {
        let isAmounted = true;
        const getReservation = async () => {
            try {
             const res = await axios.get("http://localhost:5000/api/reservation/"+reservationId);
              setReservation(res.data);
            } catch (err) {
              console.log(err)
            }
          }; 
         getReservation();
         return ()=>{isAmounted = false}
       }, [reservationId]);
      

        useEffect(() => {
            let isAmounted = true;
            const getRestau = async () => {
                try {
                const res = await publiqueRequest.get("restaurant/"+restaurantId);
                setRestaurant(res.data);
                } catch (err) {
                console.log(err)
                }
            }; 
            getRestau();

            return ()=>{isAmounted=false}
           
       }, []);
     
     

   

    return (
        <>
        <MainContainer>
            <Container   maxWidth={false}>
                <Grid container  spacing={2} >
                      <Grid  item xs={12}>
                            <Box p={2} >
                                <Typography variant="h4"  >
                                    Reservation: {reservationId}
                                </Typography>
                                
                            </Box>
                      </Grid>
                     <Grid item lg={4} xs={12} >
                            <Paper style={{padding:4}}  elevation={2} >
                                <Box  display="block" >
                                    <Typography variant="h6" > <b>Infos Client</b> </Typography>
                                    <Divider/>
                                    <Typography>Nom: {reservation.name}</Typography>
                                    <Typography>Phone: {reservation.phone}</Typography>
                                    <Typography>Email: {reservation.email}</Typography>
                                </Box>
                            </Paper>
                     </Grid>
                     <Grid item lg={4} xs={12} >
                            <Paper   style={{padding:4}}  elevation={2} >
                                    <Typography variant="h6" > <b>Infos Table</b> </Typography>
                                    <Divider/>
                                    {restaurant.tables ?
                                        restaurant.tables.filter((table)=>table._id == tableId).map((item)=>(
                                            <>
                                            <Typography  key={item._id} >Nom: {item.name}</Typography>
                                            <Typography >Capacité: {item.capacity}  </Typography>
                                            <Typography > Localisation : {item.location} </Typography>
                                            <Typography   > Disponibilité: {item.isAvailable} </Typography>
                                            </>
                                        ))
                                        :
                                        <Typography >Chargement...  </Typography>
                                    }
                                    
                            </Paper>
                     </Grid>
                     <Grid item lg={4} xs={12} >
                           <Paper style={{padding:4}}  elevation={2} >
                                <Box  display="block" >
                                    <Typography variant="h6" > <b>Infos Restaurant</b> </Typography>
                                    <Divider/>
                                    <Typography>Nom: {restaurant.name}</Typography>
                                    <Typography>Adresse: {restaurant.address}</Typography>
                                    <Typography>Phone: {restaurant.telephone}</Typography>
                                   
                                </Box>
                            </Paper>
                     </Grid>

                </Grid>
            </Container>

        </MainContainer>
        </>
       
       
    );
}


export default Reservation;