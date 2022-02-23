import axios from "axios";
import { 
    MY_TASKS_LIST_REQUEST, 
    MY_TASKS_LIST_SUCCESS, 
    MY_TASKS_LIST_FAIL, 
    MY_TASKS_CREATE_REQUEST,
    MY_TASKS_CREATE_SUCCESS,
    MY_TASKS_CREATE_FAIL,
    MY_TASKS_UPDATE_REQUEST,
    MY_TASKS_UPDATE_SUCCESS,
    MY_TASKS_UPDATE_FAIL,
    MY_TASKS_DELETE_REQUEST,
    MY_TASKS_DELETE_SUCCESS,
    MY_TASKS_DELETE_FAIL} from "../Constants/myTaskConstants";
    
export const listMyTasks = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_TASKS_LIST_REQUEST,
        });

        const {
            userSignIn: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/mytasklist`, config);

        dispatch({
            type: MY_TASKS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
        type: MY_TASKS_LIST_FAIL,
        payload: message,
    });
    }
};

export const createMyTaskAction =
(title, description, taskDate) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_TASKS_CREATE_REQUEST,
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

        const { data } = await axios.post(
            `/api/mytasklist/createtask`,
            {title, description, taskDate },
            config
        );

        dispatch({
            type: MY_TASKS_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        
        dispatch({
            type: MY_TASKS_CREATE_FAIL,
            payload: message,
        });
    }
};

export const updateMyTaskAction = 
(id, title, description, taskDate) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_TASKS_UPDATE_REQUEST,
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

        const { data } = await axios.put(
            `/api/mytasklist/${id}`,
            { title, description, taskDate },
            config
        );

        dispatch({
            type:MY_TASKS_UPDATE_SUCCESS,
            payload: data,
        });
 
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        
        dispatch({
            type: MY_TASKS_UPDATE_FAIL,
            payload: message,
        }); 
        
    }
};


export const deleteMyTaskAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_TASKS_DELETE_REQUEST,
        });

        const {
            userSignIn: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/mytasklist/${id}`, config);

        dispatch({
            type: MY_TASKS_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        
        dispatch({
            type: MY_TASKS_DELETE_FAIL,
            payload: message,
        });
    }
};