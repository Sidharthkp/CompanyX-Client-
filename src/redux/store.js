import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/Authentication'
import addBannerReducer from './reducer/AddBanner'
import bannerDeleteReducer from './reducer/BannerDelete';
import booleanSlice from './reducer/boolean'
export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        addBanner: addBannerReducer,
        deleteBanner: bannerDeleteReducer,
        changeBoolean: booleanSlice,
    }
});
