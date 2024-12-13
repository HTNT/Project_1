// eslint-disable-next-line
"use strict";

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Form, Spinner, Col, Row } from "reactstrap";

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { logo } from "../../assets";
import { Checkbox, Button, InputText } from "../../components";
// import {
//     loginFailed,
//     loginSuccess,
//     resetDataAuth,
//     selectMessage,
// } from "../../redux/auth-slice";
import authAPI from "../../api/auth-api";
// import generalAPI from "../../api/general-api";
// import { signup } from "../../redux/signup-slice";
import "../../styles/login/login.css";
import { delToken, getToken } from "../../api/axios-client";

Login.defaultProps = {
    logo: logo,
};

const customStyleTextCheckbox = {
    color: 'var(--neutral-default-n-9)',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '19px',
}

const customStyleButton = {
    width: '100%',
}

export default function Login(props) {
    const [logging, setLogging] = useState(false);

    // const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // const code = searchParams.get("code");
    // const state = searchParams.get("state");

    const form = useForm({
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
            // capcha: "",
        },
    });
    const { handleSubmit } = form;
    const handleLogin = async (value) => {
        // console.log(value);
        setLogging(true);
        try {
            const loginData = {
                email: value.email,
                password: value.password,
            };
            // console.log(loginData);
            const result = await authAPI.login(loginData);
            // console.log(result);
            if (result && result.data && result.data.tokenData) {
                
                localStorage.setItem('TOKEN_BTL', JSON.stringify(result.data.tokenData));
                const token = JSON.parse(localStorage.getItem('TOKEN_BTL')).token;
                const currentLogin = await authAPI.getCurrentLogin(token);
                const user = currentLogin.data.user;
                // console.log(user);
                if (Boolean(token && user._id)) {
                    localStorage.setItem('BTL_USER', JSON.stringify(user));
                    setLogging(false);
                }
                navigate("/home-page");
            }
        } catch (err) {
            setLogging(false);
            const visibilityError = document.getElementById("isError");
            visibilityError.style.display = "flex";
            console.log('== err: ', err);
        }
    };

    useEffect(() => {
        async function setCurrenLogin() {
            const user = localStorage.getItem('BTL_USER');
            // console.log(user);
            if (!user) delToken();
            const token = getToken();
            if (!token) delToken();
            // console.log(Boolean(token && user));
            if (Boolean(token && user)) navigate('/home-page')

        }
        setCurrenLogin();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="authlogin">
            <style global jsx>{`
              .animation-cursor::after {
                content: ' \\25CF';
                font-size: 80px;
                line-height: 25px;
                position: absolute;
                color: #0099ff;
                opacity: 0;
                animation: cursor 1.5s infinite;
              }

              @keyframes cursor {
                0%   { opacity:0; }
                50%  { opacity:1; }
                100% { opacity:0; }
              }
            `}</style>
            <Row className="g-0">
                <Col g-0
                    className="authlogin-left__wrapper-col"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <div className="authlogin-left__wrapper">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            fontFamily: 'fantasy',
                            fontSize: '50px'
                        }}>ĐĂNG NHẬP</div>
                        <Form className="authlogin-left__form" onSubmit={handleSubmit(handleLogin)}>
                            <div className="authlogin-left__form-logo">
                                {/* <img src={logo} alt="" /> */}
                            </div>
                            <div className="authlogin-left__form-content">
                                <div className="form" style={{ width: '80%' }}>
                                    <div className="form__container-input">
                                        <InputText
                                            type="text"
                                            label="Email"
                                            name="email"
                                            placeholder="Nhập email"
                                            form={form}
                                            validate={{
                                                required: {
                                                    value: true,
                                                    message: "Email không được để trống",
                                                },
                                                pattern: {
                                                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                                    message: "Định dạng không hợp lệ",
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="form__container-input">
                                        <InputText
                                            type="password"
                                            label="Mật khẩu"
                                            name="password"
                                            placeholder="Nhập mật khẩu"
                                            form={form}
                                            validate={{
                                                required: {
                                                    value: true,
                                                    message: "Mật khẩu không được để trống",
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: "Mật khẩu tối thiểu 1 ký tự",
                                                },
                                                // validate: {
                                                //     alphaBetical: (value) =>
                                                //         /([a-z])/.test(value) ||
                                                //         "Vui long nhập có ký tự bảng chữ cái(a-z)",
                                                //     alphaCapital: (value) =>
                                                //         /([A-Z])/.test(value) ||
                                                //         "Vui lòng nhập có ký tự bảng chữ cái viết hoa (A-Z)",
                                                //     numberic: (value) =>
                                                //         /([0-9])/.test(value) || "Vui lòng nhập có số (0-9)",
                                                // },
                                            }}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between authlogin-left__form-content-checkbox" style={{ marginBottom: 10 }}>
                                        <Checkbox customStyleTextCheckbox={customStyleTextCheckbox} name="remeber" form={form} textContent={'Lưu thông tin trong 30 ngày'}>
                                        </Checkbox>
                                        {/* <Link to="/auth/forgot-password">Forgot password</Link> */}
                                    </div>
                                    <div className="authlogin-left__form-content-checkbox" style={{ fontSize: "14px" }}>
                                        Bằng việc tiếp tục, bạn đồng ý với  <Link to={"/terms-conditions"} style={{ fontSize: "13px" }}>Điều khoản dịch vụ</Link> và <Link to={"/privacy-policy"} style={{ fontSize: "13px" }}>Chính sách quyền riêng tư</Link>, bao gồm việc sử dụng <Link to={"/cookies-policy"} style={{ fontSize: "13px" }}>Cookies.</Link>
                                    </div>
                                    <div id="isError" style={{display: 'none', color: 'red', alignContent:'center', justifyContent: 'center'}}>
                                        Tài khoản hoặc mật khẩu không đúng
                                    </div>
                                    <FormGroup>
                                        <Button
                                            className="form__button"
                                            disabled={logging}
                                            label="Đăng nhập"
                                            size="medium"
                                            color="primary"
                                            iconPosition="none"
                                            buttonStyle={customStyleButton}
                                        >
                                            {logging && <Spinner size="sm" />}
                                            <span className="form__button-span">Đăng nhập</span>
                                        </Button>
                                    </FormGroup>
                                </div>
                            </div>

                        </Form>
                        <div className="authlogin-left__form">
                            <div className="authlogin-left__form-footer">
                                <span>Bạn không có tài khoản? </span>
                                <Link className="authlogin-left__form-footer-link" to="/signup">Đăng ký mới</Link>
                            </div>
                            {/* </FormGroup> */}
                        </div>
                    </div>
                </Col>
            </Row>
            {/* </Container> */}
        </div>
    );
}
