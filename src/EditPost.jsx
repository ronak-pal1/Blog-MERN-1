import { useEffect, useState } from "react";
import './CreatePost.css';
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


// below two things are copy pasted from documentation of react quill
const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];


const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        fetch(`http://localhost:4000/post/${id}`).then(response => {
            
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        
        })

    }, [])

    const updatePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('id', id);
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if(files?.[0])
            data.set('file', files?.[0]);

        const response = await fetch("http://localhost:4000/create", {
            'method':'PUT',
            'body': data,
            'credentials': 'include',
        })

        if(response.ok)
            setRedirect(true);
    }

    if(redirect)
    {
        return <Navigate to={'/'} />;
    }

    return (
        <form className="createPostForm" onSubmit={updatePost}>
            <input type="title" value={title} onChange={e => {setTitle(e.target.value)}} placeholder="Title"/>
            <input type="summary" value={summary} onChange={e => {setSummary(e.target.value)}} placeholder="Summary"/>
            <input type="file" onChange={e => setFiles(e.target.files)}/>
            <ReactQuill value={content} onChange={value => {setContent(value)}} modules={modules} formats={formats}/>       
            <button>Update Post</button>     
        </form> 
    );
}

export default EditPost;