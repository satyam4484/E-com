import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import cartSlice from "./CartProvider";

const store = configureStore({
    reducer:{
        user:authSlice.reducer,cart:cartSlice.reducer
    },
});

export default store;
