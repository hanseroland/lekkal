import React, { useEffect,useState } from 'react';
import { Container, Grid, Toolbar, Button, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {DataGrid} from '@mui/x-data-grid'
import {CancelOutlined, EditOutlined, Visibility} from '@mui/icons-material'
import styled from 'styled-components'
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';
import { Box } from '@mui/system';
import RestaurantForm from '../components/Forms/RestaurantForm';
import Popup from '../components/Popup';
import { deleteRestaurant, saveRestaurant } from '../actions/restaurantActions';
import { toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom'
import { publiqueRequest } from '../requestMethods';




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

 function Restaurants(){
 
    const dispatch = useDispatch();
    const [restaurants,setRestaurants] = useState([]);

    const restauSave = useSelector(state => state.restauSave);
    const {loading: loadingSave,success: successSave, error:errorSave} = restauSave;

    const restauDelete = useSelector(state => state.restauDelete);
    const {loading: loadingDelete,success: successDelete, error:errorDelete} = restauDelete;


    const [confirmDialog, setConfirmDialog] = useState({ open: false});
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    
    
    useEffect(() => {
        if(userSignin.userInfo == null){
          navigate('/connexion')
        }
      }, [])


    const getRestau = async () => {
      try {
       const res = await publiqueRequest.get("restaurant/");
        setRestaurants(res.data);
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

      const onDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false
        });
        dispatch(deleteRestaurant(id));
        if(!successDelete){
            toast("Restaurant supprimé avec succès!!!", {
              type: "info",
            });
        }  
        getRestau();
     };

      const addOrEdit = async (obj,resetForm) => {
        try {
 
            if (obj._id === "") {
                 dispatch(saveRestaurant(obj));
                 if(!successSave){
                   toast("Restaurant ajouté  avec succès!!!", {
                       type: "success",
                   });
              
                  }
              }else{
                dispatch(saveRestaurant(obj));
                if(!successSave){
                 toast("Restaurant mis à jour avec succès!!!", {
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
        {field: "address",headerName: "Adresse",width: 120},
        {field: "telephone",headerName: "Phone",width: 120},
        {field: "web",headerName: "Site web",width: 120},
        {field: "image",headerName: "Image",width: 120,
        renderCell: (params) => {

            return (
              <div  style={{display:'flex', alignItems:'center'}} >
                <img style={{width:'32px',height:'32px',borderRadius:50,objectFit:'cover'}} 
                     src={window.location.origin+`/uploads/products/${params.row.image}`} alt="" 
                  
                />
              </div>
            );
          },
        },
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
                <Link to={'/dashboard/restaurant/'+params.row._id} >
                      <IconButton style={{color:'blue'}} >
                              <Visibility fontSize="small"  />
                      </IconButton>
                </Link>
              </>
            );
          },
        },
      ];

    return (
        <>
        <MainContainer>
            <Container   maxWidth={false}>
                <Grid container  >
                      <Grid  item xs={12}>
                      <Toolbar>
                                
                                <Box display="flex" justifyContent="space-between"  sx={{flexGrow:1,display:{xs:'flex',md:'flex'}}} >
                                <Typography
                                  variant="h6"
                                  noWrap
                                  component="div"
                                  sx={{mr:2,display:{xs:'none',md:'flex'}}}
                                 >
                                   Restaurants
                                  </Typography>
                                  <Button variant="outlined" color="warning"
                                    onClick={() => {setOpenPopup(true); setRecordForEdit(null); }}
                                  >
                                    Ajouter
                                  </Button>
                                </Box>
                            </Toolbar>
                      </Grid>
                      <Grid  item xs={12} >
                        <div style={{flex:4,height:'75vh', backgroundColor:'white'}} >
                                <DataGrid
                                    rows={restaurants}
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
                   title="Formulaire de restaurants"
                   openPopup={openPopup}
                   setOpenPopup={setOpenPopup}
                 > 
                    <RestaurantForm
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


export default Restaurants;