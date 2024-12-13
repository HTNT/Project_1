import { useEffect, useState } from "react";
import userAPI from "../../api/user-api";
import ConverItem from "./conversation-item";
import "../../styles/message/message.css"
import { getUser, getToken } from "../../api/axios-client";
import { IoIosSend } from "react-icons/io";
import conversationAPI from "../../api/conversation-api";
import { FaDeleteLeft } from "react-icons/fa6";
import useWebSocket, { ReadyState } from 'react-use-websocket';
const UserConversation = (props)=>{
    //console.log(props.data);
    const iuser = getUser();
    const tokenUser = getToken();
    const mess = props.data;
    const [inputValue, setInputValue] = useState('');
    const [allMess, setAllMess]= useState([]);
    const [body, setBody]= useState({});
    //console.log(mess);
    const [user, setUser]= useState({});
    const i2user = (mess.user1 === iuser._id) ? mess.user2 : mess.user1;
    useEffect(()=>{
        async function getUser(){
            try {
                //console.log('start');
                const user = await userAPI.getUserById(i2user);
                //console.log(user);
                if(user && user.status === 200){
                    setUser(user.data.user);
                    setAllMess((mess.messages));
                    //console.log(user.data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
        //console.log(mess);  
    },[i2user]);
    const handleInput = (e)=>{
        setInputValue(e.target.value);
    }
    useEffect(()=>{
        setBody({
            conversationId : mess._id,
            to : i2user,
            text: inputValue
        })
    }, [inputValue])
    useEffect(() => {
        // console.log(allMess)
    }, [allMess]);
    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:2206', {
        onOpen: () => console.log('Connected to WebSocket server'),
        onClose: () => console.log('Disconnected from WebSocket server'),
        onMessage: (message) => {
            const { data } = message;
            if (data instanceof Blob) {
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const buffer = reader.result;
                  const decoder = new TextDecoder();
                  const jsonString = decoder.decode(buffer);
                  const parsedMessage = JSON.parse(jsonString);
                  if(parsedMessage.id === iuser._id){ 
                    //console.log('ist u');
                    setAllMess(prevAllMess => [parsedMessage.messages ,...prevAllMess]);
                    //console.log(allMess);
                }
                  else{
                    return;
                  } 
                  console.log(parsedMessage)
                  // Xử lý đối tượng JSON
                } catch (error) {
                  console.error('Error parsing message data:', error);
                }
              };
              reader.readAsArrayBuffer(data);
            } else {
              // Xử lý khi dữ liệu không phải là Blob (trường hợp dữ liệu đã là chuỗi JSON)
              try {
                const parsedMessage = JSON.parse(data);
                console.log('Parsed message:', parsedMessage);
                // Xử lý đối tượng JSON
              } catch (error) {
                console.error('Error parsing message data:', error);
              }
            }
            
        },
      });
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            console.log('Submitting message: ', inputValue);
            const result = await conversationAPI.sendMessages(tokenUser, iuser._id, body);
            if (result.status === 200){
                console.log('send success');
                const datasend = {
                    conversationId : mess._id,
                    id: i2user,
                    messages: {
                        from: iuser._id,
                        to: i2user,
                        text: inputValue,
                        
                    },
                    
                }

                setAllMess(prevAllMess => [datasend.messages ,...prevAllMess]);
                sendMessage(JSON.stringify(datasend));
                setInputValue('');
            }
        } catch (error) {
            console.log('err');
        }
    }
    return(
        <div className="message">
            <div className="message__header">
                <div className="message__header-avt"><img className="message__header-avt_img" src={user.avatar}></img></div>
                
                <div className="message__header-name">
                    <div>{user.first_name} {user.last_name}</div>
                    <div className="message__header-close"  onClick={()=>{props.setIsOpen(false)}}>
                        <FaDeleteLeft style={{
                            height: '100%',
                            width: '100%',
                            cursor: 'pointer',
                            
                            padding: '5px',
                            
                        }}/>
                    </div>
                </div>
            </div>
            <ConverItem message={allMess}></ConverItem>
            <div className="message__input">
                <input 
                type="text" 
                inputValue={inputValue} 
                placeholder="..." 
                className="message__input-content"
                onChange={handleInput}
                ></input>
                <div className="message__input-submit" onClick={handleSubmit}><IoIosSend style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                }}/></div>
            </div>
        </div>
    )
}
export default UserConversation;