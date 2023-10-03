import { useEffect, useState } from "react";
import Post from "./Post";


const HomePage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:4000/create").then(response =>{
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])

    return (
        <>
           {posts.length > 0 && posts.map(post => (
            <Post key={post._id} id={post._id} title={post.title} summary={post.summary} imageSrc={post.cover} time={post.createdAt} author={post.author}/>
           ))}
        </>
    );
}

export default HomePage;