import {createSlice} from "@reduxjs/toolkit";

const initialAuthState ={
    isLoggedIn:false,
} ;

const authSlice = createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        userLogin(state) {
            state.isLoggedIn = true;
        },
        userLogout(state) {
            state.isLoggedIn = false;
            localStorage.removeItem("user");
        }
    }
});

export const userActions = authSlice.actions;
export default authSlice;
