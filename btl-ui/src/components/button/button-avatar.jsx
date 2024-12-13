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
import React, { memo, useMemo } from 'react';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { iconPerson } from '../../assets'
import '../../styles/button/button-avatar.css';

const sizeElement = {
    24: {
        height: "16px",
        width: "16px",
    },
    28: {
        height: "20px",
        width: "20px",
    },
    32: {
        height: "24px",
        width: "24px",
    },
    40: {
        height: "32px",
        width: "32px",
    },
    48: {
        height: "36px",
        width: "36px",
    },
    80: {
        height: "56px",
        width: "56px",
    },
    120: {
        height: "88px",
        width: "88px",
    },
    160: {
        height: "120px",
        width: "120px",
    },
}

export const ButtonAvatar = memo((props) => {
    const { 
        disabled = false,
        size = 180,
        src = 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg',
        type = 'icon',
        icon = iconPerson,
        text = 'Nguyen Nguyen',
        onClick,
    } = props;

    const getShortedName = () => {
        const temp = text.toUpperCase().split(' ');
        return temp.length >= 2 ? temp[0][0] + temp[temp.length - 1][0] : temp[0][0];
    }

    return useMemo(()=>{
        return (
            <button type={'button'} className='avatar' style={{
                width: size,
                height: size,
            }} disabled={disabled} onClick={onClick}>
                {
                    type === 'image' ? 
                    <img className='avatar__img' src={src} alt="" style={{verticalAlign: 'top'}}/> : 
                    type.toLowerCase() === 'icon' ? 
                    <div className='avatar__icon-wrapper' >
                        <div className='avatar__icon' style={{
                            maskImage: `url(${icon})`,
                            WebkitMaskImage: `url(${icon})`,
                            ...sizeElement[size]
                        }}/> 
                    </div> :
                    type.toLowerCase() === 'text' ? 
                    <div className='avatar__text' style={{
                        fontSize: size / 2,
                    }} >{getShortedName()}</div> :
                    null
                }
            </button>
        )
        // eslint-disable-next-line
    },[size, disabled, src, type, icon, text]);
})