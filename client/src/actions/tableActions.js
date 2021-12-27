import axios from "axios"
import { 
    TABLE_DELETE_FAIL,
    TABLE_DELETE_REQUEST,
    TABLE_DELETE_SUCCESS,
    TABLE_DETAILS_FAIL,
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_LIST_FAIL,
    TABLE_LIST_REQUEST,  
    TABLE_SAVE_FAIL,
    TABLE_SAVE_REQUEST,
    TABLE_SAVE_SUCCESS
 } from "../constants/tableConstants"



const deleteTable = (restaurantId,table) => async (dispatch) => {
 
  try {
    dispatch({ type: TABLE_DELETE_REQUEST, payload: table });
    const { data } = await axios.patch('http://localhost:5000/api/restaurant/delete-table/' + restaurantId,table);
    dispatch({ type: TABLE_DELETE_SUCCESS, payload: data , success:true});
  } catch (error) { 
    dispatch({ type: TABLE_DELETE_FAIL, payload: error.message });
  }
};




const saveTable = (restaurantId,table) => async (dispatch) => {  
  try {
    dispatch({ type: TABLE_SAVE_REQUEST, payload: table });
    if(!table.tableId){
      const { data } = await axios.patch('http://localhost:5000/api/restaurant/add-table/',+restaurantId,table);   
      dispatch({ type: TABLE_SAVE_SUCCESS, payload: data}); 

    }else{
      const { data } = await axios.patch('http://localhost:5000/api/restaurant/edit-table/'+restaurantId,table);    
      dispatch({ type: TABLE_SAVE_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({ type: TABLE_SAVE_FAIL, payload: error.message });
  }
};  






export {
    saveTable,
    deleteTable
}