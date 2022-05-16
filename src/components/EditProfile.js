import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../backend";

const EditProfile = () => {
  const params = useParams();
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(
        `${api}/profile/${params.profileId}`,
        {
          name: name,
          email: location.state.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMsg(
        "Profile Updated, you will be redirected to your profile in 5 secs."
      );
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    } catch (error) {
      setMsg(error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading ? (
        <h1>Loading.....</h1>
      ) : msg ? (
        <h1>{msg}</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label htmlFor="email">Email:</label>
          <input type="email" value={location.state.email} readOnly></input>
          <input type="submit" value="Update"></input>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
