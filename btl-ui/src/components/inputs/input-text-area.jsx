/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Author name], [Author email]                         */
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
// import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { Controller } from "react-hook-form";

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/inputs/input-text-area.css';
import { Input } from './input';


export function InputTextArea(props) {
    const { type, label, name, placeholder, form, autoComplete, validate = '', customStyle, readOnly } = props;
    const { control, formState: { errors } } = form;
    const isError = errors[name];
    const vComplete = !autoComplete || autoComplete === '' || autoComplete.toLowerCase() === 'off' ? 'off' : 'on';
    const disabled = props.disabled;
    return (
        <Controller
            name={name}
            control={control}
            render={({field})=>(
                <Input 
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    status={isError ? 'error' : 'default'}
                    supportingText={isError && isError.message}
                    autoComplete={vComplete}
                    customStyle={customStyle}
                    isMultiLine={true}
                    {...field}
                    readOnly={readOnly}
                    disabled={disabled}
                />
            )}
            rules={validate}
        />
    )
}
