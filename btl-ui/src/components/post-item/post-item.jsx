// eslint-disable-next-line
"use strict";

/************************************************************************/
/*   Import for package on network                                      */

/************************************************************************/
import moment from "moment";
import { useEffect, useState } from "react";

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import postAPI from "../../api/post-api";
import '../../styles/post-item/post-item.css';
import { ButtonAvatar } from "../button/button-avatar";
// import { ButtonIcon } from "../button/button-icon";
import { iconComment, iconLike } from "../../assets";
import { Button } from "../button/button";
import { getToken, getUser } from "../../api/axios-client";
import Modal from "react-modal";
import PopupPost from "../popup-post/popup-post";
import { Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

let buttonStyle = {
    height: "100%",
    width: "100%",
    borderRadius: "0",
}

let iconLikeStyle = {
    filter: 'invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)'
}

const popupPostStyle = {
    content: {
        borderRadius: '12px',
        margin: 'auto',
        maxWidth: '680px',
        // height: 'min-content',
        maxHeight: '850px',

        // transform: 'translate(-50%, -50%)',
        // margin: 'auto 16px auto 16px !important',
    },
};

const PostItem = (props) => {

    const user = getUser();
    const tokenName = getToken();
    const [post, setPost] = useState(props.post);
    const [isOpenPopupPost, setIsOpenPopupPost] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const nagivate = useNavigate();

    useEffect(() => {
        setIsLike(post.likes.some((like) => (like.user === user._id)))

        // eslint-disable-next-line
    }, [post])

    const handleLike_Unlike = async () => {
        if (isLike) {
            const result = await postAPI.unlikePost(tokenName, post._id);
            if (result && result.status === 200) {
                // setIsLike(!isLike)
                const newpost = await postAPI.getPostById(tokenName, post._id);
                setPost(newpost.data.result);
            }
            // console.log(result);
        } else {
            const result = await postAPI.likePost(tokenName, post._id);
            if (result && result.status === 200) {
                // setIsLike(!isLike)
                const newpost = await postAPI.getPostById(tokenName, post._id);
                setPost(newpost.data.result);
            }
            // console.log(result);
        }
    }
    // handleLike_Unlike();

    const getDayBetween = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        if (Math.abs(Math.ceil((ms2 - ms1) / (60 * 1000))) <= 60) {  // thoi gian < 1h
            return (<span>{Math.abs(Math.ceil((ms2 - ms1) / (60 * 1000)))} minutes</span>);
        } else
            if (Math.abs(Math.ceil((ms2 - ms1) / (60 * 60 * 1000))) <= 24) { // thoi gian < 1 ngay
                return (<span>{Math.abs(Math.ceil((ms2 - ms1) / (60 * 60 * 1000)))} hour</span>);
            } else
                if (Math.abs(Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000))) >= 1 && Math.abs(Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000))) <= 7) { // thoi gian > 1 days & <2 7
                    // console.log(Math.abs(Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000))));
                    return (<span>{Math.abs(Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000)))} days</span>);
                }

        return null;
    };

    // console.log(post.user);

    return (
        <div style={{
            paddingBottom: '10px',
        }}>
            <div className="post" >
                <div className="post__header">
                    <Container style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                    }}>
                        <Col style={{
                            flex: 'none',
                            alignContent: 'center',
                        }}>
                            <div className="post__header-avatar">
                                <ButtonAvatar
                                    alt=""
                                    type='image'
                                    size={40}
                                    src={post.avatar}
                                    onClick={() => nagivate(`/user-profile/${post.user}`)}
                                />
                            </div>
                        </Col>
                        <Col style={{
                            paddingLeft: '8px',
                            paddingTop: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column'
                        }}>
                            <Row>
                                <div className="post__header-name">{post.name}</div>
                            </Row>
                            <Row>
                                <div className="post__header-time">{moment(getDayBetween(new Date(), new Date(post.date)) || post.date).format('DD/MM/YYYY · HH:mm')}</div>

                            </Row>
                        </Col>
                    </Container>
                </div>

                <div className="post__content">
                    {post.text}
                </div>

                <div className="post__body">
                    <div className="post__body-image">
                        {post.imageUrl && JSON.parse(post.imageUrl)[0] && post.imageUrl[0] && <img className="post__body-image-scale" src={JSON.parse(post.imageUrl)[0]} alt="" />}
                    </div>
                </div>

                <div className="post__footer">
                    {(post && post.comments && Array.isArray(post.comments) && post.comments.length > 0) || (post && post.likes && Array.isArray(post.likes) && post.likes.length > 0) ?
                        <div className="post__footer-total">
                            <div className="post__footer-total-like">{post && post.likes && Array.isArray(post.likes) ? post.likes.length : '0'}</div>
                            <div className="post__footer-total-comments">{post && post.comments && Array.isArray(post.comments) ? post.comments.length : '0'}</div>
                        </div>
                        : null
                    }
                    <div className="post__footer-button">
                        <div className="post__footer-button-like">
                            <Button
                                id={isLike ? 'liked' : 'like'}
                                icon={iconLike}
                                iconPosition={'left'}
                                variant='text'
                                size='medium'
                                label='Thich'
                                buttonStyle={buttonStyle}
                                onClick={() => handleLike_Unlike()}
                                iconStyle={isLike ? iconLikeStyle : null}
                            />
                            {/* <span className="post__footer-button-like-span">thich</span> */}
                        </div>
                        <div className="post__footer-button-comment">
                            <Button
                                onClick={() => setIsOpenPopupPost(true)}
                                icon={iconComment}
                                iconPosition={'left'}
                                variant='text'
                                size='medium'
                                label='Binh Luan'
                                buttonStyle={buttonStyle}
                            />

                        </div>
                    </div>
                </div>

            </div>

            <Modal
                isOpen={isOpenPopupPost}
                style={popupPostStyle}
            >
                <PopupPost post={post} setOpen={setIsOpenPopupPost} />
            </Modal>
        </div>
    )
}

export default PostItem;