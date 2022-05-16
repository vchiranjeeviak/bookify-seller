import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../backend";

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getBook = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${api}/book/${bookId}`);
        setData({
          id: res.data._id,
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
          image: res.data.image,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response.data.message);
      }
    };
    getBook();
  }, [bookId]);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put(`${api}/book/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
      setMsg(error.response.data.message);
    }
  };
  return !isLoading ? (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{msg}</p>
        <label htmlFor="id">Book ID:</label>
        <input name="id" value={data.id} readOnly />
        <label htmlFor="name">Book Name:</label>
        <input name="name" value={data.name} onChange={handleChange} />
        <label htmlFor="price">Book Price:</label>
        <input name="price" value={data.price} onChange={handleChange} />
        <label htmlFor="description">Book Description:</label>
        <input
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  ) : (
    <h1>Loading....</h1>
  );
};

export default EditBook;
