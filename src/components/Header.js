import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.scss";

const Header = () => {
  const [auth, setAuth] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setAuth(localStorage.getItem("id") ? true : false);
  }, [localStorage.getItem("id")]);
  const handleLogout = (event) => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };
  return (
    <div className="header">
      <h1 className="title">
        <Link className="link" to="/">
          Bookify-Seller
        </Link>
      </h1>
      <ul className="nav">
        {auth && (
          <li className="nav-item">
            <Link className="link" to="/addbook">
              Add Books
            </Link>
          </li>
        )}
        {auth && (
          <li className="nav-item">
            <Link className="link" to="/profile">
              My Profile
            </Link>
          </li>
        )}
        {!auth && (
          <li className="nav-item">
            <Link className="link" to="/signup">
              Signup
            </Link>
          </li>
        )}
        {!auth && (
          <li className="nav-item">
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
        )}
        {auth && (
          <li className="nav-item" onClick={handleLogout}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
