import { useEffect, useState } from "react";
import { getUser, getToken } from "../../api/axios-client";
import friendsAPI from "../../api/friends-api";
import Friends from "./friend";
const RightPage = ()=>{
    const user = getUser();
    const token = getToken();
    const [data, setData] = useState([{}]);

    useEffect(() => {
        async function getData() {
            try {
                const res = await friendsAPI.getAllFriend(token);
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
            }}>Danh sách bạn bè</div>
            
            {
                data && data.map((item, index)=>{
                    return(
                        <Friends key={index} data={item} com={data} setCom={setData} />
                    )
                })
            }
        </div>
    )
}
export default RightPage;