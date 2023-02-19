import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/Authentication'
export default configureStore({
    reducer: {
        authentication: authenticationReducer,
    }
});
