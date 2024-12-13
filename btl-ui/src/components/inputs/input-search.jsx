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
// import { Button } from 'reactstrap';
import Select from 'react-select';
import { components } from 'react-select';
import { Controller } from 'react-hook-form';
import { ButtonAvatar, Chip } from '../';
import { Button } from '../button/button';
/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/inputs/input-search.css';
import { iconUserPlus01 } from '../../assets';

const SearchItem = ({ children, ...props }) => {
    return (
        <components.Option {...props}>
            <div className='input__search-body-filter-item'>
                <div className="input__search-body-filter-item-avatar" >
                    <img className="input__search-body-filter-item-avatar-photo" src={props.data.PhotoURL} alt="" />
                </div>
                <div className="input__search-body-filter-item-content">
                    <div className="input__search-body-filter-item-content-left">
                        <div className="input__search-body-filter-item-content-left-comment txt-body-14-regular">
                            {props.data.FullName}
                        </div>
                    </div>
                </div>
            </div>
        </components.Option>
    );

}

const Control = ({ children, ...props }) => {
    const info = props.getValue();
    return (
        <components.Control {...props}>
            <div style={{ paddingRight: '8px' }}>
                {props && props.selectProps && !props.selectProps.isMulti && <ButtonAvatar src={info[0]?.PhotoURL} type={'image'} size={24} disabled={true} />}
            </div>
            {children}
        </components.Control>
    );

}

const Menu = ({ children, ...props }) => {
    // const currentValue = props.getValue();
    // const dispatch = useDispatch();
    const handleOnClick = () => {
        // dispatch(openFormInvite({ setValue: (e) => handleSetValue(e) }));
        console.log('dispatch(openFormInvite({ setValue: (e) => handleSetValue(e) }));');
    }
    // const handleSetValue = (value) => {
    //     if (props && props.isMulti) {
    //         props.setValue([...currentValue, value])
    //     } else {
    //         props.setValue(value);
    //     }
    // }
    return (
        <components.Menu {...props}>
            {children}
            <div className='d-flex justify-content-center' style={{ padding: '8px 0' }}>
                <Button
                    label={'Add friend'}
                    variant={'outlined'}
                    size={'small'}
                    iconPosition={'left'}
                    onClick={handleOnClick}
                    icon={iconUserPlus01}
                />
            </div>

        </components.Menu>
    )
}

const MultiValue = ({ children, ...props }) => {
    const { removeProps, data } = props;
    return (
        <Chip removeProps={removeProps} label={data?.FullName} iconPosition={'right'} showDeleteButton={true} />
    )
}

export function InputSearch(props) {
    const { label, name, placeholder, form, validate = '', disabled, isMulti = false, options } = props;
    const { control, formState: { errors } } = form;
    const isError = errors[name];

    const handleOnChange = (value, onChange) => {
        if (name === "ReporterID")
            props.setValue && props.setValue("TaskAddress", value.Address)
        onChange(value);
        props.onChangeAssignee && props.onChangeAssignee(value);
        props.onChangeReporter && props.onChangeReporter(value);
        props.onChangeParticipant && props.onChangeParticipant(value);
    }

    return (
        <div className='d-flex flex-column' style={{ gap: '4px' }}>
            <label className='txt-body-12-medium' style={{ color: 'var(--neutral-default-n-9)' }}>
                {label}
                {validate?.required && <span style={{
                    color: 'red'
                }}>*</span>}
            </label>
            <Controller
                control={control}
                name={name}
                rules={validate}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                        // loadOptions={promiseOptions}
                        options={options}
                        className={isError ? 'is-invalid input__search-text' : ' input__search-text'}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '8px',
                                paddingLeft: '12px',
                                // paddingRight: '10px'
                            }),
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                fontSize: '14px',
                                lineHeight: '19px',
                            }),
                            valueContainer: (baseStyles, state) => ({
                                ...baseStyles,
                                gap: '4px',
                                padding: '4px 0'
                            }),
                            indicatorsContainer: (baseStyles, state) => ({
                                alignSelf: 'start'
                            }),
                            menuList: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: '8px'
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                // background: 
                                padding: '8px',
                                borderRadius: '8px',
                                color: 'var(--neutral-default-n-12)',
                                fontSize: '14px',
                                fontWeight: 400,
                                fontFamily: 'Inter',
                                backgroundColor: state.isSelected && 'var(--brand-primary-b-2)',
                                ":hover": {
                                    backgroundColor: 'var(--brand-primary-b-1)'
                                },
                                ":active": {
                                    backgroundColor: 'var(--brand-primary-b-2)'
                                }

                            })
                        }}
                        isClearable={false}
                        getOptionLabel={option => option.FullName}
                        getOptionValue={option => option.UserID}
                        onChange={(value) => handleOnChange(value, onChange)}
                        placeholder={placeholder}
                        disabled={disabled}
                        components={{
                            Option: SearchItem,
                            Control: Control,
                            IndicatorSeparator: () => null,
                            Menu: Menu,
                            ClearIndicator: () => null,
                            MultiValue,
                            // ValueContainer
                        }}
                        isMulti={isMulti}
                        value={value}
                    />
                )}
            />
            {errors && <span className='txt-body-12-regular' style={{ color: 'var(--funtional-danger-d-6)' }}>{errors[name]?.message}</span>}
        </div>
    );
}
