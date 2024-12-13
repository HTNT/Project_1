import { useEffect, useState } from "react";
import conversationAPI from "../../api/conversation-api.js";
import '../../styles/conversation/conversation.css';
import { IoIosSearch } from "react-icons/io";
import { getUser, getToken } from "../../api/axios-client";
import userAPI from "../../api/user-api.js";
import UserConversation from "./user-conversation.jsx";
import "../../styles/message/message.css"
    const Conversation = (props) => {

        const iuser = getUser();
        const conversations = props.conversation;
        const cv = (conversations.user1 === iuser._id) ? conversations.user2 : conversations.user1 ;
        const [user, setUser]= useState({});
        useEffect(()=>{
        async function getUser(){
            try {
                const user = await userAPI.getUserById(cv);
                //console.log(user);
                if(user && user.status === 200){
                    setUser(user.data.user);
                    //console.log(user.data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
        
    },[]);
        return (
            <div>
                <div className="conversation-item" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '10px',
        
                }}>
                    <img src={user.avatar} style={{
                        type:'image',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        verticalAlign: 'top',
                        marginRight: '10px',
                    }}></img>
                    <div>{user.first_name} {user.last_name}</div>
                </div>
            </div>
        )
    }

export default Conversation;