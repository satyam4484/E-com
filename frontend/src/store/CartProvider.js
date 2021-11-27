import {createSlice} from "@reduxjs/toolkit";

const initialCartState = {
    cartItems:[],
    totalAmount:0
};

const cartSlice = createSlice({
    name:'cartslice',
    initialState:initialCartState,
    reducers:{
        addItem(state,action) {

        },

        removeItem(state,action) {
            
        }
    }
});

export const cartAction = cartSlice.actions;
export default cartSlice;