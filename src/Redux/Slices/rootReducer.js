import { combineReducers } from '@reduxjs/toolkit';
import language from './Main/language';
import appUser from './Main/appUser';
//
import registerCar from './Auth/registerCar';
import registerProvider from './Auth/registerProvider';
import login from './Auth/login';
import auth from './Auth/auth';
// 
import worker from './Worker/info';
// 
import provider from './Provider/info';
//
import home from './User/home';

const rootReducer = combineReducers({
    appUser,
    language,
    //
    auth,
    registerCar,
    registerProvider,
    login,
    // 
    worker,
    // 
    provider,
    // User
    home,
})


export default rootReducer;