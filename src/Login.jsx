import { useContext, useState } from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const {userInfo, setUserInfo} = useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/Login", {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include', // If we want to use our credentials as cookies then we have to include it
        });

        if(response.ok){

            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }else{
            alert("wrong credentials");
        }
    }

    if(redirect)
    {
        return <Navigate to={'/'} />
    }

    return (
        <div className="login">
            <form onSubmit={login}>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;