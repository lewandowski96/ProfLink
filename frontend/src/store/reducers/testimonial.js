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
    testimonials: null,
    testimonial: null
};

const slice = createSlice({
    name: 'testimonial',
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

        // POST TESTIMONIALS   
        addTestimonialSuccess(state, action) {
            state.success = "Testimonial created successfully."
        },

        // GET TESTIMONIALS_BY_ID
        fetchTestimonialSuccess(state, action) {
            state.testimonial = action.payload;
            state.success = null
        },

        // GET ALL TESTIMONIALS
        fetchTestimonialsSuccess(state, action) {
            state.testimonials = action.payload;
            state.success = null
        },

        // UPDATE TESTIMONIALS
        updateTestimonialSuccess(state, action) {
            state.success = "Testimonial updated successfully."
        },

        // DELETE TESTIMONIALS
        deleteTestimonialSuccess(state, action) {
            state.success = "Testimonial deleted successfully."
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
 * POST TESTIMONIALS
 * @param businessId 
 * @param newTestimonial 
 * @returns 
 */
export function addTestimonial(businessId, newTestimonial) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.post(`http://localhost:4000/api/business/${businessId}/testimonials`, newTestimonial);
            dispatch(slice.actions.addTestimonialSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * GET TESTIMONIALS
 * @param businessId 
 * @param testimonialId  
 * @returns 
 */
export function fetchTestimonial(businessId, testimonialId) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.get(`http://localhost:4000/api/business/${businessId}/testimonials/${testimonialId}`);
            dispatch(slice.actions.fetchTestimonialSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * GET ALL TESTIMONIALS 
 * @param businessId 
 * @returns 
 */
export function fetchTestimonials(businessId) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.get(`http://localhost:4000/api/business/${businessId}/testimonials`);
            dispatch(slice.actions.fetchTestimonialsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * UPDATE TESTIMONIALS
 * @param businessId 
 * @param updatedTestimonial
 * @returns 
 */
export function updateTestimonial(businessId, updatedTestimonial) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.put(`http://localhost:4000/api/business/${businessId}/testimonials/${updatedTestimonial._id}`, updatedTestimonial);
            dispatch(slice.actions.updateTestimonialSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * DELETE TESTIMONIALS
 * @param businessId 
 * @param testimonialId 
 * @returns 
 */
export function deleteTestimonial(businessId, testimonialId) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            await axios.delete(`http://localhost:4000/api/business/${businessId}/testimonials/${testimonialId}`);
            dispatch(slice.actions.deleteTestimonialSuccess(testimonialId));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}
