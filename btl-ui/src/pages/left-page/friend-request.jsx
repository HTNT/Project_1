import { useState, useEffect } from "react";
import userAPI from "../../api/user-api";
import "../../styles/left-page/left-page.css"
import friendsAPI from "../../api/friends-api";
import { getToken } from "../../api/axios-client";
import { useNavigate } from "react-router-dom";
const FriendRequest = (props)=>{
    const token = getToken();
    const navigate = useNavigate();
    const [request, setRequest]= useState({});
    useEffect(()=>{
        async function getData() {
            try {
                const res = await userAPI.getUserById(props.data.user);
                if (res && res.status === 200) {
                    setRequest(res.data.user);
                    //console.log(res.data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
        console.log(request)
    }, [props.data.user]);
    const handleAccept = async()=>{
        try {
            const res = await friendsAPI.acceptRequest(token, props.data.user);
            if(res && res.status === 200){
                const newdata = props.com.filter(item => item._id === props.data._id)
                props.setCom(newdata);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="friend-request">
            <div className="friend-request_info" onClick={()=> navigate(`/user-profile/${request._id}`)}>
                <div className="friend-request_info-avt">
                     <img className="friend-request_info-avt_img" src={request.avatar} alt="" />
                </div>
                <div className="friend-request_info-name">
                    {request.first_name} {request.last_name}
                </div>
            </div>
            
            <div className="friend-request_button">
                <div className="friend-request_button-accept" onClick={handleAccept}>Chấp nhận</div>
                <div className="friend-request_button-reject">Từ chối</div>
            </div>
        </div>
    )
}
export default FriendRequest;