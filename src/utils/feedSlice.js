import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFromFeed: (state, action) => {
            const newArray = state.filter(feed => feed._id !== action.payload);
            return newArray.length > 0 ? newArray : null;
        }
    },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;