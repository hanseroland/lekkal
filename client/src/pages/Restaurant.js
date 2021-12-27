import React, { useEffect,useState } from 'react';
import { Container, Grid, Toolbar, Button, IconButton, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {DataGrid} from '@mui/x-data-grid'
import {CancelOutlined, EditOutlined} from '@mui/icons-material'
import styled from 'styled-components'
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';
import { Box } from '@mui/system';
import Popup from '../components/Popup';
import { toast } from 'react-toastify';
import TableForm from '../components/Forms/TableForm';
import { useLocation } from 'react-router'
import { publiqueRequest } from '../requestMethods';
import {useNavigate} from 'react-router-dom'





export const MainContainer = styled.div`
    width: auto;
    height: 100vh;
    margin-left: 17rem;
    position: relative; 
    margin-top: 15px;
    color:#000;
    background-color: #e8eaeb;
   

    @media screen  and (max-width:768px){
        margin-left: 0px;
        padding: 0 0rem;
    }
`;

 function Restaurant(){

    const dispatch = useDispatch();
    const location = useLocation();
    const [restaurant,setRestaurant] = useState({});
    const restaurantId = location.pathname.split("/")[3];
    


    const [confirmDialog, setConfirmDialog] = useState({ open: false});
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    
    
    useEffect(() => {
      if(userSignin === ""){
        navigate('/connexion')
      }
    }, [])


    const getRestau = async () => {
      try {
       const res = await publiqueRequest.get("restaurant/"+restaurantId);
        setRestaurant(res.data);
      } catch (err) {
        console.log(err)
      }
    }; 
      useEffect(() => {
       
         getRestau();
        
       }, [])

     
       const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true) 
      };

      const onDelete = async (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false
        }); 
        const tableID = {
          tableId:id
        }
         const reqDelete = await axios.patch("http://localhost:5000/api/restaurant/delete-table/"+restaurantId,tableID);
        if(reqDelete.data){
            toast("Table supprimée avec succès!!!", {
              type: "info",
            });
        } 
        getRestau(); 
     };

      const addOrEdit = async (obj,resetForm) => {
        try {
             console.log(obj)
            if (obj._id === "") {
                const reqAdd = await axios.patch("http://localhost:5000/api/restaurant/add-table/"+restaurantId,obj);
               
                 if(reqAdd.data){
                   toast("Table ajouée avec succès!!!", {
                       type: "success",
                   });
              
                  }
              }else{
                const data = { 
                  tableId:obj._id,
                  name:obj.name,
                  capacity:obj.capacity,
                  isAvailable:obj.isAvailable,
                  location:obj.location
                }
                const reqEdit = await axios.patch("http://localhost:5000/api/restaurant/edit-table/"+restaurantId,data);
               
                if(reqEdit.data){
                 toast("Table mise à jour avec succès!!!", {
                     type: "success",
                 });
            
                }
             }
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            getRestau();
        } catch (error) {
            console.error(error);
          }
       }
 

       const columns = [
        {field: "_id", headerName: "ID", width: 250 },
        {field: "name", headerName: "Nom", width: 100 },
        {field: "capacity",headerName: "Capacité",width: 120},
        {field: "isAvailable",headerName: "isAvailable",width: 120},
        {field: "location",headerName: "Localisation",width: 120},
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                
                <IconButton 
                  style={{color:'blue'}}
                  onClick={() => {openInPopup(params.row)}}
                  
                  >
                        <EditOutlined fontSize="small"  />
                </IconButton>
             
                <IconButton 
                  style={{color:'red'}} 
                  onClick={() => {
                    setConfirmDialog({
                        open: true,
                        onConfirm: () => {onDelete(params.row._id) }
                      })
                    }}
                  >
                        <CancelOutlined fontSize="small"  />
                </IconButton>
              </>
            );
          },
        },
      ];

    return (
        <>
        <MainContainer>
            <Container   maxWidth={false}>
                <Grid container spacing={2}  >
                      <Grid  item xs={12}>
                      <Toolbar>
                                
                                <Box display="flex" justifyContent="space-between"  sx={{flexGrow:1,display:{xs:'flex',md:'flex'}}} >
                                <Typography
                                  variant="h6"
                                  noWrap
                                  component="div"
                                  sx={{mr:2,display:{xs:'none',md:'flex'}}}
                                 >
                                    <b>Restaurant : </b>  {restaurant?.name}
                                  </Typography>
                                  <Button variant="outlined" color="warning"
                                    onClick={() => {setOpenPopup(true); setRecordForEdit(null); }}
                                  >
                                    Ajouter
                                  </Button>
                                </Box>
                            </Toolbar>
                      </Grid>
                      <Grid  item lg={12} xs={12} >
                        <div style={{flex:4,height:'75vh', backgroundColor:'white'}} >
                                <DataGrid
                                    rows={restaurant?.tables}
                                    disableSelectionOnClick
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    pageSize={8}
                                    checkboxSelection
                                />
                        </div>
                      </Grid>

                </Grid>
                <Popup
                   title="Formulaire des tables"
                   openPopup={openPopup}
                   setOpenPopup={setOpenPopup}
                   setRecordForEdit={setRecordForEdit}
                 >  
                    <TableForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                    />
                </Popup>
                <ConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
                />
            </Container>

        </MainContainer>
        </>
       
       
    );
}


export default Restaurant;