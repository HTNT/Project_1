import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
    name: 'forgot-password',
    initialState: {
        user: null,
        message: null,
        code: null,
    },
    reducers: {
        forgotPassword(state, action) {
            state.user = action.payload;
        },
        forgotPasswordFailed(state, action) {
            switch (action.payload) {
                case 'ERROR_USER_1001':
                    state.message = {
                        code: 'ERROR_USER_1001',
                        message: "This account is not registered"
                    };
                    break;
                case 'ERROR_USER_1010':
                    state.message = {
                        code: 'ERROR_USER_1010',
                        message: "This account is disable",
                    };
                    break;
                case 'ERROR_USER_1012':
                    state.message = {
                        code: 'ERROR_USER_1012',
                        message: "This account hasn't been activated"
                    };
                    break;
                default:
                    break;
            }
        },
        resetPasswordSuccess(state, action) {
            state.message = action.payload;
            state.code = null;

        },
        resetPasswordFailed(state, action) {
            state.message = action.payload.message;
            state.code = action.payload.code;
        },
        resetData(state) {
            state.user = null;
            state.message = null;
            state.code = null;
        },
        resetMessage(state) {
            state.message = null;
            state.code = null;
        }
    }

});

export const { forgotPassword, forgotPasswordFailed, resetPasswordFailed, resetPasswordSuccess, resetData, resetMessage } = forgotPasswordSlice.actions;
const forgotPasswordReducer = forgotPasswordSlice.reducer;
export default forgotPasswordReducer;