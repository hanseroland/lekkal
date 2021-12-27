import React,{useEffect, useState} from 'react'
import {   
    Paper,
    Container,
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    
    } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';



 

function Connexion(props) {

   
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {loading,userInfo, error} = userSignin;
    const dispatch = useDispatch(); 
    const navigate = useNavigate()
   // const redirect = props.location.search?props.location.search.split("=")[1]:'/';

   

    useEffect(() => { 
       
        if(userInfo){
            navigate('/dashboard')
        }
       
  }, [userInfo]);


    const handleClick = (e) => {
        e.preventDefault()
        dispatch(signin(email,password))
      }; 

    
    return (
        <Box
            
            mt={2}
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 3
          }}
       >
           <Container  maxWidth="sm">
                
                    
                 <form onSubmit={handleClick}>
                        <Box mb={3}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                                
                            >
                          Connectez vous à la plateforme !!!
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                {loading && <div>Chargement...</div> }
                                 {error && <div>{error}</div> }
                            </Typography>
                           
                            </Box>
                        
                        <Grid  container >
                        
                            <Grid item lg={12} md={12} xs={12} >
                                
                                    <TextField
                                        label="Email"
                                        margin="normal"
                                        type="email"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                        
                                    <TextField
                                            label="Mot de passe"
                                            margin="normal"
                                            type="password"
                                            onChange={(e)=> setPassword(e.target.value)}
                                            variant="outlined"
                                            fullWidth
                                            required
                                    />

                            
                                </Grid>
                            </Grid>
                        
                            <Box my={2}>
                            <Button
                               
                                fullWidth
                                color='warning'
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Se connecter
                            </Button>
                            </Box>
                        </form>
                    
           </Container>
       </Box>
    )
}

export default Connexion 