// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { LoginLayout } from "../layouts";
import { openPopupError } from '../redux/auth-slice';
import useLocalStorage from '../hook/useLocalStorage';


function LoginRoutes(props) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    // let profile = localStorage.getItem('BTL_USER');
    const profile = useLocalStorage('BTL_USER');
    // profile = profile ? JSON.parse(profile) : null;
    console.log(profile);
    // console.log('== profile 2: ', typeof profile, profile);

    useEffect(() => {
        if (!profile)
            return
        if (profile._id.toString())
            return
        dispatch(openPopupError());
        // eslint-disable-next-line
    }, [pathname])
    // console.log(Outlet);
    return profile === null ? <LoginLayout><Outlet /></LoginLayout> : <Navigate to='/home-page' />;
}
export { LoginRoutes };