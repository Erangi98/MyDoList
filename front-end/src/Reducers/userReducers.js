import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS} from "../Constants/userConstants";


export const userSignInReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true};

        case USER_SIGNIN_SUCCESS:
            return { loading: true, userInfo: action.payload};

        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload};

        case USER_LOGOUT:
            return {};
    
        default:
            return state;
    }

};

export const userSignUpReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true};

        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true};

        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload, success: false};

        default:
            return state;
    }

};

export const updateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return{ loading: true };
        case USER_UPDATE_SUCCESS:
            return{ loading: false, userInfo: action.payload };
        case USER_UPDATE_FAIL:
            return{ loading: false, error: action.payload };
        default:
            return state;
    }
};