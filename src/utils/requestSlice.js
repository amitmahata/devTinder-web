import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const newArray = state.filter(request => request._id !== action.payload);
            return newArray.length > 0 ? newArray : null;
        },
    },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;