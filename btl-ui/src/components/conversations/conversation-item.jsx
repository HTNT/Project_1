import userAPI from "../../api/user-api";
import { getUser } from "../../api/axios-client";
import { useEffect, useState } from "react";

const ConverItem= (props)=>{
    const iuser = getUser();
    const allMess = props.message;
    //console.log(item);
    return (
        <div className="message__details">
                {
                    allMess && allMess.length > 0 && allMess.map((item, index)=>{
                        const pos = (item.from === iuser._id) ? 'right' : 'left';
                        return(
                            <div className={`message__details-${pos}`} key={index}>
                                <div className={`message__details-${pos}_item`}>{item.text}</div>
                            </div>
                        )
                    })
                }
        </div>
    )
}
export default ConverItem;