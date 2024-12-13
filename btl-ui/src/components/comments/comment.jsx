
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


import '../../styles/comment/comment.css';
import { replaceUrl } from "../../Utils/urlify";
import { ButtonAvatar } from "../button/button-avatar";
import { getUser } from "../../api/axios-client";
import generalAPI from "../../api/general-api";

export function Comment({ commentProps }) {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [sender, setSender] = useState(null);
    const commentInputRef = useRef();
    const user = getUser()
    useEffect(() => {
        (async () => {
            const user = getUser();
            if (user) {
                setSender(user);
            }
        })()
        // eslint-disable-next-line
    }, [commentProps])

    useEffect(() => {
        const getSender = async () => {
            const res = await generalAPI.getUserByID(commentProps.user);
            // console.log(res.data.user);
            if (res && res.status === 200) {
                setSender(res.data.user);
            }
        }
        getSender();

        // eslint-disable-next-line
    }, [commentProps])
    console.log(sender);
    return (
        <div style={{
            gap: '12px',
            borderRadius: '10px',
            padding: '8px',
            backgroundColor: '#f0f2f5',
            margin: '10px',
        }} fluid={'md'} >
            <div className="comment">
                <div className="comment__user">
                    <div className="comment__user-avatar">
                        <ButtonAvatar
                            type={'image'}
                            src={sender && sender.avatar}
                            size={40}
                            onClick={() => {
                                if (commentProps && commentProps.user)
                                    navigate(user._id !== commentProps.user ? `/user-profile/${commentProps.user}` : `/my-profile`);
                            }}
                        />
                    </div>
                    <div className="comment__user-info" style={{ gap: '16px' }}>
                        <div className="comment__user-info-name">
                            <Link
                                className="txt-body-14-bold"
                                to={user._id !== commentProps.user ? `/user-profile/${commentProps.user}` : `/my-profile`}
                                style={{ color: 'black' }}
                            >
                                {sender && sender.last_name + ' ' + sender.first_name}
                            </Link>
                        </div>
                        <div className="comment__user-info-time txt-body-12-regular">
                            {moment(commentProps.LastModifyDate).format('DD/MM/YYYY · HH:mm')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="comment__content-left-comment">

                <div className="txt-body-14-regular comment__content-left-comment-word" style={{ flex: '1 1 auto', whiteSpace: 'normal' }} ref={commentInputRef} contentEditable={isEdit} data-value='helo' onChange={(e) => console.log(e.target.value)} >
                    {replaceUrl(commentProps.text)}
                </div>
            </div>
            {
                isEdit &&
                <div style={{ marginTop: '10px' }}>
                    {/* <Button color='primary' style={{ fontSize: '10px' }} onClick={handleCallApiUpdateComment}>Save</Button> */}
                    <Button color='primary' outline style={{ marginLeft: '10px', fontSize: '10px' }} onClick={() => setIsEdit(false)}>Cancel</Button>
                </div>
            }
        </div >
    );
}
