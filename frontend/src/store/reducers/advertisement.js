// third-party
import { createSlice } from "@reduxjs/toolkit";

// project imports
import axios from "axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  isLoading: false,
  advertisements: null,
  advertisement: null,
};

const slice = createSlice({
  name: "advertisement",
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

    // POST ADVERTISEMENT
    addAdvertisementSuccess(state, action) {
      state.success = "Advertisement created successfully.";
    },

    // GET ADVERTISEMENT_BY_ID
    fetchAdvertisementSuccess(state, action) {
      state.advertisement = action.payload;
      state.success = null;
    },

    // GET ALL ADVERTISEMENT
    fetchAdvertisementsSuccess(state, action) {
      state.advertisements = action.payload;
      state.success = null;
    },

    // UPDATE ADVERTISEMENT
    updateAdvertisementSuccess(state, action) {
      state.success = "Advertisement updated successfully.";
    },

    // DELETE ADVERTISEMENT
    deleteAdvertisementSuccess(state, action) {
      state.success = "Advertisement deleted successfully.";
    },
  },
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
    dispatch(slice.actions.hasInitialState());
  };
}

/**
 * POST ADVERTISEMENT
 * @param businessId
 * @param newAdvertisement
 * @returns
 */
export function addAdvertisement(businessId, newAdvertisement) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(
        `http://localhost:4000/api/business/${businessId}/advertisements`,
        newAdvertisement
      );
      dispatch(slice.actions.addAdvertisementSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ADVERTISEMENT
 * @param businessId
 * @param advertisementId
 * @returns
 */
export function fetchAdvertisement(businessId, advertisementId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get(
        `http://localhost:4000/api/business/${businessId}/advertisements/${advertisementId}`
      );
      dispatch(slice.actions.fetchAdvertisementSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL ADVERTISEMENT
 * @param businessId
 * @returns
 */
export function fetchAdvertisements(businessId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get(
        `http://localhost:4000/api/business/${businessId}/advertisements`
      );
      dispatch(slice.actions.fetchAdvertisementsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE ADVERTISEMENT
 * @param businessId
 * @param updatedAdvertisement
 * @returns
 */
export function updateAdvertisement(businessId, updatedAdvertisement) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.put(
        `http://localhost:4000/api/business/${businessId}/advertisements/${updatedAdvertisement._id}`,
        updatedAdvertisement
      );
      dispatch(slice.actions.updateAdvertisementSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE ADVERTISEMENT
 * @param businessId
 * @param advertisementId
 * @returns
 */
export function deleteAdvertisement(businessId, advertisementId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axios.delete(
        `http://localhost:4000/api/business/${businessId}/advertisements/${advertisementId}`
      );
      dispatch(slice.actions.deleteAdvertisementSuccess(advertisementId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
