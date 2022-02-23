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
    MY_TASKS_DELETE_FAIL, } from "../Constants/myTaskConstants";

export const myTaskListReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case MY_TASKS_LIST_REQUEST:
            return { loading: true };
        case MY_TASKS_LIST_SUCCESS:
            return { loading: false, tasks: action.payload };
        case MY_TASKS_LIST_FAIL:
            return { loading: false, tasks: action.payload };
        default:
            return state;
    }
};


export const myTaskCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_TASKS_CREATE_REQUEST:
            return { loading: true };
        case MY_TASKS_CREATE_SUCCESS:
            return { loading: false, success: true };
        case MY_TASKS_CREATE_FAIL:
            return { loading: false, Error: action.payload };
        default:
            return state;
    }
};

export const myTaskUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_TASKS_UPDATE_REQUEST:
            return { loading: true };
        case MY_TASKS_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case MY_TASKS_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};

export const myTaskDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_TASKS_DELETE_REQUEST:
         return { loading: true};
        case MY_TASKS_DELETE_SUCCESS:
         return { loading: false, success: true};
        case MY_TASKS_DELETE_FAIL:
         return { loading: false, error: action.payload, success: false};
        default:
            return state;
    }
};