import { call, fork, put, take } from "redux-saga/effects";
import {toast} from "react-toastify";
import { acceptInvitationCreateAccount, changePassword, changePasswordFail, changePasswordSuccess, loading, loadingFail, loadingSuccess, updateProfile, updateProfileFail, updateProfileSuccess } from "../auth-slice";
import Config from '../../config';
import authAPI from "../../api/auth-api";
import generalAPI from "../../api/general-api";
import { closePopup } from "../task/task-slice";

async function fetchAcceptInvite(param) {
    return await authAPI.acceptInvitation(param);
}

async function fetchNewPassword(param) {
    return await authAPI.newPassword(param);
}

function* handleAcceptInvite(action) {
    const {Secret, UserID, navigate} = action.payload;
    try {
        const params = {
            Secret,
            UserID
        }
        const result = yield fetchAcceptInvite(params);
        console.log(result);
        if (result && result.data && result.data[0]) {
            yield navigate('/auth/new-password', {
                state: {
                    ...params,
                    Email: result.data[0].FullName,
                }
            });
        }
    } catch (error) {
        switch (error.response.data.code) {
            case "ERROR_USER_1023":
                yield navigate('/auth/new-password/success', {
                    state: {
                        success:true,
                        message:"This account has been activated."
                    }
                })
                break;
            case "ERROR_USER_1021":
                yield navigate('/auth/new-password/success', {
                    state: {
                        success:false,
                        message: "The link invitation is not match"
                    }
                })
                break;
            case "ERROR_USER_1022":
                yield navigate('/auth/new-password/success', {
                    state: {
                        success:false,
                        message: "The link invitation is not match"
                    }
                })
                break;
            default:
                break;
        }
       
    }
}

function* watchInvitationUser() {
    while (true) {
        const action = yield take([acceptInvitationCreateAccount.type]);
        yield fork(handleAcceptInvite, action)
    }
}

function* handleFetchNewPassword(action) {
    const {Secret, UserID, FullName, Password, ConfirmPassword, navigate} = action.payload;
    try {
        const params = {
            Secret, UserID, FullName, Password, ConfirmPassword,
        }
        const result = yield fetchNewPassword(params);
        if (result && result.data && result.data.affectedRows > 0) {
            yield put(updateProfileSuccess());
            yield navigate('/auth/new-password/success', {
                state: {
                    success: true
                }
            })
        } else {
            yield put(updateProfileFail());
            yield navigate('/auth/new-password/success', {
                state: {
                    success: false
                }
            })
        }
    } catch (error) {
        yield put(updateProfileFail());
        yield navigate('/auth/new-password/success', {
            state: {
                success: false
            }
        })
    }
}

function* watchNewPassword() {
    while (true) {
        const action = yield take([updateProfile.type]);
        yield fork(handleFetchNewPassword, action)
    }
}

function* handleLoading(action) {
    try {
        let lsToken = localStorage.getItem(Config.tokenName);

        // Check token validate
        if (!lsToken || lsToken.indexOf(':') === -1) {
            yield put(loadingFail());
        }

        lsToken = lsToken.split(':');
        // const token = lsToken[0];
        const expired = parseInt(lsToken[1], 10);
        const now = new Date().getTime();

        // Check token expired
        if (now > expired) {
            const response = yield call(generalAPI.refreshToken, action.payload);
            if(response && response.data && response.data.token){
                yield put(loadingSuccess({token: response.data.token}));
            } else {
                yield put(loadingFail());
            }
        } else {
            yield put(loadingSuccess());
        }
    } catch (error) {
        yield put(loadingFail());
    }
}

function* watchLoading() {
    while (true) {
        const action = yield take([loading.type]);
        yield fork(handleLoading, action)
    }
}

function* handleChangePassword(action) {
    try {
        const response = yield call(authAPI.changePassword, action.payload);
        if(response && response.data && response.data.affectedRows > 0) {
            yield put(changePasswordSuccess());
            toast.success("Change password successful");
            yield put(closePopup());
        } else {
            yield put(changePasswordFail());
            yield put(closePopup());
            toast.error("Change password unsuccessful");
        }
    } catch (error) {
        yield put(changePasswordFail());
            yield put(closePopup());
            toast.error("Change password unsuccessful");
    }
}

function* watchChangePassword() {
    while (true) {
        const action = yield take([changePassword.type]);
        yield fork(handleChangePassword, action)
    }
}

export function* authSaga() {
    yield fork(watchInvitationUser)
    yield fork(watchNewPassword);
    yield fork(watchLoading);
    yield fork(watchChangePassword);
}