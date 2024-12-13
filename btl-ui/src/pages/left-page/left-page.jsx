import { useEffect, useState } from "react";
import { getUser, getToken } from "../../api/axios-client";
import friendsAPI from "../../api/friends-api";
import FriendRequest from "./friend-request";
const LeftPage = ()=>{
    const user = getUser();
    const token = getToken();
    const [data, setData] = useState([{}]);

    useEffect(() => {
        async function getData() {
            try {
                const res = await friendsAPI.getAllRequest(token, user._id);
                if (res && res.status === 200) {
                    
                    setData(res.data.result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
        
    }, [])
    useEffect(() => {}, [data]);
    return(
        <div>
            <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                
                marginTop: '20px',
               
                marginLeft: '20px',
            }}>Danh sách lời mời</div>
            
            {
                data && data.map((item, index)=>{
                    return(
                        <FriendRequest key={index} data={item} com={data} setCom={setData} />
                    )
                })
            }
        </div>
    )
}
export default LeftPage;