
import React, { useLayoutEffect, useRef } from 'react';
import { iconButtonPlus } from '../../assets'
import '../../styles/button/button-process.css';

const sizeElement = {
    medium: {
        fontSize: 'txt-title-14-bold',
        iconSize: {
            width: '20px',
            height: '20px',
        }
    },
}

export function ButtonProcess(props) {
    const { 
        label = 'New Sked',
        disabled = false,
        color = 'primary',     
        size = 'medium',         
        variant = 'filled',     // filled | filled-tonal 
        icon = iconButtonPlus,
        iconPosition = 'left',  
        onClick,
    } = props;

    const refIconLeft = useRef(null);
    const refIconRight = useRef(null);

    useLayoutEffect(() => {
        switch (iconPosition) {
            case 'none':
                if (refIconLeft.current) refIconLeft.current.style.display = 'none';
                if (refIconRight.current) refIconRight.current.style.display = 'none';
                break;
            case 'left':
                if (refIconRight.current) refIconRight.current.style.display = 'none';
                if (refIconLeft.current) refIconLeft.current.style.display = 'block';
                break;
            default:
                break;
        }
    }, [iconPosition])

    return (
        <button className={`button-process button-process__color-${color}-${variant} button-process__size-${size}`} disabled={disabled} onClick={onClick} >
            <div className='button-process__icon-left' ref={refIconLeft} alt='' style={{
                ...sizeElement[size].iconSize,
                maskImage: `url(${icon})`,
                WebkitMaskImage: `url(${icon})`,
            }}/>
            <span className={`button-process__text ${sizeElement[size].fontSize}`}>{label}</span>
        </button>
    );
}