// third-party
import { combineReducers } from "redux";

// project import
import advertisement from "./advertisement";
import user from "./auth.slice";
import business from "./business";
import generalUser from "./general.slice";
import rideShare from "./rideShare.slice";
import testimonial from "./testimonial";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  business,
  advertisement,
  testimonial,
  user,
  generalUser,
  rideShare,
});

export default reducers;
