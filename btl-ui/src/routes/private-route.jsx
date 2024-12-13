// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { MainLayout } from "../layouts";


function PrivateRoutes(props) {
    let profile = localStorage.getItem('BTL_USER');
    profile = profile ? JSON.parse(profile) : null;
    // console.log('== profile 1: ', typeof profile, profile);
    const { pathname } = useLocation();
    const background = (pathname !== '/home-page') ? '#F2FAFF' : '#fff'

    return profile && profile._id ? <MainLayout background={background}><Outlet /></MainLayout> : <Navigate to='/login' />
}
export { PrivateRoutes };
