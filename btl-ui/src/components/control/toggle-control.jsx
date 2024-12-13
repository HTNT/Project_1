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
import { Controller } from 'react-hook-form';
import { Toggle } from '../toggle/toggle';
/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

export function ToggleControl(props) {
    const { form, name, label, disabled } = props;
    const { control } = form;

    return (
        <Controller
            name={name}
            control={control}
            render={({field})=>(
                <Toggle
                    label={label}
                    {...field}
                    disabled={disabled}
                />
            )}
        />
    );
}