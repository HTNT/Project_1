

// eslint-disable-next-line
"use strict";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Header } from '../../components';
import '../../styles/user-layout/user-layout.css';


export const UserLayout = ({ children, background }) => {

  return (
    <>
      {
        <div>
          <ToastContainer />
          <Header />

          <div className='wrapper-user' style={{ background: background }}>
            <div className='user'>
              {children}
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      }
    </>
  );
};
