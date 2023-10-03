import { useState } from 'react';
import './Login.css';

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/Register", {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
        })

        if(response.status === 200)
        {   
            alert("Registration successfull");
        }
        else{
            alert("Registration failed !");
        }
    }

    return (
        <div className="login">
            <form onSubmit={register}>
                <input type="text" placeholder='Username' value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input type="password" placeholder='Password' value={password} onChange={e => {
                    setPassword(e.target.value);
                }}/>
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;