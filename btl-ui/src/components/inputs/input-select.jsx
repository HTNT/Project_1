import React from 'react';
import { Controller } from 'react-hook-form';
import { components } from 'react-select';
// import { FormFeedback, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

const Control = ({ children, ...props }) => {
    const info = props.getValue();
    const icon = info && info[0] && info[0].style &&  info[0].icon ? info[0].icon : null
    return (
        <components.Control {...props}>
            { icon && <div className='d-flex align-items-center' style={{gap: '8px', color: info[0].style.color}}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    maskSize: 'cover',
                    maskImage: `url(${info[0].icon})`,
                    WebkitMaskImage: `url(${info[0].icon})`,
                    backgroundColor:info[0].style.color
                }}></div>
            </div>}
                {children}
        </components.Control>
    );

}

const Option = ({ children, ...props }) => {
    return (
        <components.Option {...props}>
            <div className='d-flex align-items-center' style={{gap: '8px', color: props.data.style.color}}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    maskSize: 'cover',
                    maskImage: `url(${props.data.icon})`,
                    WebkitMaskImage: `url(${props.data.icon})`,
                    backgroundColor: props.data.style.color
                }}></div>
                <span className='txt-body-14-regular'>{props.data.label}</span>
            </div>
        </components.Option>
    );
}

export function InputSelect(props) {
    const { label, name, placeholder, form, validate = '', disabled, isMulti = false, option } = props
    const { control, formState: { errors } } = form
    const isError = errors[name];
    return (
        <div className='d-flex flex-column' style={{gap: '4px'}}>
            <label className='txt-body-12-medium' style={{color: 'var(--neutral-default-n-9)'}}>
                {label}
                {validate?.required && <sapn style={{
                    color: 'red'
                }}>*</sapn>}
            </label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value, name, ref } }) => {

                    return (
                        <Select
                            className={isError ? 'is-invalid input__search-text' : ' input__search-text'}
                            options={option}
                            value={option.filter((item)=>item.value===value)}
                            onChange={(data) => onChange(data.value)}
                            placeholder={placeholder}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    paddingLeft: '12px',
                                    height: '40px',
                                    borderRadius: '8px'
                                }),
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    padding: 0,
                                    margin: 0,
                                    fontSize: '14px',
                                    lineHeight: '20px'
                                    
                                }),
                                valueContainer: (baseStyles, state) => ({
                                    ...baseStyles,
                                    padding: 0,
                                    fontSize: '14px',
                                    lineHeight: '20px'
                                    
                                }),
                                singleValue: (baseStyles, state) => {
                                    const params = state.selectProps.value;
                                    const color = params && params[0] && params[0].style && params[0].style.color ? params[0].style.color : '';
                                    return {
                                        ...baseStyles,
                                        color: color,
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        paddingLeft: '8px'
                                    }
                                    
                                },
                                menuList: (baseStyles, state) => ({
                                    ...baseStyles,
                                    padding: '8px'
                                }),
                                container: (baseStyles, state)=>({
                                    ...baseStyles,
                                    fontSize: '14px',
                                    lineHeight: '19px',
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    // background: 
                                    padding: '8px',
                                    border: 'none',
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
                            components={{
                                Control: Control,
                                Option,
                                IndicatorSeparator: () => null ,
                            }}
                            disabled={disabled}
                            isMulti={isMulti}
                        />
                    )
                }}
            />

            {/* <FormFeedback  >{errors[name]?.message}</FormFeedback> */}
        </div>
    );
}
