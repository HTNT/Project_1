import React from 'react';
import { Controller } from 'react-hook-form';
import SelectBox from '../select-box/select-box';

function SelectBoxControl(props) {
    const { name, data, form, isMobile } = props;
    const {control} = form;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <SelectBox
                    {...field}
                    data={data}
                    isMobile={isMobile}
                />
            )}
        >

        </Controller>
    );
}

export default SelectBoxControl;