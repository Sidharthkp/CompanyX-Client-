import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    show: false,
  },
  reducers: {
    setBannerOpen: (state) => {
      state.show = true;
    },
    setBannerClose: (state) => {
      state.show = false;
    },
  },
});

export const { setBannerOpen, setBannerClose } = bannerSlice.actions;
export default bannerSlice.reducer;