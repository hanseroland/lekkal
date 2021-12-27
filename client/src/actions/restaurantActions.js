
import axios from "axios"
import { 
    RESTAU_DELETE_FAIL,
    RESTAU_DELETE_REQUEST,
    RESTAU_DELETE_SUCCESS,
    RESTAU_DETAILS_FAIL,
    RESTAU_DETAILS_SUCCESS,
    RESTAU_LIST_FAIL,
    RESTAU_LIST_REQUEST,
    RESTAU_LIST_SUCCESS,
    RESTAU_SAVE_FAIL,
    RESTAU_SAVE_SUCCESS

 } from "../constants/restauConstants"


const listRestaurant = () => async(dispatch) => {
  
    try {

        dispatch({type: RESTAU_LIST_REQUEST})
        const {data}  = await axios.get('http://localhost:5000/api/restaurant/')
        dispatch({type: RESTAU_LIST_SUCCESS,payload: data})
         
    } catch (error) {
        dispatch({type: RESTAU_LIST_FAIL,payload: error.message})
    }
       
}

const deleteRestaurant = (restaurantId) => async (dispatch) => {
 
  try {
    dispatch({ type: RESTAU_DELETE_REQUEST, payload: restaurantId });
    const { data } = await axios.delete('http://localhost:5000/api/restaurant/' + restaurantId);
    dispatch({ type: RESTAU_DELETE_SUCCESS, payload: data , success:true});
  } catch (error) { 
    dispatch({ type: RESTAU_DELETE_FAIL, payload: error.message });
  }
};



  
const saveRestaurant = (restaurant) => async (dispatch) => {  
  try {
    dispatch({ type: RESTAU_SAVE_SUCCESS, payload: restaurant });
    if(!restaurant._id){
      const { data } = await axios.post('http://localhost:5000/api/restaurant/', restaurant);   
      dispatch({ type: RESTAU_SAVE_SUCCESS, payload: data}); 

    }else{
      const { data } = await axios.put('http://localhost:5000/api/restaurant/'+restaurant._id,restaurant);    
    dispatch({ type: RESTAU_SAVE_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({ type: RESTAU_SAVE_FAIL, payload: error.message });
  }
};  



const detailsRestaurant = (restaurantId) => async (dispatch) => {
    try {
      dispatch({ type: RESTAU_DETAILS_SUCCESS, payload: restaurantId });
      const { data } = await axios.get('http://localhost:5000/api/restaurant/' + restaurantId);
      dispatch({ type: RESTAU_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: RESTAU_DETAILS_FAIL, payload: error.message });
    }
  };



export {
    listRestaurant,
    detailsRestaurant,
    saveRestaurant,
    deleteRestaurant
}