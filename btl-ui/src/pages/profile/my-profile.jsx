// import { Col, Container, Row } from "reactstrap";
import { Button, ButtonIcon } from "../../components/";
import "../../styles/my-profile/my-profile.css";
import PostItem from "../../components/post-item/post-item";
import { useEffect, useRef, useState } from "react";
import postAPI from "../../api/post-api";
import { getToken, getUser } from "../../api/axios-client";
import profileAPI from "../../api/profile-api";
import generalAPI from "../../api/general-api";
import userAPI from "../../api/user-api";
import PopupCreatePost from "../../components/popup-create-post/popup-create-post";
import { iconEdit } from "../../assets";
import Modal from "react-modal";

const popupCreatPostStyle = {
    content: {
        borderRadius: "12px",
        margin: "auto",
        maxWidth: "500px",
        height: "fit-content",
    },
};

const MyProfile = () => {
    const [allPosts, setAllPosts] = useState({});
    const user = getUser();
    const [profile, setPofile] = useState({});
    const token = getToken();
    const inputCoverImageRef = useRef();
    const inputAvatarImageRef = useRef();
    const [isOpenPopupCreatPost, setIsOpenPopupCreatPost] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const resprofile = await profileAPI.getMyProfile(token);
                // console.log(resprofile);
                if (resprofile.data.status == 200) {
                    setPofile(resprofile.data.resultObj);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProfile();
    }, []);

    const handleOpenPopPost = () => {
        setIsOpenPopupCreatPost(true);
    };

    useEffect(() => {
        async function getPostByUser() {
            try {
                const res = await postAPI.getPostsByUser(user._id);
                if (res && res.status === 200) {
                    setAllPosts(res.data.result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPostByUser();

        // eslint-disable-next-line
    }, []);

    const handleSelectAvatarImage = async (e) => {
        const file = e.target.files[0];
        try {
            const urlAvatarImage = await generalAPI.upload(file);
            console.log(urlAvatarImage);
            if (
                urlAvatarImage &&
                urlAvatarImage.status &&
                urlAvatarImage.status === 201
            ) {
                const dataAvatar = {
                    avatar: urlAvatarImage.data.result.fileUrl,
                };
                const callAPIAvatar = async () => {
                    const updateAvatarImage = await userAPI.updateUser(
                        token,
                        user._id,
                        dataAvatar
                    );
                    localStorage.setItem(
                        "BTL_USER",
                        JSON.stringify(updateAvatarImage.data.values)
                    );
                    window.location.reload(false);
                };
                callAPIAvatar();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectImageCover = async (event) => {
        const file = event.target.files[0];
        try {
            const urlImageCover = await generalAPI.upload(file);

            console.log(urlImageCover);
            if (
                urlImageCover &&
                urlImageCover.status &&
                urlImageCover.status === 201
            ) {
                const data = {
                    cover_image: urlImageCover.data.result.fileUrl,
                };
                const handleCallAPI = async () => {
                    const updateCoverImage = await userAPI.updateUser(
                        token,
                        user._id,
                        data
                    );
                    localStorage.setItem(
                        "BTL_USER",
                        JSON.stringify(updateCoverImage.data.values)
                    );
                    window.location.reload(false);
                };
                handleCallAPI();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="profile">
            <div className="profile__cover-photo">
                <img className="photo" alt="" src={user.cover_image} />
                <div className="profile__cover-photo-button-edit">
                    <Button
                        label="Chỉnh sửa ảnh bìa"
                        onClick={() => {
                            inputCoverImageRef.current.click();
                        }}
                    ></Button>
                    <input
                        type="file"
                        ref={inputCoverImageRef}
                        id="input_cover-image"
                        accept="image/*"
                        onChange={handleSelectImageCover}
                        style={{
                            display: "none",
                        }}
                    />
                </div>
            </div>

            <div className="profile__infor">
                <div className="profile__infor-avatar">
                    <img className="avatar" alt="" src={user.avatar} />
                    <ButtonIcon
                        variant="filled"
                        icon={iconEdit}
                        onClick={() => {
                            inputAvatarImageRef.current.click();
                        }}
                        size="medium"
                        id="edit-icon"
                    />
                    <input
                        type="file"
                        ref={inputAvatarImageRef}
                        id="input_avatar"
                        accept="image/*"
                        onChange={handleSelectAvatarImage}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="profile__infor-name">
                    {" "}
                    {user.first_name + " " + user.last_name}
                    <span> &nbsp;</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        marginLeft: "auto",
                        paddingRight: "16px",
                        gap: "8px",
                        paddingTop: "40px",
                    }}
                >
                    <div className="profile__infor-button-add-post">
                        <Button onClick={handleOpenPopPost}>
                            Thêm bài viết
                        </Button>
                    </div>

                    <div className="profile__infor-button-edit">
                        <Button>Chỉnh sửa trang cá nhân</Button>
                    </div>
                </div>
            </div>

            <div className="profile__body">
                <div className="profile__body-introduce">
                    <div className="profile__body-introduce-title">
                        Gioi Thieu
                    </div>
                    <div className="profile__body-introduce-content">
                        <div className="profile__body-introduce-content-story">
                            <div className="profile__body-intro-content-story-text">
                                {profile && profile.bio && profile.bio !== ""
                                    ? profile.bio
                                    : ""}
                            </div>
                            <Button className="profile__body-introduce-story">
                                Chỉnh sửa tiểu sử
                            </Button>
                        </div>
                        <div className="profile__body-introduce-content-status">
                            {profile && profile.status && profile.status !== ""
                                ? profile.status
                                : ""}
                        </div>
                        <div className="profile__body-introduce-content-university">
                            {profile &&
                            profile.company &&
                            profile.company !== ""
                                ? profile.company
                                : ""}
                        </div>
                        <div className="profile__body-introduce-content--hight-school">
                            Đã học tại Trường THPT Lê Quý Đôn - Tuy Đức
                        </div>
                        <div className="profile__body-introduce-content-living">
                            {" "}
                            {profile &&
                            profile.location &&
                            profile.location !== ""
                                ? "Sống tại " + profile.location
                                : ""}
                        </div>
                        <div className="profile__body-introduce-content-from">
                            {" "}
                            Đến từ Thái Bình
                        </div>
                    </div>
                </div>

                <div className="profile__body-post" style={{ width: "560px" }}>
                    {allPosts &&
                        allPosts.length > 0 &&
                        allPosts.map((post, index) => {
                            return (
                                <div key={index}>
                                    <PostItem post={post}></PostItem>
                                </div>
                            );
                        })}
                </div>
            </div>
            {/* <div className="nothing"> Ban da xem het roi</div> */}
            <Modal style={popupCreatPostStyle} isOpen={isOpenPopupCreatPost}>
                <PopupCreatePost
                    user={user}
                    setOpen={setIsOpenPopupCreatPost}
                />
            </Modal>
        </div>
    );
};

export default MyProfile;
