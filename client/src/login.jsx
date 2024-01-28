import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/view');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/login", user);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', user.username);
            navigate("/intro");
        } catch (err) {
            console.error(err);
            setErrorMessage("Login failed. Please check your credentials.");
        }
    };
    return (
        <div className="container mt-4">
            <div className="loginsignupform">
                <h1 className="welcome">Log in to <span id="browsify2">Browsify</span>!</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" onChange={(e) => setUser({ ...user, username: e.target.value })} required autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required autoComplete="off"/>
                    </div>
                    {errorMessage && <p>{errorMessage}</p>} { }
                    <button onClick={handleLogin} type="submit" id="loginbtn" className="btn btn-primary">Log in</button>
                </form>
                <p className="mt-2">Don't have an account?{" "}
                    <Link to="/signup" id="signuplink" className="btn btn-link">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;