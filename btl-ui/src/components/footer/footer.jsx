import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/footer/footer.css';

function Footer(props) {
    return (
        <footer className='footer'>
            <div className='footer__links'>
                <Link to={'/story'} onClick={() => window.scrollTo(0, 0)} className='footer__links-text txt-body-14-bold'>Story</Link>
                <Link to={'/terms-conditions'} onClick={() => window.scrollTo(0, 0)} className='footer__links-text txt-body-14-bold'>Terms & Conditions</Link>
                <Link to={'/privacy-policy'} onClick={() => window.scrollTo(0, 0)} className='footer__links-text txt-body-14-bold'>Privacy Policy</Link>
                <Link to={'/cookies-policy'} onClick={() => window.scrollTo(0, 0)} className='footer__links-text txt-body-14-bold'>Cookie Policy</Link>
                <Link to={'/#'} onClick={() => window.scrollTo(0, 0)} className='footer__links-text txt-body-14-bold'>Contact Us</Link>
            </div>
            <div className='footer__text txt-body-14-regular'>© 2024 6VIII. All rights reserved.</div>
        </footer>
    );
}

export default Footer;