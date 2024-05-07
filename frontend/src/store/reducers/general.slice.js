import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const generalUserSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      if (state.user.userType === "GENERAL") {
        state.user.user.friends = action.payload.friends;
      } else {
        console.error("user is not in state");
      }
    },
    setSentRequests: (state, action) => {
      if (state.user.userType === "GENERAL") {
        state.user.user.sentRequests = action.payload.sentRequests;
      } else {
        console.error("user is not in state");
      }
    },
    setReceivedRequests: (state, action) => {
      if (state.user.userType === "GENERAL") {
        state.user.user.receivedRequests = action.payload.receivedRequests;
      } else {
        console.error("user is not in state");
      }
    },
    setFollowers: (state, action) => {
      if (state.user.userType === "GENERAL") {
        state.user.user.followers = action.payload.followers;
      } else {
        console.error("user is not in state");
      }
    },
  },
});

export const {
  setFriends,
  setSentRequests,
  setReceivedRequests,
  setFollowers,
} = generalUserSlice.actions;

export default generalUserSlice.reducer;
