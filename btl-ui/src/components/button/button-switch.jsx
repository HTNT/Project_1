import { forwardRef } from 'react';
import '../../styles/button/button-switch.css';

export const ButtonSwitch = forwardRef((props, ref) => {
    const { value, ...rest } = props;
    return(
        <label className="switch">
            <input className="switch__checkbox" type="checkbox" {...rest} checked={value}/>
            <span className="switch__slider switch__round"></span>
        </label>
    );
})
