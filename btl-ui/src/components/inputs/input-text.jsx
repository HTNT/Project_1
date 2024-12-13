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
import React, { useEffect } from 'react';
import { Controller } from "react-hook-form";
/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/inputs/input-text.css';
import { Input } from './input';


export function InputText(props) {
    const { type, label, name, placeholder, readOnly, form, autoComplete, validate = '', customStyle, iconLeft, divInputDateCustomStyles, divTextInputDateCustomStyles,iconInputDateCustomStyles, labelInputDateCustomStyles } = props;
    const { control, formState: { errors } } = form;
    const isError = errors[name];
    const vComplete = !autoComplete || autoComplete === '' || autoComplete.toLowerCase() === 'off' ? 'off' : 'on';
    const disabled = props.disabled;
    useEffect(() => {
        try {
            const firstError = Object.keys(errors).reduce((field, a) => {
                return !!errors[field] ? field : a;
              }, null);
              if (firstError) {
                  const fieldFocus = document.getElementsByName(firstError);
                  if(fieldFocus && fieldFocus[0]){
                      fieldFocus[0].focus();
                  }
              }
        } catch (error) {
            console.log(error);
        }
    }, [errors]);
    return (
        <Controller
            name={name}
            control={control}
            render={({field})=>(
                // console.log(field)
                <Input 
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    status={isError ? 'error' : 'default'}
                    supportingText={isError && isError.message}
                    autoComplete={vComplete}
                    customStyle={customStyle}
                    iconLeft={iconLeft}
                    styleLeftIcon={field.value && {backgroundColor: 'var(--neutral-default-n-12)'} }
                    divInputDateCustomStyles = {divInputDateCustomStyles}
                    divTextInputDateCustomStyles= {divTextInputDateCustomStyles}
                    iconInputDateCustomStyles = {iconInputDateCustomStyles}
                    labelInputDateCustomStyles = {labelInputDateCustomStyles}
                    {...field}
                    disabled={disabled}
                    readOnly={readOnly}
                    validate={validate}

                />
            )}
            rules={validate}
        />
    );
}
