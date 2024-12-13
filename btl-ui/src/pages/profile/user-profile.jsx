import { Button } from "../../components/";
import "../../styles/my-profile/my-profile.css";
import PostItem from "../../components/post-item/post-item";
import { useEffect, useState } from "react";
import postAPI from "../../api/post-api";
import { useParams } from "react-router-dom";
import generalAPI from "../../api/general-api";
import profileAPI from "../../api/profile-api";
import { getToken, getUser } from "../../api/axios-client";
import friendsAPI from "../../api/friends-api";
const UserProfile = () => {
    const iuser = getUser();
    const params = useParams();
    const [allPosts, setAllPosts] = useState({});
    const [checkFriends, setCheckFriends] = useState({});
    const [user, setUser] = useState({});
    const [infoUser, setInfoUser] = useState({});
    const token = getToken();
    useEffect(() => {
        const getInfoUser = async () => {
            try {
                const resGetInfo = await profileAPI.getUser(token, params._id);
                console.log(resGetInfo);
                if (resGetInfo.data.status == 200) {
                    setInfoUser(resGetInfo.data.resultObj);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getInfoUser();
    }, []);
    
    // console.log(infoUser);
    useEffect(()=>{
        const getStateFriend = async () => {
            try {
                const res = await profileAPI.getUser(token, iuser._id);
                // console.log(res);
                if (res.data.status == 200) {
                    const check = res.data.resultObj.friends.some(friend => friend.user === params._id)
                    setCheckFriends(check);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getStateFriend();
        
    }, []);
    const friendBtn = (checkFriends)? 'Bạn bè':'Thêm bạn bè';
    useEffect(() => {
        const infoUser = async () => {
            try {
                const res = await generalAPI.getUserByID(params._id);
                // console.log(res.data.user);
                if (res && res.status === 200) {
                    setUser(res.data.user);
                }
            } catch (error) {
                console.log(error);
            }
        };
        infoUser();
        // window.location.reload();
        // eslint-disable-next-line
    }, [params._id]);

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
    }, [user, params]);
    const handleSendRequest = async ()=>{
        try {
            const res = await friendsAPI.sendRequest(token, params._id);
            if(res && res.status === 200){
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="profile">
            <div className="profile__cover-photo">
                <img className="photo" alt="" src={infoUser.cover_image} />
            </div>

            <div className="profile__infor">
                <div className="profile__infor-avatar">
                    <img className="avatar" alt="" src={user.avatar} />
                </div>
                <div className="profile__infor-name">
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
                        <Button onClick={()=>{
                            if(!checkFriends){
                                handleSendRequest();
                            }
                        }}>{friendBtn}</Button>
                    </div>
                    <div className="profile__infor-button-edit">
                        <Button>Nhắn tin</Button>
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
                                {infoUser && infoUser.bio && infoUser.bi0 !== ""
                                    ? infoUser.bio
                                    : ""}
                            </div>
                        </div>
                        <div className="profile__body-introduce-content-university">
                            {infoUser &&
                            infoUser.company &&
                            infoUser.company !== ""
                                ? infoUser.company
                                : ""}
                        </div>
                        <div className="profile__body-introduce-content--hight-school">
                            Đã học tại Trường THPT Lê Quý Đôn - Tuy Đức
                        </div>
                        <div className="profile__body-introduce-content-living">
                            {infoUser &&
                            infoUser.location &&
                            infoUser.location !== ""
                                ? "Sống tại" + infoUser.location
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
        </div>
    );
};

export default UserProfile;
