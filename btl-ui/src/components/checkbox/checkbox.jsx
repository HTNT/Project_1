import { useState } from "react";
import React from 'react';

import "../../styles/check-box/check-box.css";


export function Checkbox(props) {
    const {
        textContent = 'label of checkbox',
        indeterminate = false,
        disabled = false,
        selected = false,
        customStyleTextCheckbox,
        name,
        form,
        validate = '',
    } = props;
    const {
        formState: { errors }
    } = form
    const isError = errors[name]
    // console.log(isError);

    const [isChecked, setIsChecked] = useState(selected);

    const handleCheck = function () {
        if (isChecked) {
            setIsChecked(false)
        } else if (isChecked === false) {
            setIsChecked(true)
        }
    }


    const handleCreateClassDiv = (indeterminate, disabled, checked) => {
        let text = 'checkbox-div-input-active';
        if (disabled && indeterminate) { return 'checkbox-div-input-indeterminate-disabled'; }
        if (disabled && checked) { return 'checkbox-div-input-checked-disabled'; }
        if (disabled) { return 'checkbox-div-input-active-disabled'; }
        if (indeterminate) { return 'checkbox-div-input-indeterminate'; }
        if (checked) { return 'checkbox-div-input-checked' }
        return text;
    }


    return (
        <>
            <div className='checkbox'>
                <div className={handleCreateClassDiv(indeterminate, disabled, isChecked)}>
                    <input
                        className={"checkbox-input"}
                        type='checkbox'
                        disabled={disabled}
                        id={`checkbox-${textContent}`}
                        defaultChecked={selected}
                        // onChange={() => handleCheck()}
                        // {...form.register(name, { onChange:handleCheck, ...validate})}
                        {...form.register(name, {
                            onChange: handleCheck,
                            ...validate
                        })}
                    />
                </div>
                <div className="checkbox-label-div">
                    <label
                        style={customStyleTextCheckbox}
                        htmlFor={`checkbox-${textContent}`}
                        className={disabled ? 'checkbox-label-disabled' : 'checkbox-label'}
                        disabled={disabled}
                    >{textContent}</label>
                </div>
            </div>
            {validate?.required ? <>
                <div className='checkbox-suport'>
                    <label className='checkbox-suport-label txt-body-12-regular'>{isError?.message}</label>
                </div>
            </> : null}
        </>

    );
}

