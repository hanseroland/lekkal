import { 
    RES_DELETE_FAIL,
    RES_DELETE_REQUEST,
    RES_DELETE_SUCCESS,
    RES_DETAILS_FAIL,
    RES_DETAILS_REQUEST,
    RES_DETAILS_SUCCESS,
    RES_LIST_FAIL,
    RES_LIST_REQUEST,
    RES_LIST_SUCCESS,
    RES_SAVE_FAIL,
    RES_SAVE_REQUEST,
    RES_SAVE_SUCCESS

 } from "../constants/reservationConstants"

function resListReducer(state = { reservations: [] }, action) {
    switch (action.type) {
    case RES_LIST_REQUEST: 
      return { loading: true,reservations: [] };
    case RES_LIST_SUCCESS:
      return { loading: false, success: true, reservations: action.payload };
    case RES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
    }
  }




function resDeleteReducer(state = { reservation: {} }, action) {
 switch (action.type) {
    case RES_DELETE_REQUEST:
        return { loading: true }; 
    case RES_DELETE_SUCCESS:
        return { loading: false, reservation: action.payload, success: true };
    case RES_DELETE_FAIL:
        return { loading: false, error: action.payload };
    default:
        return state;
}
}

function resDetailsReducer(state = { reservation: {} }, action) {
switch (action.type) {
 case RES_DETAILS_REQUEST:
   return { loading: true };
 case RES_DETAILS_SUCCESS:
   return { loading: false, reservation: action.payload };
 case RES_DETAILS_FAIL:
   return { loading: false, error: action.payload };
 default:
   return state;
}
}

function resSaveReducer(state = { reservation: {} }, action) {
switch (action.type) {
 case RES_SAVE_REQUEST:
   return { loading: true };
 case RES_SAVE_SUCCESS:
   return { loading: false, success: true, reservation: action.payload };
 case RES_SAVE_FAIL:
   return { loading: false, error: action.payload };
 default:
   return state;
 }
}

export {
    resListReducer ,
    resDetailsReducer ,
    resDeleteReducer,
    resSaveReducer 
}