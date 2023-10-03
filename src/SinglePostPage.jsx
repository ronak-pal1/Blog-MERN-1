import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './SinglePostPage.css';
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";

const SinglePostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const params = useParams();

    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        
        fetch(`http://localhost:4000/post/${params.id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, [])


    if(!postInfo) return '';

    return (        
        <div className="singlePostPage">
            <h1>{postInfo.title}</h1>

            <div class="singlePostInfo">
                <time>{formatISO9075(new Date(postInfo.createdAt), '')}</time>
                <p>Author: {postInfo.author}</p>
            </div>

            {userInfo.username === postInfo.author && (
                <div className="editSection">
                    <Link to={`/edit/${postInfo._id}`} className="editButton">Edit this post</Link>
                </div>
            )}

            <div className="imageContainer">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="banner" />
            </div>
            <div className="contents" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
}

export default SinglePostPage;