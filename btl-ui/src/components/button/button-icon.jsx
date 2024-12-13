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
"use strict";

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React from "react";

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { iconStar } from "../../assets";
import "../../styles/button/button-icon.css";

const sizeElement = {
    small: {
        iconSize: {
            width: "16px",
            height: "16px",
        },
    },
    medium: {
        iconSize: {
            width: "20px",
            height: "20px",
        },
    },
    large: {
        iconSize: {
            width: "28px",
            height: "28px",
        },
    },
    giant: {
        iconSize: {
            width: "56px",
            height: "56px",
        },
    },
};

export function ButtonIcon(props) {
    const {
        disabled = false,
        color = "default", // default | primary | success | warning | danger
        size = "large", // small | medium | large | giant
        variant = "filled", // filled | filled-tonal | outlined | ghost
        type = "default", // default | square
        icon = iconStar,
        onClick,
        onMouseDown,
        onTouchEnd,
        typeButton,
        id,
    } = props;

    return (
        <button
            id={id}
            type={typeButton}
            className={`btn__icon btn__icon-${type}-color-${color}-${variant} btn__icon-size-${size}`}
            disabled={disabled}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onTouchEnd={onTouchEnd}
        >
            <div
                className="btn__icon-ic"
                alt=""
                style={{
                    ...sizeElement[size].iconSize,
                    maskImage: `url(${icon})`,
                    WebkitMaskImage: `url(${icon})`,
                }}
            />
        </button>
    );
}
