/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]    */
/*                                                                      */
/*   Created    : 06-04-2024 18:42:05.                                  */
/*   Modified   : 06-04-2024 18:42:05.                                  */
/*                                                                      */
/************************************************************************/
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";


/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import '../../styles/button/button-menu-dropdown.css';


export function ButtonMenuDropDown(props) {
    const { isOpen, setIsOpen, dropMenuItem, buttonComponent, disabled } = props;
    // console.log(disabled);
    return (
        <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} >
            <DropdownToggle className="button__more"  disabled={disabled}>
                {buttonComponent && buttonComponent}
            </DropdownToggle>
            <DropdownMenu className="button__more-menu" disabled={disabled}>
                {
                    dropMenuItem && dropMenuItem.map((item, index) => (
                        <DropdownItem className={`button__more-item d-flex align-items-center txt-body-14-regular`} key={index} onClick={item.func && item.func} style={{
                            // backgroundImage: `url(${item.icon})`,
                            opacity: `${item.disabled === true ? '0.5' : '1'}`,
                            color: 'var(--neutral-default-n-12)',
                            '--hover-color': item && item.hover ? item.hover : 'var(--brand-primary-b-1)',
                            '--focus-color': item && item.focus ? item.focus : 'var(--brand-primary-b-2)',
                        }}
                            disabled={item.disabled}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                maskImage: `url(${item.icon})`,
                                WebkitMaskImage: `url(${item.icon})`,
                                maskRepeat: 'no-repeat',
                                backgroundColor: 'var(--neutral-default-n-12)',
                                maskSize: 'cover',
                                ...item?.iconStyle,
                               
                            }}></div>
                            <span>
                                {item.name}
                            </span>
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </Dropdown>
    );
}
