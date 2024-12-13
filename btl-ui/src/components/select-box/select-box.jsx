import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Chip } from '../chip/chip';
import { iconArrow0, iconLock } from '../../assets';
import '../../styles/select-box/select-box.css';
import { ButtonIcon } from '../button/button-icon';
function SelectBox({ data, value, onChange, isMobile }) {
    const [openPopup, setOpenPopup] = useState(false);
    const refInput = useRef(null);
    const refClick = useRef(null);
    useEffect(() => {
        const handlePopover = (e) => {
            if (refClick.current) {
                if (!refClick.current.contains(e.target)) {
                    setTimeout(() => {
                        setOpenPopup(false);
                    }, 0)
                }
            }
        };
        document.addEventListener("click", handlePopover, true);
        return () => {
            document.removeEventListener("click", handlePopover);
        };
    }, []);
    return useMemo(() => {
        return (
            <div className='select__box' style={{ position: 'relative', width: 'fit-content' }}  ref={refClick}>
                <input ref={refInput} hidden />
                {
                    isMobile ?
                        <ButtonIcon icon={value && value.icon ? value.icon : iconLock} size={'medium'} variant={'outlined'} type={'square'} onClick={() => { setOpenPopup(!openPopup) }} typeButton={'button'} /> :
                        <Chip label={value && value.label ? value.label : 'Private'} showDeleteButton={true} icon={value && value.icon ? value.icon : iconLock} iconButton={iconArrow0} handleClickDelete={() => { setOpenPopup(true) }} />

                }
                <div className='select__option'>
                    {openPopup &&
                        data && data.length > 0 && data.map((item, index) =>
                            <div key={index} className='txt-body-14-regular select__option-item' onClick={() => { onChange && onChange(item); setOpenPopup(!openPopup) }}>
                                <div className='chip__icon-left' alt='' style={{
                                    width: '16px',
                                    height: '16px',
                                    maskImage: `url(${item.icon})`,
                                    WebkitMaskImage: `url(${item.icon})`,
                                    backgroundColor: 'var(--neutral-default-n-7)',
                                    maskSize: 'cover'
                                }} />
                                {item.label}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }, [data, value, onChange, isMobile, openPopup]);
}

export default SelectBox;