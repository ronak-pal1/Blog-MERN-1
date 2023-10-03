import { Link } from "react-router-dom";
import "./Header.css";
import { useContext, useEffect} from "react";
import { UserContext } from "./UserContext";

const Header = () => {

    const {userInfo, setUserInfo} = useContext(UserContext);

    useEffect(()=>{
       

        fetch("http://localhost:4000/profile", {
            credentials: 'include',
       }).then(response => {
        response.json().then(userInfo => {
            setUserInfo(userInfo);
        })
       })
    },[]);

    const logout = () =>{

        fetch("http://localhost:4000/logout", {
            credentials: 'include',
            method: 'POST',
        })

        setUserInfo(null);
    }


    return (
        <nav className="header">
            <div className="headerLeft">
                <Link className="links" to={'/'}>My blog</Link>
            </div>

            <div className="headerRight">

                { userInfo?.username ? (
                    <>
                        <p>username: {userInfo?.username}</p>
                        <Link className="links" to={'/create'}>Create a new post</Link>
                        <a className="links" onClick={logout}>Logout</a>
                    </>
                ): (
                    <>
                        <Link className="links" to={'/Login'}>Login</Link>
                        <Link className="links" to={'/Register'}>Register</Link>
                    </>
                )}
                
            </div>
        </nav>
    );
}

export default Header;