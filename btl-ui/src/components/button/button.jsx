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
import React, { useLayoutEffect, useRef } from 'react';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { iconStar } from '../../assets'
import '../../styles/button/button.css';

const sizeElement = {
    small: {
        fontSize: 'txt-body-12-medium',
        iconSize: {
            width: '16px',
            height: '16px',
        }
    },
    medium: {
        fontSize: 'txt-body-14-bold',
        iconSize: {
            width: '20px',
            height: '20px',
        }
    },
    large: {
        fontSize: 'txt-title-20-bold',
        iconSize: {
            width: '28px',
            height: '28px',
        }
    },
}

export function Button(props) {
    const {
        label = 'Label',
        disabled = false,
        color = 'default',      // default | primary | success | warning | danger
        size = 'small',         // small | medium | large
        variant = 'filled',     // filled | filled-tonal | outlined | text
        icon = iconStar,
        iconPosition = 'none',  // full | left | right | none
        onClick,
        buttonStyle,
        type,
        iconStyle,
        children,
    } = props;
    // console.log(iconStyle);

    const refIconLeft = useRef(null);
    const refIconRight = useRef(null);

    useLayoutEffect(() => {
        switch (iconPosition) {
            case 'none':
                refIconLeft.current.style.display = 'none';
                refIconRight.current.style.display = 'none';
                break;
            case 'left':
                refIconRight.current.style.display = 'none';
                refIconLeft.current.style.display = 'block';
                break;
            case 'right':
                refIconLeft.current.style.display = 'none';
                refIconRight.current.style.display = 'block';
                break;
            case 'full':
                refIconLeft.current.style.display = 'block';
                refIconRight.current.style.display = 'block';
                break;
            default:
                break;
        }
    }, [iconPosition])

    return (
        <button type={type} className={`button button__color-${color}-${variant} button__size-${size}`} disabled={disabled} onClick={onClick} style={{ ...buttonStyle }}>
            <div className='button__icon-left' ref={refIconLeft} alt='' style={{
                ...sizeElement[size].iconSize,
                maskImage: `url(${icon})`,
                WebkitMaskImage: `url(${icon})`,
                ...iconStyle
            }} />
            <span className={`button__text ${sizeElement[size].fontSize}`}>{children || label}</span>
            <div className='button__icon-right' ref={refIconRight} alt='' style={{
                ...sizeElement[size].iconSize,
                maskImage: `url(${icon})`,
                WebkitMaskImage: `url(${icon})`,
                ...iconStyle
            }} />
        </button>

    );
}