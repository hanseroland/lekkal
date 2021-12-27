import {
  USER_SIGNIN_REQUEST, 
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, 
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, 
  USER_REGISTER_FAIL, 
  USER_LOGOUT,    
  USER_SAVE_REQUEST, 
  USER_SAVE_SUCCESS, 
  USER_SAVE_FAIL,
  USER_DELETE_REQUEST, 
  USER_DELETE_SUCCESS, 
  USER_DELETE_FAIL
} from "../constants/userConstants";
import { publiqueRequest, userRequest } from "../requestMethods";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await publiqueRequest.post("/user/login",{ email, password })
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  }
  
  const register = (username, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { username, email, password } });
    try {
      const { data } = await publiqueRequest.post("user/register", { username, email,password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message }); 
    }
  }


  const saveUser = (userInfo) => async (dispatch) => {  
    try {
      dispatch({ type: USER_SAVE_REQUEST, payload: userInfo });
      if(!userInfo._id){
        const { data } = await userRequest.post('user/register/',userInfo);   
        dispatch({ type: USER_SAVE_SUCCESS, payload: data}); 
  
      }else{
        const { data } = await userRequest.put('/user/'+userInfo._id,userInfo);    
         dispatch({ type: USER_SAVE_SUCCESS, payload: data});
      }
    } catch (error) {
      dispatch({ type: USER_SAVE_FAIL, payload: error.message });
    }
  };  


  const deleteUser = (userId) => async (dispatch) => {
 
    try {
      dispatch({ type: USER_DELETE_REQUEST, payload: userId });
      const { data } = await userRequest.delete('/user/' + userId);
      dispatch({ type: USER_DELETE_SUCCESS, payload: data , success:true});
    } catch (error) { 
      dispatch({ type: USER_DELETE_FAIL, payload: error.message });
    }
  };

  
  const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT })

  }



  export { signin, register, logout,deleteUser,saveUser };