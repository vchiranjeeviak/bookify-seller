import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../backend";

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
    <div>
      <p>{msg}</p>
      <h3>{name}</h3>
      <span>{price}</span>
      <p>{description}</p>
      <img src={image} alt="book" />
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Book;
