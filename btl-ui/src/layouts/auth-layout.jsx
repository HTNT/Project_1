
// eslint-disable-next-line
'use strict';


import { useLocation } from 'react-router-dom';
/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../styles/auth-layout.css';
import { iconKey, iconMail, logo } from '../assets';
// import Footer from '../components/footer/footer';
const logoRoute = {
    '/auth/signup': {
        icon: logo
    },
    '/auth/login': {
        icon: logo
    },
    // '/auth/forgot-password': {
    //     icon: iconKey
    // },
    '/auth/forgot-password/verified': {
        icon: iconMail
    },
    '/auth/signup/verified': {
        icon: iconMail
    },
    '/auth/new-password': {
        icon: iconKey
    }
}

export function AuthLayout({ children }) {
    const { pathname } = useLocation();
    return (
        <div className="auth">
            {
                pathname === '/auth/login' &&
                <div className={"auth__form-logo"}>
                    <img src={logoRoute[pathname]?.icon} alt="" />
                </div>
            }

            {children}
            {/* <Footer /> */}
        </div>
    );
}
