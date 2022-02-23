import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userSignInReducer, userSignUpReducer, updateReducer } from './Reducers/userReducers';
import { myTaskCreateReducer, myTaskDeleteReducer, myTaskListReducer, myTaskUpdateReducer } from './Reducers/myTasksReducer';

const reducer= combineReducers ({
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    myTaskList: myTaskListReducer,
    myTaskCreate: myTaskCreateReducer,
    myTaskUpdate: myTaskUpdateReducer,
    myTaskDelete: myTaskDeleteReducer,
    updateUserProfile: updateReducer,
});

const userInformStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
:null;

const intialState = {
    userSignIn: { userInfo: userInformStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;