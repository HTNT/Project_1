// eslint-disable-next-line
'use strict';

import '../styles/full-layout.css';
// import Footer from '../components/footer/footer';

import { Header } from '../components';


export const FullLayout = ({children}) =>{
    return(
        <div className='full'>
            <Header/>
            {children}
            {/* <Footer/> */}
        </div>
    );
};