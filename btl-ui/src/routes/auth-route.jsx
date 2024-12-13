// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { AuthLayout } from "../layouts";
import { openPopupError } from '../redux/auth-slice';


function AuthRoutes(props) {
    const {pathname} = useLocation();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get('uid');
    const dispatch = useDispatch();

    let profile = localStorage.getItem('BTL_USER');
    profile = profile ? JSON.parse(profile) : null;
    // console.log('== profile 2: ', typeof profile, profile);

    useEffect(() => {
        if (!uid || !profile)
            return
        if (uid === profile.UserID.toString())
            return
        dispatch(openPopupError());
    // eslint-disable-next-line
    },[pathname])
    return profile === null ? <AuthLayout><Outlet /></AuthLayout> : <Navigate to='/home-page'/>;
}
export { AuthRoutes };
