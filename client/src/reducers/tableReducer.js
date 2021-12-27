import { 
    TABLE_DELETE_FAIL,
    TABLE_DELETE_REQUEST,
    TABLE_DELETE_SUCCESS,
    TABLE_DETAILS_FAIL,
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_LIST_FAIL,
    TABLE_LIST_REQUEST,
    TABLE_LIST_SUCCESS,
    TABLE_SAVE_FAIL,
    TABLE_SAVE_REQUEST,
    TABLE_SAVE_SUCCESS
 } from "../constants/tableConstants"




function tableDeleteReducer(state = { table: {} }, action) {
 switch (action.type) {
    case TABLE_DELETE_REQUEST:
        return { loading: true }; 
    case TABLE_DELETE_SUCCESS:
        return { loading: false, table: action.payload, success: true };
    case TABLE_DELETE_FAIL:
        return { loading: false, error: action.payload };
    default:
        return state;
}
}


function tableSaveReducer(state = { table: {} }, action) {
switch (action.type) {
 case TABLE_SAVE_REQUEST:
   return { loading: true };
 case TABLE_SAVE_SUCCESS:
   return { loading: false, success: true, table: action.payload };
 case TABLE_SAVE_FAIL:
   return { loading: false, error: action.payload };
 default:
   return state;
 }
}

export {
    tableSaveReducer,
    tableDeleteReducer 
}