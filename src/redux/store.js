import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/Authentication'
import addBannerReducer from './reducer/AddBanner'
export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        addBanner: addBannerReducer
    }
});
