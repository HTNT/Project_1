
import React, { useEffect, useRef } from 'react';
import '../../styles/chip/chip.css';
import { iconChipFile, iconChipDelete, iconPerson } from '../../assets';
import { imgTest } from "../../assets/img-test";
import { ButtonAvatar, ButtonIcon } from "../../components";

const sizeElement = {
    small: {
        fontSize: 'txt-body-12-regular',
        iconSize: {
            width: '16px',
            height: '16px',
        },
        buttonIconSize: 'small',
    },
    medium: {
        fontSize: 'txt-body-14-regular',
        iconSize: {
            width: '20px',
            height: '20px',
        },
        buttonIconSize: 'medium',
    },
    large: {
        fontSize: 'txt-title-20-bold',
        iconSize: {
            width: '28px',
            height: '28px',
        }
    },
}

export function Chip(props) {
    const {
        label,
        labelComponent,
        disabled = false,
        color = 'default',      // default | primary | danger
        size = 'medium',        // small | medium |
        variant = 'outlined',     // outlined | shape
        iconPosition = 'full',  // full | left | right | none
        icon = iconChipFile,
        iconButton = iconChipDelete,
        stylesContainer,
        stylesIcon,
        btnAVT = null,  // full | null
        showDeleteButton = true, // true | false
        handleClickDelete,
        removeProps,
        children = '',
    } = props;

    const refIconLeft = useRef(null);
    const refIconRight = useRef(null);

    useEffect(() => {
        if (refIconLeft.current && refIconRight.current) {
            switch (iconPosition) {
                case 'none':
                    refIconLeft.current.style.display = 'none';
                    refIconRight.current.style.display = 'none';
                    break;
                case 'left':
                    refIconRight.current.style.display = 'none';
                    refIconLeft.current.style.display = btnAVT ? 'none' : 'block';
                    break;
                case 'right':
                    refIconLeft.current.style.display = 'none';
                    refIconRight.current.style.display = btnAVT ? 'none' : 'block';
                    break;
                case 'full':
                    refIconLeft.current.style.display = btnAVT ? 'none' : 'block';
                    refIconRight.current.style.display = btnAVT ? 'none' : 'block';
                    break;
                default:
                    break;
            }
        }
    }, [iconPosition, btnAVT]);


    return (
        <div className={`chip chip__color-${color}-${variant} chip__size-${size}`} disabled={disabled} style={{ ...stylesContainer }}>
            {btnAVT ? (
                <ButtonAvatar
                    size={24}
                    src={imgTest}
                    type='image'
                    icon={iconPerson}
                />
            ) : (
                <div className='chip__icon-left' ref={refIconLeft} alt='' style={{
                    ...sizeElement[size].iconSize,
                    maskImage: `url(${icon})`,
                    WebkitMaskImage: `url(${icon})`,
                    ...stylesIcon
                }} />
            )}
            {label && <span className={`chip__text ${sizeElement[size].fontSize}`}>{label}</span>}
            {labelComponent && labelComponent}
            {children && children}
            <div className='chip__icon-right' ref={refIconRight} alt='' style={{
                // ...sizeElement[size].iconSize,
                // maskImage: `url(${icons})`,
                // WebkitMaskImage: `url(${icons})`,
                ...stylesIcon
            }}>
                {showDeleteButton && (
                    <ButtonIcon
                        typeButton={'button'}
                        color='default'
                        size={sizeElement[size].buttonIconSize}
                        variant='shape'
                        icon={iconButton}
                        onClick={handleClickDelete}
                        {...removeProps}
                    />
                )}
            </div>
        </div>

    );
}
