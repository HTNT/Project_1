
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
import '../../styles/status/status-samples.css';

const sizeElement = {
    small: {
        fontSize: 'txt-body-12-regular',
        iconSize: {
            width: '16px',
            height: '16px',
        }
    },
    medium: {
        fontSize: 'txt-body-14-regular',
        iconSize: {
            width: '20px',
            height: '20px',
        }
    },
    large: {
        fontSize: 'txt-title-16-bold',
        iconSize: {
            width: '24px',
            height: '24px',
        }
    },
}

export function StatusSamples(props) {
    const { 
        label = 'Status',
        disabled = false,
        color = 'default',      // default | primary | success | warning | danger      
        size = 'small',         // small | medium | large 
        variant = 'filled',     // filled | filled-tonal | outlined | text
        icon = iconStar,
        iconPosition = 'left',  // left | none
        stylesContainer,
        stylesIcon
    } = props;

    const refIconLeft = useRef(null);

    useLayoutEffect(() => {
        switch (iconPosition) {
            case 'none':
                refIconLeft.current.style.display = 'none';
                break;
            case 'left':
                refIconLeft.current.style.display = 'block';
                break;
            default:
                break;
        }
    }, [iconPosition])

    return (
        <div className={`status-samples status-samples__color-${color}-${variant} status-samples__size-${size}`} disabled={disabled} style={{...stylesContainer}}>
            <div className='status-samples__icon-left' ref={refIconLeft} alt='' style={{
                ...sizeElement[size].iconSize,
                maskImage: `url(${icon})`,
                WebkitMaskImage: `url(${icon})`,
                ...stylesIcon
            }}/>
            <span className={`status-samples__text ${sizeElement[size].fontSize}`}>{label}</span>
        </div>
        
    );
}