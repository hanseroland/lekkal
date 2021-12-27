import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { 
    Container, 
    Grid, 
    Paper,  
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Divider
} from '@mui/material';
import CartItem from '../components/Cards/CartItem';
import { DateRange, FoodBankSharp, Person } from '@mui/icons-material';
import CalendarCart from '../components/Cards/CalendarCart';
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { publiqueRequest } from '../requestMethods';
import ChartBar from '../components/charts/ChartBar';





export const MainContainer = styled.div`
    width: auto;
    height: 100%;
    margin-left: 17rem;
    margin-top: 16px;
    position: relative; 
    padding: 0 1rem;
    padding-bottom: 1rem;
    color:#000;
    background-color: #e8eaeb;
   

    @media screen  and (max-width:768px){
        margin-left: 0px;
        padding: 0 0rem;
    }
`;

function Dashboard() {

    const [users,setUsers] = useState([]);
    const [restaurants,setRestaurants] = useState([]);
    const [countRestau,setCountRestau] = useState(0);
    const [countUser,setCountUser] = useState(0);
    const [stats,setStats] = useState([]);
    const [countReservation,setCountReservation] = useState(0);

    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
   
 
    const dispatch = useDispatch();

    const MONTHS = useMemo(
      () => [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aut",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      []
    );

    useEffect(() => { 
      if(userSignin === ""){
        navigate('/connexion')
      }
    }, [])
  
    useEffect(() => {
        const getRestau = async () => {
           try {
            const res = await publiqueRequest.get("restaurant/");
             setRestaurants(res.data);
           } catch (err) {
             console.log(err)
           }
         }; 
         getRestau();
        
       }, [])

       useEffect(() => {
        const getCount = async () => {
           try {
            const res = await publiqueRequest.get("restaurant/count");
             setCountRestau(res.data[0].total);
           } catch (err) {
             console.log(err)
           }
         }; 
         getCount();
        
       }, [])

       useEffect(() => {
        const getCount = async () => {
           try {
            const res = await publiqueRequest.get("user/count");
             setCountUser(res.data[0].total);
           } catch (err) {
             console.log(err)
           }
         }; 
         getCount();
       }, [])

       useEffect(() => {
        const getCount = async () => {
           try {
            const res = await publiqueRequest.get("reservation/count");
             setCountReservation(res.data[0].total);
           } catch (err) {
             console.log(err)
           }
         }; 
         getCount();
       }, [])

       useEffect(() => {
        const getStat = async () => {
           try {
            const res = await publiqueRequest.get("/reservation/stats");
            res.data.map((item) =>
              setStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], "Total": item.total },
              ])
            );
           } catch (err) {
             console.log(err)
           }
         }; 
         getStat();
         console.log(stats)  
       }, [MONTHS])


       useEffect(() => {
        const getUsers = async () => {
           try {
            const res = await publiqueRequest.get("user/");
             setUsers(res.data);
           } catch (err) {
             console.log(err)
           }
         }; 
         getUsers();
        
       }, [])

    function renderRestau(){
       
        if(restaurants.length > 0){
          return(
            restaurants.slice(0,5).map((item)=>(
                   <TableRow key={item._id}
                    sx={{'&:last:child td,&:last-child th': {border:0}}}
                   >
                            <TableCell component="th" scope="row" >{item.name}</TableCell>
                            <TableCell >{item.telephone}</TableCell>
                           
                    </TableRow>
               ))
            )   
        }
      
    } 

    function renderUsers(){
        if(users.length > 0){
          return(
            users.slice(0,5).map((item)=>(
                   <TableRow key={item._id}
                    sx={{'&:last:child td,&:last-child th': {border:0}}}
                   >
                            <TableCell component="th" scope="row" >{item.pseudo}</TableCell>
                            <TableCell >{item.email}</TableCell>
                           
                    </TableRow>
               ))
            )   
           
        }
    } 

  
    return (
        <>
        
          <MainContainer>
            <Container maxWidth={false} >
                <Grid container spacing={2}>
                       
                        <Grid item lg={4} xs={12} >
                            <CartItem
                                title="Utilisateurs"
                                value={countUser}
                                backgroundColor="#fff"
                                icon={<Person color="warning" />}
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} >
                           <CartItem
                                title="Restaurants"
                                value={countRestau}
                                backgroundColor="#FF7400"
                                icon={<FoodBankSharp  color="warning" />} 
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} >
                           <CartItem
                                title="Reservations"
                                value={countReservation}
                                backgroundColor="#fff"
                                icon={<DateRange  color="warning" />} 
                            />
                        </Grid>
                        <Grid item lg={6} xs={12} >
                            <Paper style={{padding:2}} >
                                 <ChartBar
                                     data={stats}
                                     title="Statistiques de reservation par mois"
                                     grid
                                     dataKey="Total"
                                 
                                 />
                            </Paper>
                        </Grid>
                        <Grid  item lg={6} xs={12} >
                           <Paper style={{justifyContent:'flex-end'}} elevation={2} >
                                    <CalendarCart/>
                           </Paper>
                        </Grid>
                        <Grid item lg={6} xs={12} >
                        <Paper style={{padding:2}} >
                               <Typography variant="h6" align="left">Utilisateurs</Typography>
                               <Divider/>
                               <Table  aria-label="simple table" >
                                        <TableHead>
                                             <TableRow>
                                                <TableCell> <b>Pseudo</b> </TableCell>
                                                <TableCell> <b>Email</b> </TableCell>
                                             <TableCell>  </TableCell>
                                            </TableRow> 
                                         </TableHead>
                                        <TableBody>
                                            {renderUsers()}
                                        </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid item lg={6} xs={12} >
                           <Paper style={{padding:2}} >
                               <Typography variant="h6" align="left">Restaurants</Typography>
                               <Divider/>
                               <Table  aria-label="simple table" >
                                        <TableHead>
                                             <TableRow>
                                                <TableCell> <b>Nom</b> </TableCell>
                                                <TableCell> <b>Phone</b> </TableCell>
                                             <TableCell>  </TableCell>
                                            </TableRow> 
                                         </TableHead>
                                        <TableBody>
                                            {renderRestau()}
                                        </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                </Grid>
            </Container>
        </MainContainer>
        </>
      
    )
}

export default Dashboard
