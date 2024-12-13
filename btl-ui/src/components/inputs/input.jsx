
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
import React, { useRef } from 'react';
// import { FormGroup, Label, FormFeedback } from 'reactstrap';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/inputs/input.css';
import { iconCalendar, iconClock } from '../../assets';

const sizeElement = {
    small: {
        fontSize: 'txt-body-12-medium',
        iconSize: {
            width: '20px',
            height: '20px',
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
        fontSize: 'txt-title-16-bold',
        iconSize: {
            width: '24px',
            height: '24px',
        }
    },
}

export function Input(props) {
    const {
        type,
        disabled,
        label,
        name,
        placeholder,
        autoComplete,
        validate = '',
        customStyle,
        styleLeftIcon,
        iconLeft,
        iconRight,
        iconSupporting ,
        size = 'small',
        suffix,
        prefix,
        supportingText,
        status = 'success',
        isMultiLine,
        divInputDateCustomStyles,
        divTextInputDateCustomStyles,
        iconInputDateCustomStyles,
        // labelInputDateCustomStyles,
        readOnly,
    } = props;
    const vComplete = !autoComplete || autoComplete === '' || autoComplete.toLowerCase() === 'off' ? 'off' : 'on';

    const refIconLeft = useRef(null);
    const refIconRight = useRef(null);
    const refInput = useRef(null);

    const handleOpenPicker = () => {
        if(disabled || readOnly) return;
        refInput.current.showPicker();
    }

    const _renderInput = () => {
        if(isMultiLine) {
            return (
                <>
                    {iconLeft && <div className='cinput__icon-left' disabled={disabled}>
                        <div
                            className='cinput__icon-left-icon' ref={refIconLeft}
                            style={{
                                ...sizeElement[size].iconSize,
                                maskImage: `url(${iconLeft})`,
                                WebkitMaskImage: `url(${iconLeft})`,
                                ...styleLeftIcon,
                            }}
                        ></div>
                    </div>}
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', paddingRight: '16px', paddingLeft: iconLeft ? 0 : '16px', backgroundColor: readOnly && 'var(--neutral-default-n-1)' }}>
                        {prefix && <p className='cinput__prefix txt-body-14-regular'>{prefix}</p>}
                        <div style={{minHeight: '40px', width: '100%', paddingTop: '10px'}}>
                            <textarea ref={refInput} {...props} id={name} className={`cinput__text-box cinput__textarea txt-body-14-regular`} placeholder={placeholder} autoComplete={vComplete} style={{ height: 'fit-contain', ...customStyle}} disabled={disabled} onInput={(e) => {e.target.style.height = "";e.target.style.height = e.target.scrollHeight + 'px'}} readOnly={readOnly}/>
                        </div>
                        {suffix && <p className='cinput__suffix txt-body-14-regular' >{suffix}</p>}
                    </div>
                    {iconRight && <div className='cinput__icon-right'>
                        <div
                            className='cinput__icon-right-icon' ref={refIconRight}
                            style={{
                                ...sizeElement[size].iconSize,
                                maskImage: `url(${iconRight})`,
                                WebkitMaskImage: `url(${iconRight})`,
                            }}
                        />
                    </div>}
                </>
            )
        }
        if (type === 'date') {
            return (
                <>
                    <div className='cinput__icon-left' onClick={handleOpenPicker} disabled={disabled} readOnly={readOnly}>
                        <div
                            className='cinput__icon-left-icon' ref={refIconLeft}
                            style={{
                                ...sizeElement[size].iconSize,
                                maskImage: `url(${iconCalendar})`,
                                WebkitMaskImage: `url(${iconCalendar})`,
                                ...styleLeftIcon,
                                ...iconInputDateCustomStyles,
                            }}
                        ></div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', paddingRight: '16px' }}>
                        <div className='cinput__text' style={divTextInputDateCustomStyles}>
                            <input ref={refInput} {...props} id={name} className={`cinput__text-box txt-body-14-regular`} placeholder={placeholder} autoComplete={vComplete} style={{background: 'transparent',...customStyle}} disabled={disabled}/>
                        </div>
                    </div>
                </>

            )
        } else if (type === "time") {
            return (
                <>
                    <div className='cinput__icon-left' onClick={handleOpenPicker} readOnly={readOnly} disabled={disabled}>
                        <div
                            className='cinput__icon-left-icon' ref={refIconLeft}
                            style={{
                                ...sizeElement[size].iconSize,
                                maskImage: `url(${iconClock})`,
                                WebkitMaskImage: `url(${iconClock})`,
                                ...styleLeftIcon, 
                                ...iconInputDateCustomStyles,
                            }}
                            disabled={disabled}
                            readOnly={readOnly}
                        ></div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', paddingRight: '16px' }}>
                        <div className='cinput__text' style={divTextInputDateCustomStyles}>
                            <input ref={refInput} {...props} id={name} className={`cinput__text-box txt-body-14-regular`} placeholder={placeholder} autoComplete={vComplete} style={{background: 'transparent',...customStyle}} disabled={disabled} step={1}/>
                        </div>
                    </div>
                </>

            )
        } else {
            return (
                <>
                    {iconLeft && <div className='cinput__icon-left'>
                        <div
                            className='cinput__icon-left-icon' ref={refIconLeft}
                            style={{
                                ...sizeElement[size].iconSize,
                                maskImage: `url(${iconLeft})`,
                                WebkitMaskImage: `url(${iconLeft})`,
                                ...styleLeftIcon
                            }}
                        ></div>
                    </div>}
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', paddingRight: '16px', paddingLeft: iconLeft ? 0 : '16px', borderRadius: '8px', backgroundColor: readOnly && 'var(--neutral-default-n-1)'}}>
                        {prefix && <p className='cinput__prefix txt-body-14-regular'>{prefix}</p>}
                        <div className='cinput__text'>
                            <input readOnly={readOnly} ref={refInput} {...props} id={name} className={`cinput__text-box txt-body-14-regular`} placeholder={placeholder} autoComplete={vComplete} style={customStyle} disabled={disabled} />
                        </div>
                        {suffix && <p className='cinput__suffix txt-body-14-regular' >{suffix}</p>}
                    </div>
                    {iconRight && <div className='cinput__icon-right'>
                        <div
                            className='cinput__icon-right-icon' ref={refIconRight}
                            style={{
                                ...sizeElement[size].iconSize,
                                maskImage: `url(${iconRight})`,
                                WebkitMaskImage: `url(${iconRight})`,
                            }}
                        />
                    </div>}
                </>
            )
        }
    }

    return (
        <div className='wrapper-cinput' style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
        }} disabled={disabled}>
            {label ? (
                <label className='cinput__label txt-body-12-medium' htmlFor={name} >
                    {label}
                    {validate?.required && <span style={{ color: 'red' }}>*</span>}
                </label>
            ) : null}
            <div className={`cinput cinput__${status} ${readOnly && 'cinput__read-only'}`} style={divInputDateCustomStyles}>
                {_renderInput()}
            </div>
            {
                !iconSupporting && !supportingText ? null :
                <div className='cinput__supporting'>
                    {
                        iconSupporting &&
                        <div
                            className='cinput__supporting-icon'
                            style={{
                                height: '16px',
                                width: '16px',
                                maskImage: `url(${status === 'error' || status === 'success' ? iconSupporting : iconLeft})`,
                                WebkitMaskImage: `url(${status === 'error' || status === 'success' ? iconSupporting : iconLeft})`,
                                maskSize: 'cover'
                            }}
                        />
                    }
                    {
                        supportingText && <span className='txt-body-12-regular'>{supportingText}</span>
                    }
                </div>
            }
        </div>

    );
}
