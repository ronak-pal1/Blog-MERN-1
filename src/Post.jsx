import { format} from "date-fns";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({id, title, summary, imageSrc, time, author}) => {
    return (
        <div className="post">
                <Link to={`/post/${id}`} className="postLink">
                    <img src={`http://localhost:4000/${imageSrc}`} alt="fan" />
                </Link>

            <div className="textSection">
                <Link to={`/post/${id}`} style={{textDecoration:'none', color:'black'}}><h2>{title}</h2></Link>

                <div className="info">
                    <p className="author">Author: {author}</p>
                    <p className="time">Posted on: {format(new Date(time), 'MMM d, yyyy HH:mm')}</p>
                </div>

                <p>{summary}</p>
            </div>
        </div>
    );
}

export default Post;