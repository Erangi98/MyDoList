import axios from "axios";
import { 
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
 } from '../Constants/userConstants';
 

 export const signIn = (useremail, userpassword) => async (dispatch) => {
     try {
         dispatch({ type: USER_SIGNIN_REQUEST});

         const config= {
             headers: {
                 "Content-type": "application/json",
             },
         };

         const { data } = await axios.post(
             "/api/users/signIn",
             { useremail, userpassword},
             config
         );

         dispatch({ type: USER_SIGNIN_SUCCESS, payload: data});

         localStorage.setItem("userInfo", JSON.stringify(data));
     } catch (error) {
         dispatch({
             type: USER_SIGNIN_FAIL,
             payload:
                error.response && error.response.data.message
                ? error.response.data.message
                :error.message
         });
     };
 };

 export const logout = () => async (dispatch) => {
     localStorage.removeItem("userInfo");
     dispatch({ type: USER_LOGOUT});
 };


 export const signUp = (username, useremail, userpassword) => async (dispatch) => {
     try {
         dispatch({ type: USER_SIGNUP_REQUEST });

         const config = {
             headers: {
                 "Content-type": "application/json",
             },
         };

         const { data } = await axios.post(
             '/api/users',
            { username, useremail, userpassword},
            config
         );


         dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });

         dispatch({ type: USER_SIGNIN_SUCCESS, payload:data });

         localStorage.setItem("userInfo", JSON.stringify(data));
     } catch (error) {
         dispatch({
             type: USER_SIGNUP_FAIL,
                payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });      
     }
    };

    export const updateProfile = (user) => async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_UPDATE_REQUEST
            });
            
            const {
                userSignIn: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post("/api/users/profile", user, config);

            dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    };

 