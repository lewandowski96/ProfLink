import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/reducers/auth.slice";
import generalReducer from "../store/reducers/general.slice";
import rideShareReducer from "../store/reducers/rideShare.slice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    generalUser: generalReducer,
    rideShare: rideShareReducer,
  },
});
