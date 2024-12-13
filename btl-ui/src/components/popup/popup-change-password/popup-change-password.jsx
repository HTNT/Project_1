import React from 'react';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { InputText } from '../../inputs/input-text';
import { Button } from '../../button/button';
// import { changePassword } from '../../../redux/auth-slice';
// import { closePopup } from '../../../redux/task/task-slice';
import '../../../styles/popup/popup-change-password.css';

function PopupChangePassword(props) {
    const dispatch = useDispatch();
    const form = useForm();
    const { handleSubmit, getValues } = form;
    const handleOnSubmit = (value) => {
        // dispatch(changePassword(value));
        console.log('changePassword');
    }
    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className='popup-change-password'>
            <InputText label={'Current password'} name={'OldPassword'} form={form} type={'password'}
                validate={{
                    required: {
                        value: true,
                        message: 'This field is required'
                    },
                }} />
            <InputText label={'New password'} name={'NewPassword'} form={form} type={'password'}
                validate={{
                    required: {
                        value: true,
                        message: 'This field is required'
                    },
                    minLength: {
                        value: 8,
                        message: 'Min characters is 8'
                    },
                    validate: {
                        alphaBetical: value => /([a-z])/.test(value) || 'Please include alpha betical characters (a-z)',
                        alphaCapital: value => /([A-Z])/.test(value) || 'Please include alpha capital characters (A-Z)',
                        numberic: value => /([0-9])/.test(value) || 'Please include numberic (0-9)'
                    }
                }} />
            <InputText label={'Confirm password'} name={'ConfirmPassword'} form={form} type={'password'}
                validate={{
                    required: {
                        value: true,
                        message: 'This field is required'
                    },
                    minLength: {
                        value: 8,
                        message: 'Min characters is 8'
                    },
                    validate: (value) => {
                        const { NewPassword } = getValues();
                        return NewPassword === value || "Your password do not match!";
                    }
                }}
            />
            <div className='popup-change-password__footer'>
                <Button type={'button'} iconPosition={'none'} size={'medium'} variant={'outlined'} label={'Cancel'} onClick={() => console.log('dispatch(closePopup())')} />
                <Button iconPosition={'none'} size={'medium'} color={'primary'} label={'Save'} />
            </div>
        </form>
    );
}

export default PopupChangePassword;