import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
    allDetails : null
}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setTableDetails: (state, action) => {
            state.allDetails = action.payload;
            localStorage.setItem("details", JSON.stringify(action.payload));
        },
    },
});


export const { setTableDetails } = detailsSlice.actions;
export default detailsSlice.reducer;