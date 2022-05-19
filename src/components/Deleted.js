import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../backend";

const Deleted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const deleteProfile = async () => {
      setIsLoading(true);
      try {
        await axios.delete(`${api}/profile/${location.state.id}`, {
          headers: {
            Authorization: `Bearer ${location.state.token}`,
          },
        });
        setIsLoading(false);
        setDeleted(true);
        navigate("/signup");
      } catch (error) {}
    };
    setTimeout(() => {
      location.state?.id ? navigate("/profile") : deleteProfile();
    }, 5000);
  }, [navigate, location]);

  useEffect(() => {
    setTimeout(() => navigate("/profile"), 5000);
  }, [deleted, navigate]);
  return isLoading ? (
    localStorage.getItem("id") ? (
      <div>
        <h1>Successfully deleted the book</h1>
      </div>
    ) : (
      <div>
        <h1>Successfully deleted your profile</h1>
      </div>
    )
  ) : (
    <h1 className="loading">Loading....</h1>
  );
};

export default Deleted;
