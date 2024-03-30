// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports 
import axios from 'axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  isLoading: false,
  businesses: null,
  business: null
};

const slice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    // TO INITIAL STATE
    hasInitialState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    finishLoading(state) {
      state.isLoading = false;
    },

    // POST BUSINESS 
    addBusinessSuccess(state, action) {
      state.success = "Business created successfully."
    },

    // GET BUSINESS_BY_ID
    fetchBusinessSuccess(state, action) {
      state.business = action.payload;
      state.success = null
    },

    // GET ALL BUSINESS
    fetchBusinessesSuccess(state, action) {
      state.businesses = action.payload;
      state.success = null
    },

    // UPDATE BUSINESS
    updateBusinessSuccess(state, action) {
      state.success = "Business updated successfully."
    },

    // DELETE BUSINESS
    deleteBusinessSuccess(state, action) {
      state.success = "Business deleted successfully."
    },

  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

/**
 * TO INITIAL STATE
 * @returns 
 */
export function toInitialState() {
  return async () => {
    dispatch(slice.actions.hasInitialState())
  }
}

/**
 * POST BUSINESS
 * @param newBusiness 
 * @returns 
 */
export function addBusiness(newBusiness) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(`http://localhost:4000/api/business`, newBusiness);
      dispatch(slice.actions.addBusinessSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET BUSINESS
 * @param businessId  
 * @returns 
 */
export function fetchBusiness(businessId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get(`http://localhost:4000/api/business/${businessId}`);
      dispatch(slice.actions.fetchBusinessSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL BUSINESS 
 * @returns 
 */
export function fetchBusinesses() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get('http://localhost:4000/api/business');
      dispatch(slice.actions.fetchBusinessesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE BUSINESS
 * @param updatedBusiness
 * @returns 
 */
export function updateBusiness(updatedBusiness) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.put(`http://localhost:4000/api/business/${updatedBusiness._id}`, updatedBusiness);
      dispatch(slice.actions.updateBusinessSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE BUSINESS
 * @param businessId 
 * @returns 
 */
export function deleteBusiness(businessId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axios.delete(`http://localhost:4000/api/business/${businessId}`);
      dispatch(slice.actions.deleteBusinessSuccess(businessId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
