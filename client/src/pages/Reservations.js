import React, { useEffect,useState } from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {DataGrid} from '@mui/x-data-grid'
import {CancelOutlined, Visibility} from '@mui/icons-material'
import styled from 'styled-components'
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';
import { Box } from '@mui/system';
import { deleteReservation, saveReservation } from '../actions/reservationActions';
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

 function Reservations(){

    const dispatch = useDispatch();
    const [reservations,setReservations] = useState([]);
    

    const resSave = useSelector(state => state.resSave);
    const {loading: loadingSave,success: successSave, error:errorSave} = resSave;

    const resDelete = useSelector(state => state.resDelete);
    const {loading: loadingDelete,success: successDelete, error:errorDelete} = resDelete;


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


    const getReservation = async () => {
      try {
       const res = await publiqueRequest.get("reservation/");
        setReservations(res.data);
      } catch (err) {
        console.log(err)
      }
    }; 
    useEffect(() => {
         getReservation();
         
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
        dispatch(deleteReservation(id));
        if(!successDelete){
            toast("Reservation supprimée avec succès!!!", {
              type: "info",
            });
        }   
        getReservation();
     };

      const addOrEdit = async (obj,resetForm) => {
        try {
 
            if (obj._id === "") {
                 dispatch(saveReservation(obj));
                 if(!successSave){
                   toast("Reservation ajoutée  avec succès!!!", {
                       type: "success",
                   });
              
                  }
              }else{
                dispatch(saveReservation(obj));
                if(!successSave){
                 toast("Reservation mise à jour avec succès!!!", {
                     type: "success",
                 });
            
                }
             }
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            getReservation();
        } catch (error) {
            console.error(error);
          }
       }
 

       const columns = [
        {field: "_id", headerName: "ID", width: 250 },
        {field: "restaurantId", headerName: "RestaurandId", width: 100 },
        {field: "tableId",headerName: "TableId",width: 120},
        {field: "date",headerName: "Date",width: 120},
        {field: "time",headerName: "Heure",width: 120},
        {field: "name",headerName: "Client",width: 120},
        {field: "phone",headerName: "Phone",width: 120},
        {field: "email",headerName: "Email",width: 120},
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                
                <Link to={'/dashboard/reservation/'+params.row._id}  state={{restaurantId:params.row.restaurantId,
                      tableId:params.row.tableId}} >
                      <IconButton style={{color:'blue'}} >
                              <Visibility fontSize="small"  />
                      </IconButton>
                </Link>
             
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
                            <Box p={2} >
                                <Typography variant="h4"  >
                                    Reservations
                                </Typography>
                            </Box>
                      </Grid>
                      <Grid  item xs={12} >
                        <div style={{flex:4,height:'75vh', backgroundColor:'white'}} >
                                <DataGrid
                                    rows={reservations}
                                    disableSelectionOnClick
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    pageSize={8}
                                    checkboxSelection
                                />
                        </div>
                      </Grid>

                </Grid>
               
                <ConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
                />
            </Container>

        </MainContainer>
        </>
       
       
    );
}


export default Reservations;