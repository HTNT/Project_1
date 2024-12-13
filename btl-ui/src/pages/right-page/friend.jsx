import { useState, useEffect } from "react";
import friendsAPI from "../../api/friends-api";
import userAPI from "../../api/user-api";
import { getToken } from "../../api/axios-client";
import "../../styles/right-page/right-page.css"
import { useNavigate } from "react-router-dom";
const Friends = (props) => {
    const token = getToken();
    const [friends, setFriends]= useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        
        async function getData() {
            try {
                const res = await userAPI.getUserById(props.data.user);
                if (res && res.status === 200) {
                    setFriends(res.data.user);
                    //console.log(res.data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
        console.log(friends);
    }, [props.data.user]);
    return(
        <div className="friend">
            <div className="friend_info" onClick={()=>navigate(`/user-profile/${friends._id}`)}>
                <div className="friend_info-avt">
                    <img className="friend_info-avt_img" src={friends.avatar} alt="" />
                </div>
            
                <div className="friend_info-name">
                    {friends.first_name} {friends.last_name}
                </div>
            </div>
        </div>
    )
}
export default Friends;