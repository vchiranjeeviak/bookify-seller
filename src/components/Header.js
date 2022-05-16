import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <h1>Bookify-Seller</h1>
      <ul>
        {auth && (
          <li>
            <Link to="/addbook">Add Books</Link>
          </li>
        )}
        {auth && (
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
        )}
        {!auth && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {!auth && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {auth && <li onClick={handleLogout}>Logout</li>}
      </ul>
    </div>
  );
};

export default Header;
