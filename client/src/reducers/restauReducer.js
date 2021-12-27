import { 
    RESTAU_DELETE_FAIL,
    RESTAU_DELETE_REQUEST,
    RESTAU_DELETE_SUCCESS,
    RESTAU_DETAILS_FAIL,
    RESTAU_DETAILS_REQUEST,
    RESTAU_DETAILS_SUCCESS,
    RESTAU_LIST_FAIL,
    RESTAU_LIST_REQUEST,
    RESTAU_LIST_SUCCESS,
    RESTAU_SAVE_FAIL,
    RESTAU_SAVE_REQUEST,
    RESTAU_SAVE_SUCCESS

 } from "../constants/restauConstants"

function restauListReducer(state = { restaurants: [] }, action) {
    switch (action.type) {
    case RESTAU_LIST_REQUEST: 
      return { loading: true,restaurants: [] };
    case RESTAU_LIST_SUCCESS:
      return { loading: false, success: true, restaurants: action.payload };
    case RESTAU_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
    }
  }




function restauDeleteReducer(state = { restaurant: {} }, action) {
 switch (action.type) {
    case RESTAU_DELETE_REQUEST:
        return { loading: true }; 
    case RESTAU_DELETE_SUCCESS:
        return { loading: false, restaurant: action.payload, success: true };
    case RESTAU_DELETE_FAIL:
        return { loading: false, error: action.payload };
    default:
        return state;
  }
}

function restauDetailsReducer(state = { restaurant: {} }, action) {
switch (action.type) {
 case RESTAU_DETAILS_REQUEST:
   return { loading: true };
 case RESTAU_DETAILS_SUCCESS:
   return { loading: false, restaurant: action.payload };
 case RESTAU_DETAILS_FAIL:
   return { loading: false, error: action.payload };
 default:
   return state;
}
}

function restauSaveReducer(state = { restaurant: {} }, action) {
switch (action.type) {
 case RESTAU_SAVE_REQUEST:
   return { loading: true };
 case RESTAU_SAVE_SUCCESS:
   return { loading: false, success: true, restaurant: action.payload };
 case RESTAU_SAVE_FAIL:
   return { loading: false, error: action.payload };
 default:
   return state;
 }
}

export {
    restauListReducer ,
    restauDetailsReducer ,
    restauDeleteReducer,
    restauSaveReducer 
}