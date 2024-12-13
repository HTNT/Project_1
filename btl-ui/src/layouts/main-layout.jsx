// eslint-disable-next-line
"use strict";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { Button, CloseButton } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

import { Header } from "../components";
import '../styles/main-layout.css';
// import FormInviteFriend from '../components/form/form-invite-friend/form-invite-friend';
// import { iconWarning } from '../assets';
// import { closePopupError } from '../redux/auth-slice';
// import authAPI from '../api/auth-api';
// import Modal from 'react-modal';
// import {  Popup} from '../components';

// import Footer from '../components/footer/footer';

// const PopupErrorLink = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     localStorage.removeItem('BTL_USER');
//     navigate('/login');
//     try {
//       await authAPI.logout();
//     } catch (err) {

//     }
//   }
//   return (
//     <div className='popup__overlay'>
//       <div className='popup__error'>
//         <CloseButton className='popup__error-close' onClick={() => dispatch(closePopupError())} />
//         <img src={iconWarning} alt='' height="144px" width="144px" style={{ marginBottom: '20px' }} />
//         <h4>Something went wrong</h4>
//         <p>Please logout this current user and try again.</p>
//         <div className='popup__error-btn'>
//           <Button className='popup__error-reload' color='primary' outline onClick={handleLogout}>Logout</Button>
//           <Button className='popup__error-reload' color='primary' outline onClick={() => dispatch(closePopupError())}>Close</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

export const MainLayout = ({ children, background }) => {

  return (
    <>
      {
        <div>
          <ToastContainer />
          <Header />

          <div className='wrapper-main' style={{ background: background }}>
            <div className='main'>
              {children}
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      }
    </>
  );
};
