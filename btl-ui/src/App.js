// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
// import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { RouterProvider,
  //  redirect, 
  //  useNavigate 
  } from 'react-router-dom';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
// import { delToken, getToken } from './api/axios-client';
// import generalAPI from './api/general-api';
import { router } from './routes/route';
// import generalAPI from './api/general-api';

/************************************************************************/
/*   For Google analytics server tracking                               */
/************************************************************************/
const gaID = process.env.REACT_APP_GOOGLE_ANALYTICS;
if (typeof gaID === 'string' && gaID.length > 5) {
  ReactGA.initialize(gaID);
}

/************************************************************************/
/*   Start application                                                  */
/************************************************************************/
function App() {
  // const navigate = useNavigate();
  // const [isLogin, setisLogin] = useState('/');
  // useEffect(() => {
  //   const user = localStorage.getItem('BTL_USER');
  //   // console.log(user);
  //   if (!user) delToken();
  //   const token = getToken();
  //   // console.log(token);
  //   if (!token) delToken();

  //   // console.log(Boolean(user && token));
  //   if (Boolean(user && token)) {
  //     setisLogin('/login')
  //   }
    
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
