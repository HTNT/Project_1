import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '../api/axios-client';
// import Config from '../config';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: Boolean(localStorage.getItem('BTL_USER')),
        currentUser: null,
        message: '',
        loginFailCount: 0,
        openPopupError: false,
        loading: false
    },
    reducers: {
        loginSuccess(state, action) {
            state.currentUser = action.payload;
            setToken(action.payload.token);
            localStorage.setItem('BTL_USER', JSON.stringify(action.payload));
        },
        loginFailed(state, actions) {
            state.loginFailCount += 1;
            switch (actions.payload) {
                case "ERROR_USER_1000":
                    state.message = {
                        code: 'ERROR_USER_1000',
                        message: "Login fail",
                    };
                    break;
                case "ERROR_USER_1001":
                    state.message = {
                        code: 'ERROR_USER_1001',
                        message: "The email or password is invalid"
                    };
                    break;
                case "ERROR_USER_1002":
                    state.message = {
                        code: 'ERROR_USER_1002',
                        message: "The email or password is not correct"
                    }
                    break;
                case "ERROR_USER_1012":

                    state.message = {
                        code: 'ERROR_USER_1012',
                        message: "The account has not been activated"
                    };
                    break;
                case "ERROR_CAPTCHA_1002":
                    state.message = {
                        code: 'ERROR_CAPTCHA_1002',
                        message: "The captcha is not correct",
                    };
                    break;
                case "ERROR_CAPTCHA_1003":
                    state.message = {
                        code: 'ERROR_CAPTCHA_1003',
                        message: 'The captcha is required',
                    }

                    break;
                case "ERROR_CAPTCHA_1004":
                    state.message = {
                        code: 'ERROR_CAPTCHA_1004',
                        message: "The captcha does not correct or expired",
                    }
                    break;
                default:
                    break;
            }
        },
        logout(state, actions) {
            state.currentUser = null;
            localStorage.removeItem('MY_BTL');
        },
        acceptInvitationCreateAccount() { },
        updateProfile(state) { state.loading = true },
        updateProfileSuccess(state) { state.loading = false },
        updateProfileFail(state) { state.loading = false },
        openPopupError(state) {
            state.openPopupError = true;
        },
        closePopupError(state) {
            state.openPopupError = false;
        },
        resetDataAuth(state) {
            state.message = '';
        },
        loading(state) { state.loading = true },
        loadingSuccess(state, action) { 
            if(action && action.payload && action.payload.token) {
                setToken(action.payload.token);
            }
            state.loading = false;
         },
        loadingFail(state) { 
            localStorage.removeItem('MY_BTL');
            // localStorage.removeItem(Config.tokenName);
            window.location.replace('/auth/login');
            state.loading = false;
         },
         changePassword() {},
         changePasswordSuccess() {},
         changePasswordFail() {},
    }

});

export const {
    login, loginSuccess, loginFailed, logout,
    acceptInvitationCreateAccount,
    resetDataAuth, updateProfile, closePopupError, openPopupError,
    updateProfileFail, updateProfileSuccess,
    loading, loadingSuccess, loadingFail, changePassword, changePasswordFail, changePasswordSuccess
} = authSlice.actions;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectMessage = state => state.auth.message;
const authReducer = authSlice.reducer;
export default authReducer;
