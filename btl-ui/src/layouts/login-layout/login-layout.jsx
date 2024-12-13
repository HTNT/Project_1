/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]    */
/*                                                                      */
/*   Created    : 06-04-2024 18:42:05.                                  */
/*   Modified   : 06-04-2024 18:42:05.                                  */
/*                                                                      */
/************************************************************************/
// eslint-disable-next-line
'use strict';


// import Footer from '../../components/footer/footer';
// import { useLocation } from 'react-router-dom';
/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/login-layout/login-layout.css';
// import { logo } from '../../assets';

export function LoginLayout({ children }) {

    return (
        <div className="login">
            {children}
            {/* <Footer/> */}
        </div>
    );
}