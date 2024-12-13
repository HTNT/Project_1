import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        user: null,
        message: null,
    },
    reducers: {
        signup(state, action) {
            state.user = action.payload;
        },
        signupFailed(state, action) {
            switch (action.payload) {
                case 'ERROR_USER_1001':
                    state.message = "This email is not found";
                    break;
                case 'ERROR_USER_1003':
                    state.message = "This email already exists an account registered";
                    break;
                default:
                    break;
            }
        },
        signUpResetData(state) {
            state.user = null;
            state.message = null;
        },
        signupResetMessage(state) {
            state.message = null;
        }
    }

});

export const { signup, signupFailed, signUpResetData, signupResetMessage } = signupSlice.actions;
const signupReducer = signupSlice.reducer;
export default signupReducer;