
import axios from "axios"
import { 
    RES_DELETE_FAIL,
    RES_DELETE_REQUEST,
    RES_DELETE_SUCCESS,
    RES_DETAILS_FAIL,
    RES_DETAILS_SUCCESS,
    RES_LIST_FAIL, 
    RES_LIST_REQUEST,
    RES_LIST_SUCCESS,
    RES_SAVE_FAIL,
    RES_SAVE_SUCCESS

 } from "../constants/reservationConstants"


const listReservation = () => async(dispatch) => {
  
    try {

        dispatch({type: RES_LIST_REQUEST})
        const {data}  = await axios.get('http://localhost:5000/api/reservations/')
        dispatch({type: RES_LIST_SUCCESS,payload: data})
         
    } catch (error) {
        dispatch({type: RES_LIST_FAIL,payload: error.message})
    }
       
}

const deleteReservation = (reservationId) => async (dispatch) => {
 
  try {
    dispatch({ type: RES_DELETE_REQUEST, payload: reservationId });
    const { data } = await axios.delete('http://localhost:5000/api/reservation/' + reservationId);
    dispatch({ type: RES_DELETE_SUCCESS, payload: data , success:true});
  } catch (error) { 
    dispatch({ type: RES_DELETE_FAIL, payload: error.message });
  }
};
 


  
const saveReservation = (reservation) => async (dispatch) => {  
  try {
    dispatch({ type: RES_SAVE_SUCCESS, payload: reservation });
    if(!reservation._id){
      const { data } = await axios.post('http://localhost:5000/api/reservation/', reservation);   
      dispatch({ type: RES_SAVE_SUCCESS, payload: data}); 

    }else{
      const { data } = await axios.patch('http://localhost:5000/api/reservation/'+reservation._id,reservation);    
    dispatch({ type: RES_SAVE_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({ type: RES_SAVE_FAIL, payload: error.message });
  }
};  



const detailsReservation = (reservationId) => async (dispatch) => {
    try {
      dispatch({ type: RES_DETAILS_SUCCESS, payload: reservationId });
      const { data } = await axios.get('http://localhost:5000/api/reservation/' + reservationId);
      dispatch({ type: RES_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: RES_DETAILS_FAIL, payload: error.message });
    }
  };



export {
    listReservation,
    detailsReservation,
    saveReservation,
    deleteReservation
}