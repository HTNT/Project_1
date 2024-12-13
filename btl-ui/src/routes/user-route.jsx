// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { UserLayout } from "../layouts";


function UserRoutes(props) {
    let profile = localStorage.getItem('BTL_USER');
    profile = profile ? JSON.parse(profile) : null;
    // console.log('== profile 1: ', typeof profile, profile)
    const background =  '#fff'

    return profile && profile._id ? <UserLayout background={background}><Outlet /></UserLayout> : <Navigate to='/login' />
}
export { UserRoutes };