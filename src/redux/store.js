import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/Authentication'
import addBannerReducer from './reducer/AddBanner'
import bannerDeleteReducer from './reducer/BannerDelete';
export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        addBanner: addBannerReducer,
        deleteBanner: bannerDeleteReducer
    }
});
