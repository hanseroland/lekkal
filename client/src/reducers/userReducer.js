import { 
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT ,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_SAVE_REQUEST,
    USER_SAVE_SUCCESS,
    USER_SAVE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
} from "../constants/userConstants";
  
  
 

function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case USER_SIGNIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {userInfo:null};
      default: return state;
    }
  }


  function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function userSaveReducer(state = { userInfo: {} }, action) {
    switch (action.type) {
     case USER_SAVE_REQUEST:
       return { loading: true };
     case USER_SAVE_SUCCESS:
       return { loading: false, success: true, userInfo: action.payload };
     case USER_SAVE_FAIL:
       return { loading: false, error: action.payload };
     default:
       return state;
     }
  }


function userDeleteReducer(state = { userInfo: {} }, action) {
  switch (action.type) {
     case USER_DELETE_REQUEST:
         return { loading: true }; 
     case USER_DELETE_SUCCESS:
         return { loading: false, userInfo: action.payload, success: true };
     case USER_DELETE_FAIL:
         return { loading: false, error: action.payload };
     default:
         return state;
   }
 }


  export {
    userSigninReducer, 
    userRegisterReducer,
    userDeleteReducer,
    userSaveReducer
  }