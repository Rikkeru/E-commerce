import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  console.log = console.warn = console.error = function () { }

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/view');
    }
  }, [navigate]);

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 15) {
      return false;
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validatePassword(user.password)) {
      setErrorMessage("*Password must be 8-15 characters and include at least one uppercase letter, one lowercase letter, and one number.*");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8800/signup", user);
      console.log("Signup successful!", response.data);
      localStorage.setItem('username', user.username);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response ? error.response.data : error);
      setErrorMessage("Signup failed. Please try again.");
    }
  };
  return (
    <div className="container mt-4">
      <div className="loginsignupform">
        <h1 className="welcome">Sign up to <span id="browsify1">Browsify</span>!</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="fullname" name="fullname" onChange={(e) => setUser({ ...user, fullname: e.target.value })} required autoComplete="off" />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name="username" onChange={(e) => setUser({ ...user, username: e.target.value })} required autoComplete="off" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required autoComplete="off" />
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <button type="submit" id="signupbtn" className="btn btn-primary">Sign Up</button>
        </form>
        <p className="mt-2">Already have an account?{" "}
          <Link to="/login" id="loginlink" className="btn btn-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
