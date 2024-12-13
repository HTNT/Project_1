/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]    */
/*                                                                      */
/*   Created    : 06-29-2024 18:42:05.                                  */
/*   Modified   : 06-29-2024 18:42:05.                                  */
/*                                                                      */
/************************************************************************/
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React from 'react';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/text-link/text-link.css';
import { Link } from 'react-router-dom';

export function TextLink(props) {
    const {
        label,
        disabled,
        // color = 'default',      // default | primary | success | warning | danger      
        size = 'giant',         // small | medium | large 
        // variant = 'filled',     // filled | filled-tonal | outlined | text
        stylesContainer,
        to = '/edit-profile',
        textColor,
    } = props;
    const styleDisabled = disabled ? {
        textDecoration: 'none',
        cursor: 'default',
    } : null
    return (
        <div className= 'text-link' disabled={disabled} style={{ ...stylesContainer }}>
            {
                !disabled ?
                <Link to={to} className={`text-link__text text-link__text-size-${size} `} style={{color: textColor, ...styleDisabled}}>{label}</Link>:
                <span className={`text-link__text text-link__text-size-${size} `} style={{color: textColor, ...styleDisabled}}>{label}</span>

            }
        </div>

    );
}