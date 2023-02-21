import { createSlice } from "@reduxjs/toolkit";

export const bannerDeleteSlice = createSlice({
  name: "bannerDelete",
  initialState: {
    show: false,
  },
  reducers: {
    setBannerDeleteOpen: (state) => {
      state.show = true;
    },
    setBannerDeleteClose: (state) => {
      state.show = false;
    },
  },
});

export const { setBannerDeleteOpen, setBannerDeleteClose } = bannerDeleteSlice.actions;
export default bannerDeleteSlice.reducer;