import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { 
    Container, 
    Grid, 
    Paper,  
    Divider,
    Typography,
    Box,
    TextField,
    Select,
    MenuItem, 
    InputLabel, 
    FormControl,
    Button, 
  
} from '@mui/material';
import { saveReservation } from '../actions/reservationActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns'
import Topnav from '../components/Topnavbar';
import Navbar from '../components/Navbar/Navbar';
import { publiqueRequest } from '../requestMethods';
import MobileSidebar from '../components/MobileSidebar/Index';





export const MainContainer = styled.div`
    width: auto;
    height: 100vh;
    margin-left: 17rem;
    margin-top: 16px;
    position: relative; 
   // padding: 0 1rem;
    color:#000;
    background-color: #e8eaeb;
   

    @media screen  and (max-width:768px){
        margin-left: 0px;
        padding: 0 0rem;
    }
`;

function Home() {

    const  [times, setTimes] = useState([
        "8h",
        "8h30",
        "9h",
        "9h30",
        "10h",
        "10h30",
        "11h",
        "11h30",
        "12h",
        "12h30",
        "13h",
        "13h30",
        "14h",
        "14h30",
        "15h",
        "15h30",
        "16h",
        "16h30",
        "17h",
        "17h30",
        "18h",
        "18h30",
        "19h",
        "19h30",
        "20h",
        "20h30",
        "21h",
        "21h30",
        "22h",
        "22h30",
    ]);


    const resSave = useSelector(state => state.resSave);
    const {loading,success, error} = resSave;

 

    const dispatch = useDispatch();

    const [restaurants,setRestaurants] = useState([]);
    const [tables,setTables] = useState([]);
    const [isAvailable,setIsAvailable] = useState("")

    const [state,setState] = useState({
        _id:'',
        date:format(new Date(), 'MM/dd/yyyy'),
        restaurantId:'',
        tableId:'',
        time:'',
        name:'',
        phone:'',
        email:''
    })


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
  // console.log(state)

    useEffect(() => {
           let item;
            if(state.restaurantId){
                item =  restaurants.find((item) => item._id == state.restaurantId)
                setTables(item.tables.filter(table => table.isAvailable === "true"))
            }
            
       }, [state.restaurantId])

      

    useEffect(() => {
        let item;
         if(state.tableId){
             item =  tables.find((item) => item._id == state.tableId)
             setIsAvailable(item.isAvailable)
         }
         
    }, [state.tableId])
 
    const verifyCustomer = () => {
        let customerReservation =  restaurants.filter((item) => 
                item.date == state.date &&
                item.restaurantId == state.restaurantId &&
                item.tableId == state.tableId &&
                item.time == state.time &&
                item.name == state.name &&
                item.phone == state.phone &&
                item.email == state.email
          )
        if(customerReservation){
            toast("Vous avez déjà reserver cette table", {
                type: "error",
            });
           return  
        }
    }
   
    const handleSubmit = async (e) =>{
            e.preventDefault();
            /*let customerReservation =  restaurants.filter((item) => 
                    item.date == state.date &&
                    item.restaurantId == state.restaurantId &&
                    item.tableId == state.tableId &&
                    item.time == state.time &&
                    item.name == state.name &&
                    item.phone == state.phone &&
                    item.email == state.email
                )
                if(customerReservation){
                    toast("Vous avez déjà reserver cette table", {
                        type: "info",
                    });
                }else{*/
                    dispatch(saveReservation(state))
                    if(!success){
                        toast("Reservation effectuée  avec succès!!!", {
                            type: "success",
                        });
                     
                    }else{
                        toast("Erreur lors de la reservation!!!", {
                            type: "error",
                        });
                    }
                //}  
        
    }

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

  
    return (
            <>
                <MobileSidebar isOpen={isOpen}  toggle={toggle}/>
                <Navbar   toggle={toggle} />
                <Container maxWidth={false} >
                <Grid container spacing={2}>
                      
                       <Grid item xs={12}>
                            <Box justifyContent="center" mt={5}>
                            <form 
                                noValidate 
                                autoComplete="off" 
                                onSubmit={handleSubmit}
                            >
                                <Container  maxWidth="md" >
                                    <Grid container spacing={2} >  
                                       <Grid  item lg={6} xs={6}>
                                           <TextField 
                                                    style={{marginBottom:10}} 
                                                  id="date"
                                                  label="Date de reservation"
                                                  type="date"
                                                  fullWidth
                                                  defaultValue={state.date}
                                                  onChange={
                                                    e => {
                                                        setState({
                                                            ...state,
                                                            date:e.target.value
                                                        })
                                                    }
                                                }
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                 
                                            />
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Restaurants</InputLabel>
                                                        <Select
                                                            style={{marginBottom:10}} 
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="restaurantId"
                                                            value={state.restaurantId}
                                                            onChange={
                                                                e => {
                                                                    setState({
                                                                        ...state,
                                                                        restaurantId:e.target.value
                                                                    })
                                                                }
                                                            }
                                                            fullWidth
                                                            >
                                                            {restaurants.map((val) =>
                                                                (
                                                                    <MenuItem key={val._id} value={val._id}>{val.name}</MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                </FormControl>
                                                
                                                <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                                                        <Select
                                                            style={{marginBottom:10}} 
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="tableId"
                                                            value={state.tableId}
                                                            onChange={
                                                                e => {
                                                                    setState({
                                                                        ...state,
                                                                        tableId:e.target.value
                                                                    })
                                                                }
                                                            }
                                                            fullWidth
                                                            >
                                                                
                                                            {tables.map((val) =>
                                                                
                                                                (
                                                                    <MenuItem key={val._id} value={val._id}>{val.capacity}</MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Heures de reservation</InputLabel>
                                                            <Select
                                                            style={{marginBottom:10}} 
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                name="time"
                                                                value={state.time}
                                                                label="Heures de reservation"
                                                                onChange={
                                                                    e => {
                                                                        setState({
                                                                            ...state,
                                                                            time:e.target.value
                                                                        })
                                                                    }
                                                                }
                                                                fullWidth
                                                                >
                                                                {times.map(function(val,index){
                                                                    return(
                                                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                                                    )
                                                                })}
                                                            </Select>
                                                </FormControl>
                                       </Grid>
                                       <Grid  item lg={6} xs={6}>
                                       <TextField 
                                          style={{marginBottom:10}} 
                                            fullWidth 
                                            variant="outlined" 
                                            name="name" 
                                            label="Votre nom" 
                                            value={state.name}
                                            type="text"
                                            required
                                            onChange={
                                                e => {
                                                    setState({
                                                        ...state,
                                                        name:e.target.value
                                                    })
                                                }
                                            }
                                           
                                        />
                                         <TextField 
                                                style={{marginBottom:10}} 
                                                fullWidth 
                                                variant="outlined" 
                                                name="phone" 
                                                label="Votre contact" 
                                                value={state.phone}
                                                type="text"
                                                required
                                                onChange={
                                                    e => {
                                                        setState({
                                                            ...state,
                                                            phone:e.target.value
                                                        })
                                                    }
                                                }
                                               
                                            />
                                            <TextField 
                                                style={{marginBottom:10}} 
                                                fullWidth 
                                                variant="outlined" 
                                                name="email" 
                                                label="Votre email" 
                                                value={state.email}
                                                type="text"
                                                required
                                                onChange={
                                                    e => {
                                                        setState({
                                                            ...state,
                                                            email:e.target.value
                                                        })
                                                    }
                                                }
                                               
                                            />
                                            <Button
                                                   style={{backgroundColor:'#FF7400',height:55}}
                                                   variant="contained"
                                                   fullWidth
                                                   size="large"
                                                   color="primary"
                                                   type="submit"
                                                   >
                                                      reserver
                                                   </Button>
                                       </Grid>
                                    </Grid>
                                </Container>
                                </form>
                            </Box>
                       </Grid>
                   
                </Grid>
            </Container>
            </>
           
      
    )
}

export default Home
