import {configureStore} from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import userReducer from './userSlice';
import driverReducer from './driverSlice';
import authenticReducer from './authenticSlice';

export default configureStore({
    reducer:{
        admin:adminReducer,
        driver:driverReducer,
        user:userReducer,
        authentic:authenticReducer

    }
})


