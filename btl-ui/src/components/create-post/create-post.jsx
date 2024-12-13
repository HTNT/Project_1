/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]               */
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

// import { Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { ButtonAvatar, Input } from "../../components";

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import "../..//styles/create-post/create-post.css";
import Modal from "react-modal";
import PopupCreatePost from "../popup-create-post/popup-create-post";

const popupCreatPostStyle = {
    content: {
        borderRadius: "12px",
        margin: "auto",
        maxWidth: "500px",
        height: "fit-content",
    },
};

function CreatePost(props) {
    // console.log(props.user.avatar);
    const { user } = props;
    //lấy ra giá trị user từ object props
    // ...rest parameter của destructuring sẽ gọi những giá trị còn lại
    // destructuring // spreading // truyền props qua component

    const [isOpenPopupCreatPost, setIsOpenPopupCreatPost] = useState(false);
    // console.log(isOpenPopupCreatPost);

    const handleCreatePost = () => {
        setIsOpenPopupCreatPost(true);
        // console.log('test');
    };

    return (
        <div className="create-post__div">
            <div className="create-post__div-sked">
                <Link to="/my-profile">
                    <ButtonAvatar
                        alt=""
                        type="image"
                        size={40}
                        src={props.user.avatar}
                    />
                </Link>
            </div>
            <div className="search__input">
                <Input
                    type=" text "
                    placeholder={`${user.last_name} oi, Ban dang nghi gi`}
                    status="default"
                    // iconLeft={iconShares}
                    iconSupporting={null}
                    supportingText={null}
                    value={""}
                    onClick={handleCreatePost}
                    className={`search-input`}
                />
            </div>
            <Modal style={popupCreatPostStyle} isOpen={isOpenPopupCreatPost}>
                <PopupCreatePost
                    user={user}
                    setOpen={setIsOpenPopupCreatPost}
                />
            </Modal>
        </div>
    );
}

export { CreatePost };
