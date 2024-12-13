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

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/button/button-link.css';
import { iconCalendarPlus02 } from '../../assets';

export function ButtonLink(props) {
    const { active = false, content, onClick } = props;
    return (
        <div className={active ? 'button__link link-active' : 'button__link'} onClick={onClick}>
            <div className='button__link-left'>
                <div className='button__link-top'></div>
                <div className='button__link-bottom'></div>
            </div>
            <div className='button__link-center txt-body-14-bold d-flex align-items-center justify-content-center' style={{gap: '4px'}}>
                {/* <img src={iconCalendarPlus02} alt="" /> */}
               {content === 'New Sked' && <div className='button__link-icon' style={{
                    height: '20px',
                    width: '20px',
                    maskImage: `url(${iconCalendarPlus02})`,
                    WebkitMaskImage: `url(${iconCalendarPlus02})`,
                }}/>}
                <div>{content}</div>
            </div>
            <div className='button__link-right'></div>
        </div>
    );
}