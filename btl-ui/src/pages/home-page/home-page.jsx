// eslint-disable-next-line
"use strict";

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { FormGroup, Form, Spinner, Col, Row } from "reactstrap";
// import Modal from "react-modal";
/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { getToken, getUser } from "../../api/axios-client";
import postAPI from "../../api/post-api";
import PostItem from "../../components/post-item/post-item";
import { CreatePost } from "../../components";
import '../../styles/home-page/home-page.css';
import '../../styles/conversation/conversation.css';
import LeftPage from "../left-page/left-page";
import RightPage from "../right-page/right-page";
const HomePage = () => {

    const tokenUser = getToken();
    const user = getUser();

    const [allPosts, setAllPosts] = useState({})
    
    useEffect(() => {
        async function getAllPosts() {
            try {
                const allPosts = await postAPI.getAllPosts(tokenUser);
                if (allPosts && allPosts.status === 200) {
                    setAllPosts(allPosts.data.result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllPosts();
        //console.log(allPosts);
        // eslint-disable-next-line
    }, []);
    
    // console.log(allPosts);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const search = params.get('search');

    useEffect(() => {
        async function search() {
            try {
                // console.log(search);
            } catch (error) {
                console.log(error);
            }
        } search();
    }, [search]);


    return (
        <div className="main-page">
            <div className="main-page_left" style={{
                padding: '0 10px',
                
            }}>
                <LeftPage></LeftPage>
            </div>
            <div>
                <div ><CreatePost user={user} /></div>
                {
                    allPosts && allPosts.length > 0 && allPosts.map((post, index) => {
                        return (
                            <div key={index}>
                                <PostItem post={post}></PostItem>
                            </div>
                        )
                    })
                }
            </div>
            
            <div className="main-page-right" style={{
                padding: '0 10px',}}>
                    <RightPage/>
            </div>
        </div>
    )
}

export default HomePage;