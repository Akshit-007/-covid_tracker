import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Heading from './Heading.js';
import "../Styles/Auth.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const onSignIn = event => {
        event.preventDefault();

        if (name == "admin" && password == "password") {
            toast.success("Success Login !", {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate('/display');
        }
        else {
            toast.error("Authentication Error!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }
    return (
        <div>
            <Heading />
            <div className="blank"></div>
            <form className="form">
                <div className="form_heading">Sign In</div>
                <br />
                <br />
                <div className="form_info">
                    Name <br /> <input type="text" value={name} placeholder="admin" onChange={(e) => { setName(e.target.value) }} />
                    <br />
                    <br />
                    Password <br /> <input type="text" value={password} placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <br />
                    <br />
                    <button onClick={onSignIn} className="auth_btn">SignIn</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Auth;