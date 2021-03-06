import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../backend";
import "../styles/addBook.scss";

const AddBook = () => {
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMsg("");
  }, []);
  const handleChange = (event) => {
    if (event.target.name === "image") {
      setData({ ...data, [event.target.name]: event.target.files[0] });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.name || !data.price || !data.image) {
      setMsg("Enter all fields");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${api}/book/`,
        {
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false);
      setMsg("Uploaded successfully, Redirecting to your profile in 5 secs");
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      setMsg(
        error.response.data.message +
          ", Redirecting to same page again in 5 secs"
      );
      setTimeout(() => {
        navigate("/addbook");
        setMsg("");
      }, 5000);
    }
  };
  return !isLoading ? (
    <div className="main">
      <p className="msg">{msg}</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="inputs"
          type="text"
          name="name"
          placeholder="Book name"
          onChange={handleChange}
        />
        <input
          className="inputs"
          type="number"
          name="price"
          placeholder="Book price"
          onChange={handleChange}
        />
        <textarea
          className="inputs"
          name="description"
          placeholder="Description about book..."
          onChange={handleChange}
        />
        <div className="image">
          <label htmlFor="image">Image of book:</label>
          <input name="image" type="file" onChange={handleChange} />
        </div>
        <input type="submit" value="submit"></input>
      </form>
    </div>
  ) : (
    <h1 className="loading">Loading....</h1>
  );
};

export default AddBook;
