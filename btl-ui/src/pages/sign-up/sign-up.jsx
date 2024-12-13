/************************************************************************/
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/

import { Link, useNavigate } from 'react-router-dom';
import { FormGroup, Form, Button, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import { InputText } from '../../components';
import authAPI from '../../api/auth-api';
import { signupFailed } from '../../redux/signup-slice';
import '../../styles/sign-up/sign-up.css';

// const customStyleTextCheckbox = {
//     color: 'var(--neutral-default-n-9)',
//     fontFamily: 'Inter',
//     fontSize: '14px',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: '19px',
// }
export default function SignUp(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const message = useSelector(state => state.signup.message);
    const [logging, setLogging] = useState(false);
    // eslint-disable-next-line
    const regExUTF8 = new RegExp(/^((?![0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\=\-\[\]\{\}\;\:\"\\\/\<\>\?]).)+$/);
    const form = useForm({
        mode: 'all',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    });
    const { handleSubmit, getValues } = form
    const handleSignup = async (value) => {
        setLogging(true);
        // console.log(value);
        try {
            const result = await authAPI.register({
                first_name: value.firstName,
                last_name: value.lastName,
                email: value.email,
                password: value.password,
                // confirm_password: value.re_password,
            })
            // console.log(result);
            if (result.status === 201) {
                navigate('/home-page');
                setLogging(false);
            }
        } catch (err) {
            if (err.response.status === 409){
                const visibilityError = document.getElementById("isExist");
            visibilityError.style.display = "flex";
            }
            dispatch(signupFailed(err.response.data.code));
            setLogging(false);
        }
    }

    return (
        <div className='authsignup'>
            <div className='authsignup__wrapper'>
                <Form className='authsignup__form' onSubmit={handleSubmit(handleSignup)} >
                    <div className="authlogin-left__form-logo">
                        {/* <img src={logo} alt="" /> */}
                    </div>
                    <div className="authsignup__form-header">
                    <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            fontFamily: 'fantasy',
                            fontSize: '50px'
                        }}>ĐĂNG KÝ</div>
                        <p style={{ color: '#475467' }}>
                            <>  </>
                        </p>
                        <p style={{ color: 'red' }}>
                            {/* <>{message}</> */}
                        </p>
                    </div>
                    <div className="authsignup__form-content">
                        <div className='form'>
                            <div className='form__container-input'>
                                <InputText
                                    type='text'
                                    label='Họ'
                                    name='firstName'
                                    placeholder='Nhập Họ'
                                    form={form}
                                    autoComplete='off'
                                    validate={{
                                        required: {
                                            value: true,
                                            message: 'Mục này không được để trống'
                                        },
                                        pattern: {
                                            value: regExUTF8,
                                            message: 'Chỉ sử dụng những ký tự A-Z và a-z'
                                        },
                                    }}
                                />
                            </div>
                            <div className='form__container-input'>
                                <InputText
                                    type='text'
                                    label='Tên'
                                    name='lastName'
                                    placeholder='Nhập Tên'
                                    form={form}
                                    autoComplete='off'
                                    validate={{
                                        required: {
                                            value: true,
                                            message: 'Mục này không được để trống'
                                        },
                                        pattern: {
                                            value: regExUTF8,
                                            message: 'Chỉ sử dụng những ký tự A-Z và a-z'
                                        },
                                    }}
                                />
                            </div>
                            <div className='form__container-input'>
                                <InputText
                                    type='text'
                                    label='Email'
                                    name='email'
                                    placeholder='Nhập email'
                                    form={form}
                                    validate={{
                                        required: {
                                            value: true,
                                            message: 'Mục này không được để trống'
                                        },
                                        pattern: {
                                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            message: 'Định dạng email không hợp lệ'
                                        },
                                    }}
                                />
                            </div>
                            <div className='form__container-input'>
                                <InputText
                                    type='password'
                                    label='Mật khẩu'
                                    name='password'
                                    placeholder='Nhập mật khẩu'
                                    form={form}
                                    validate={{
                                        required: {
                                            value: true,
                                            message: 'Mục này không được để trống'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Mật khẩu tối thiểu 8 ký tự'
                                        },
                                        validate: {
                                            alphaBetical: value => /([a-z])/.test(value) || 'Vui lòng nhập mật khẩu có ký tự bảng chữ cái (a-z)',
                                            alphaCapital: value => /([A-Z])/.test(value) || 'Vui lòng nhập mật khẩu có ký tự bảng chữ cái hoa (A-Z)',
                                            numberic: value => /([0-9])/.test(value) || 'Vui lòng nhập mật khẩu có số (0-9)'
                                        }
                                    }}
                                />
                            </div>
                            <div className='form__container-input'>
                                <InputText
                                    type='password'
                                    label='Xác nhận mật khẩu'
                                    name='re_password'
                                    placeholder='Xác nhận lại mật khẩu'
                                    form={form}
                                    validate={{
                                        required: {
                                            value: true,
                                            message: 'Mục này không được để trống'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Tối thiểu 8 ký tự'
                                        },
                                        validate: (value) => {
                                            const { password } = getValues();
                                            return password === value || "Mật khẩu không trùng khớp";
                                        }
                                    }}
                                />
                            </div>
                            <div id="isExist" style={{display: 'none', color: 'red', alignContent:'center', justifyContent: 'center'}}>
                                        Email này đã được sử dụng
                                    </div>
                            <FormGroup >
                                <Button className='form__button' disabled={logging}>
                                    {logging && <Spinner size='sm' />}
                                    <span className='form__button-span'>Đăng ký</span>
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                </Form >
                <label className="authlogin-left__form-footer" >Bạn đã có tài khoản! <Link to='/login' className='authsignup__form-footer-link'>Đăng nhâp</Link></label>
                {/* </FormGroup> */}
                <ToastContainer></ToastContainer>

            </div>
        </div>
    );
}
