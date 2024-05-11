import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rideSharePosts: [],
  profileData: [],
};

export const rideShareSlice = createSlice({
  name: "rideShare",
  initialState,
  reducers: {
    setRideSharePosts: (state, action) => {
      state.rideSharePosts = action.payload;
    },
    setRideSharePost: (state, action) => {
      const updatedPosts = state.rideSharePosts.map((rideSharePost) => {
        if (rideSharePost._id === action.payload.rideSharePost._id)
          return action.payload.rideSharePost;
        return rideSharePost;
      });
      state.rideSharePosts = updatedPosts;
    },
    setRideShareProfileData: (state, action) => {
      state.profileData = action.payload.profileData;
    },
    setCompleteRideSharePost: (state, action) => {
      const afterCompltePosts = state.rideSharePosts.filter(
        (post) => action.payload.rideSharePost._id !== post._id
      );
      state.rideSharePosts = afterCompltePosts;
    },
  },
});

export const {
  setRideSharePosts,
  setRideSharePost,
  setRideShareProfileData,
  setCompleteRideSharePost,
} = rideShareSlice.actions;

export default rideShareSlice.reducer;
