import React, { useEffect,useState } from 'react';
import { Container, Grid, Toolbar, Button, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {DataGrid} from '@mui/x-data-grid'
import {CancelOutlined, EditOutlined} from '@mui/icons-material'
import styled from 'styled-components'




export const MainContainer = styled.div`
    width: auto;
    height: 100vh;
    margin-left: 17rem;
    position: relative; 
   // padding: 0 1rem;
    color:#000;
    background-color: #e8eaeb;
   

    @media screen  and (max-width:768px){
        margin-left: 0px;
        padding: 0 0rem;
    }
`;

 function Tables(){


    return (
       <MainContainer>
            <Container   maxWidth={false}>
                <Grid container  >
                      
                </Grid>
               
            </Container>

        </MainContainer>
       
    );
}


export default Tables;