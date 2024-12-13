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

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React from 'react';
// import { Button } from '../button/button';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import '../../styles/button/button-login.css';


export function ButtonLogin(props) {
    const { icon, title, disabled, onClick = null, setLogging } = props;
    const handleClick = () => {
        onClick && onClick();
        setLogging(true);
    }
    return (
        <div className='button__container'>
            <button className='button__login' onClick={handleClick} disabled={disabled}>
                {/* <div className='form__linkedin-icon'></div> */}
                <img className='button__login-img' src={icon} alt="" />
                <div className='button__login-text'>
                    {title}
                </div>
            </button>
        </div>
    );
}
