/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]               */
/*                                                                      */
/*   Created    : 20-04-2024 14:31:12.                                  */
/*   Modified   : 20-04-2024 14:31:12.                                  */
/*                                                                      */
/************************************************************************/
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import { useEffect, useLayoutEffect, useRef, useState } from 'react';


/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import '../../styles/input-hashtag-component/input-hashtag-component.css';
import { placeholder } from '@babel/types';

export const InputHashtagComponent = (props) => {
    const { name, form, label = 'Label', olddata = [] } = props;
    const { register } = form;
    const [hashtags, setHashtags] = useState([...olddata]);
    const [currentInput, setCurrentInput] = useState('');


    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === ' ' && currentInput.trim() !== '') {
            e.preventDefault();
            setHashtags([...hashtags, currentInput.trim()]);
            setCurrentInput('');
        } else if (e.key === 'Backspace' && currentInput === '' && hashtags.length > 0) {
            const updatedHashtags = [...hashtags];
            updatedHashtags.pop();
            setHashtags(updatedHashtags);
            props.setValue && props.setValue("Hashtag",updatedHashtags)
        }
    };

    useEffect(() => {
        props.setValue && props.setValue("Hashtag", hashtags);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hashtags]);

    const inputRef = useRef();
    const divInputRef = useRef();

    const handleDivClick = () => {
        inputRef.current.focus();
        setShowInput(true);
    };

    const [showInput, setShowInput] = useState(false);
    const handleVisibleInput = () => {
        setShowInput(!showInput);
    }

    useLayoutEffect(() => {
        switch (showInput) {
            case true:
                if (divInputRef.current) divInputRef.current.style.display = 'block';
                handleDivClick();
                break;
            case false:
                if (divInputRef.current) divInputRef.current.style.display = 'none';
                break;
            default:
                break;
        }
    }, [showInput]);


    return (
        <div className='wrapper-input'>
            <label className='wrapper-input__label'>{label}</label>
            <div className="wrapper-input__list" onClick={handleDivClick} >
                {hashtags.length === 0 && showInput === false && <span className="wrapper-input__list-placeholder">heheehe</span>}
                {hashtags.map((tag, index) => (
                    <span key={index} className="wrapper-input__list-hashtag">
                        #{tag}  &nbsp;
                    </span>
                ))}

                <div
                    ref={divInputRef} onBlur={handleVisibleInput}
                    className="wrapper-input__container"
                >
                    <input
                        {...register(name)}
                        ref={inputRef}
                        id= {name}
                        type="text"
                        value={currentInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className={`txt-body-14-regular input-hashtag`}
                        placeholder={placeholder}
                        form={form}
                        name={name}
                    />
                </div>
            </div>
        </div>
    );
};



