import React from 'react';
import { useSelector } from 'react-redux';

import '../../../styles/popup/popup.css';
import { ButtonIcon } from '../../button/button-icon';
import { iconXClose } from '../../../assets';
// import { closePopup } from '../../../redux/task/task-slice';
export function Popup() {
    // const dispatch = useDispatch();
    const popupComponent = useSelector(state => state.task.popupComponent);
    const { component, title } = popupComponent ? popupComponent : {};
    // const component = null;
    const handleClosePopup = () => {
        // dispatch(closePopup());
        console.log('closePopup');
    }
    return (
        <div className='cpopup'>
            <div className='cpopup__header d-flex align-items-center justify-content-between'>
                <div className='cpopup__header-title txt-title-20-bold'>{title}</div>
                <ButtonIcon color={"default"} icon={iconXClose} variant={'ghost'} size={"medium"} onClick={handleClosePopup} />
            </div>
            <div className='cpopup__body'>
                {component}
            </div>
        </div>
    );
}