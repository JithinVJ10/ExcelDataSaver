import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
    headerDetails : null
}

export const headerDetailsSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderDetails: (state, action) => {
            state.headerDetails = action.payload;
            localStorage.setItem("headerDetails", JSON.stringify(action.payload));
        },
    },
});


export const { setHeaderDetails } = headerDetailsSlice.actions;
export default headerDetailsSlice.reducer;