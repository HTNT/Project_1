/************************************************************************/
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React from "react";
import { Link } from "react-router-dom";

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import "../../styles/privacy/privacy.css";
// import Footer from "../../components/footer/footer";

const NotFound = () => {
    return (
        <div className="privacy">
            <div className='privacy__top' style={{ padding: "70px 0 10px 0" }}>
                <div className='privacy__top-body' style={{ width: "100%" }}>
                    <div className='text-3d'>
                        <div>404</div><br />
                        <p>Not found</p>
                    </div>
                </div>
            </div>
            <div className='privacy__middle' style={{ textAlign: "center", minHeight: "55vh" }}>
                <div>You have an account? <Link to={"/login"}>Login</Link></div>
                <div>Don't have an account? <Link to={"/signup"}>Register</Link></div>
            </div>
            {/* <Footer /> */}
        </div>
    )
        ;
}

export default NotFound
