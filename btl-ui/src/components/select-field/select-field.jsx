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
import { FormGroup, Label } from 'reactstrap';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import '../../styles/select-field/select-field.css'


export function SelectField(props) {
    const { label, placeholder, name, form, disabled, option, idName, getCityByCountry } = props;
    const { register } = form
    // const handleClick = () => {
    //     console.log(123435);
    // }

    return (
        <FormGroup className='select'>
            {/* <button onClick={(e) => handleClick(e)}>abd</button> */}
            <Label className='select__label'>{label}</Label>
            <select className="form-select select__box" {...register(name)} disabled={disabled} onChange={getCityByCountry}>
                <option value="" disabled selected hidden><span className='select__box-placeholder'>{placeholder}</span></option>
                {
                    option.map((item, index) => (
                        <option value={item[idName]} key={index}
                        ><span className='select__box-placeholder' key={index}>{item.CountryName !== undefined ? item.CountryName : item.CityName}</span></option>
                    ))
                }
            </select>
        </FormGroup>
    );
}
