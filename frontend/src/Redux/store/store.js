import { configureStore } from "@reduxjs/toolkit";
import detailsSlice from "../slice/detailsSlice";
import headerSlice from "../slice/headerSlice";

const store = configureStore({
    reducer:{
        details: detailsSlice,
        header: headerSlice,
    },
})


export default store