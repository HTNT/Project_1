
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import moment from 'moment';
import { useEffect, useState } from 'react';


/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import postAPI from '../../api/post-api';
import '../../styles/popup-post/popup-post.css';
import { ButtonAvatar } from '../button/button-avatar';
// import { ButtonIcon } from '../button/button-icon';
import { iconComment, iconLike, iconXClose } from '../../assets';
import { Button } from '../button/button';
import { getToken, getUser } from '../../api/axios-client';
import { ButtonIcon } from '../button/button-icon';
import { Comment } from '../comments/comment';
import BoxComment from '../comments/box-comment';
import { useForm } from 'react-hook-form';
import { Col, Container, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

let buttonStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '0',
}

let iconLikeStyle = {
    filter: 'invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)'
}


const PopupPost = (props) => {

    const user = getUser();
    const tokenName = getToken();
    const nagivate = useNavigate();

    const {
        // post,
        setOpen,
    } = props;

    const [post, setPost] = useState(props.post)

    const form = useForm({
        defaultValues: {
            text: '',
        }
    });


    const [isLike, setIsLike] = useState(false);

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

    return (
        <div >
            <div className='popup-post'>
                <div className='popup-post__close'>
                    <ButtonIcon
                        size='medium'
                        onClick={() => setOpen(false)}
                        icon={iconXClose}
                        variant='ghost'
                    />
                </div>
                <div className='popup-post__header'>
                    <Container style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                    }}>
                        <Col>
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
                    </Container></div>

                <div className='popup-post__content'>
                    {post.text}
                </div>

                <div className='popup-post__body'></div>

                <div className='popup-post__footer'>
                    <div className='popup-post__footer-button'>
                        <div className='popup-post__footer-button-like'>
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
                            {/* <span className='post__footer-button-like-span'>thich</span> */}
                        </div>
                        <div className='popup-post__footer-button-comment'>
                            <Button
                                onClick={() => console.log('like')}
                                icon={iconComment}
                                iconPosition={'left'}
                                variant='text'
                                size='medium'
                                label='Binh Luan'
                                buttonStyle={buttonStyle}
                            />
                            {/* <span className='post__footer-button-like-span'>Binh luan</span> */}
                        </div>


                    </div>

                    <div className='popup-post__box-comment'>
                        <BoxComment
                            // postid={post._id}
                            form={form}
                            name='text'
                            postId={post._id}
                        />
                    </div>
                    <div className='popup-post__list-comments'>
                        {
                            post && post.comments && post.comments.length > 0 && post.comments.map(comment => {
                                return (
                                    <Comment
                                        commentProps={comment}
                                    />
                                )
                            })
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default PopupPost;