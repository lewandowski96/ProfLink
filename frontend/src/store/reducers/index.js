// third-party
import { combineReducers } from 'redux';

// project import 
import advertisement from './advertisement';
import business from './business';
import testimonial from './testimonial';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  business,
  advertisement,
  testimonial
});

export default reducers;
