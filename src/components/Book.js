import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../backend";
import "../styles/book.scss";

const Book = ({ id, name, price, description, image, setData }) => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const handleEdit = (event) => {
    navigate(`/book/${id}`);
  };
  const handleDelete = async (event) => {
    try {
      await axios.delete(`${api}/book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/deleted");
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  return (
    <div className="book">
      <img className="image" src={image} alt="book" />
      <p className="msg">{msg}</p>
      <div className="nameAndPrice">
        <h3 className="name">{name}</h3>
        <span className="price">Rs.{price}</span>
      </div>
      <p className="description">{description}</p>
      <div className="buttons">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Book;
