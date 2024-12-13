
// eslint-disable-next-line
"use strict";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles/conversation/conversation.css"
import conversationAPI from "../../api/conversation-api";
import Conversation from "../../components/conversations/conversation";
import "../../styles/header/header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseURL, getToken, getUser } from "../../api/axios-client";
import { AiFillMessage } from "react-icons/ai";
import {Tab,  Chip,  Filter,} from "../../components";
import { Dropdown, } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import UserConversation from "../conversations/user-conversation";
const menuNavbar = [
  {
    path: "/home-page",
    title: "Trang chủ",
  },
  {
    path: "/my-profile",
    title: "Trang cá nhân",
  },
];

export const Header = () => {
  const user = getUser();
  const tokenUser = getToken();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { pathname } = useLocation();
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [conversations, setConversations] = useState({});
  const navigate = useNavigate();
  let profile = localStorage.getItem("BTL_USER");
  profile = profile ? JSON.parse(profile) : null;
  const avatar = profile ? profile.avatar : null;
  const token = getToken();
  const logout = async () => {
    localStorage.removeItem("MY_BTL");
    localStorage.removeItem("BTL_USER");
    navigate("/login");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `${baseURL}/v1.0.0/friend/friends.js?v=v1.0.0&t=${token}`;
    script.async = true;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
    // eslint-disable-next-line
  }, []);
  //conversation
    useEffect(()=>{
      
    }, [isOpenMessage])
    const toggleMessage = ()=>{
      setIsOpenMessage(prevState => !prevState);
    }
    useEffect(() =>{
      async function getUserMessage(){
          try{
              const conversations = await conversationAPI.getConversationByUserId(tokenUser, user._id);
              
              if(conversations && conversations.status === 200){
                  setConversations(conversations.data.result);
              }
          }
          catch(error){
              console.log(error);
          }
      }
      
      getUserMessage();
      console.log(conversations);
      
  }, [])
  //end conver 
  
  //message
  const [messageData, setMessageData]= useState({});
  const [isOpenMessageItem, setIsOpenMessageItem] = useState(false);
  const toggleMessageItem = (data)=>{
    setIsOpenMessageItem(true);
    setMessageData(data);
    console.log(data)
  }
  // 
  function useOutsideClick(ref, callback) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  }

  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => {
    if (isMenuVisible) setIsMenuVisible(false);
  });

  return (
    <div className="header">
      <div className="header__logo ">
        <Link to="/my-profile">
          {/* <img src={logo} alt="" /> */}
        </Link>
        <div className="header__logo-timezone">
          <Chip
            size="small"
            variant="shape"
            iconPosition="none"
          >
            <Filter />
          </Chip>
        </div>
      </div>
      <div className="header__navbar">
        {menuNavbar.map((nav, i) => (
          <Tab
            key={i}
            label={nav.title}
            url={nav.path}
            isActive={nav.path === pathname}
            size={"giant"}
          />
        ))}
      </div>
      <div className="header__menu">
        <div className="header__menu-message" >
              <AiFillMessage onClick={toggleMessage} style={{
                      height: '50px',
                      width: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      cursor: 'pointer',
                    }}/>
              <div className={`header__menu-message_${isOpenMessage}`}>
                <div className="conversation-main" onClick={()=>{console.log('tat')}}>
                      <span className="conversation-main_title">Tin Nhắn</span>
                      <div className="conversation-main_filter">
                          <div className="conversation-main_filter-icon"><IoIosSearch /></div>
                          
                          <input className="conversation-main_filter-input" type="text" placeholder="Tìm đoạn tin nhắn" ></input>
                      </div>
                      <div className="conversation-main_item">          
                      {
                          conversations && conversations.length > 0 && conversations.map((conversation, index) => {
                              return (
                                  <div key={index} onClick={()=>{toggleMessageItem(conversation)}}>
                                      <Conversation conversation={conversation}></Conversation>
                                  </div>
                              )
                          })
                      }
                      </div>
                  </div>
              </div>
      </div>
        <div className="header__menu-avatar">
          <Dropdown>
            <Dropdown.Toggle as="div" id="dropdown-custom-components">
              <img src={avatar} alt="" style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
                cursor: 'pointer',
              }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/my-profile">Trang cá nhân</Dropdown.Item>
              <Dropdown.Item onClick={logout}>Đăng Xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={`header__message-${isOpenMessageItem}`} style={{border:'1px solid hidden',borderRadius:'10px'}}>
            
              {   
                (messageData && <UserConversation data={messageData} isOpen={isOpenMessageItem} setIsOpen={setIsOpenMessageItem}></UserConversation>)
              }
    </div>
    </div>
  );
};
