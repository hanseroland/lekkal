import React, { useEffect,useState } from 'react';
import { Container, Grid, Toolbar, Button, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {DataGrid} from '@mui/x-data-grid'
import {CancelOutlined, EditOutlined} from '@mui/icons-material'
import styled from 'styled-components'
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';
import { Box } from '@mui/system';
import UserForm from '../components/Forms/UserForm';
import Popup from '../components/Popup';
import { deleteUser, saveUser } from '../actions/userActions';
import { toast } from 'react-toastify';
import { publiqueRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';




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

 function Utilisateurs(){

    const dispatch = useDispatch();
    const [users,setUsers] = useState([]);

    const userSave = useSelector(state => state.restauSave);
    const {loading: loadingSave,success: successSave, error:errorSave} = userSave;

    const userDelete = useSelector(state => state.userDelete);
    const {loading: loadingDelete,success: successDelete, error:errorDelete} = userDelete;


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

    const getUsers = async () => {
      try {
       const res = await publiqueRequest.get("user/");
        setUsers(res.data);
      } catch (err) {
        console.log(err)
      }
    }; 
    useEffect(() => {
       
         getUsers();
        
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
        dispatch(deleteUser(id));
        if(!successDelete){
            toast("Utilisateur supprimé avec succès!!!", {
              type: "info",
            });
        }  
        getUsers();
     };


      const addOrEdit = async (obj,resetForm) => {
        console.log(obj)
        try {
 
            if (obj._id === "" ) {
              
                  dispatch(saveUser(obj));
                  if(!successSave){
                    toast("Utilisateur ajouté  avec succès!!!", {
                        type: "success",
                    });
              
                  }
              
                
              }else{
                dispatch(saveUser(obj));
                if(!successSave){
                 toast("Utilisateur mis à jour avec succès!!!", {
                     type: "success",
                 });
            
                }
             }
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            getUsers();
        } catch (error) {
            console.error(error);
          }
       }
 

       const columns = [
        {field: "_id", headerName: "ID", width: 250 },
        {field: "pseudo", headerName: "Pseudo", width: 100 },
        {field: "email",headerName: "Email",width: 120},
        {field: "isAdmin",headerName: "isAdmin",width: 120},
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
                                   Utilisateurs
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
                                    rows={users}
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
                   title="Formulaire d'utilisateur"
                   openPopup={openPopup}
                   setOpenPopup={setOpenPopup}
                 > 
                    <UserForm
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


export default Utilisateurs;