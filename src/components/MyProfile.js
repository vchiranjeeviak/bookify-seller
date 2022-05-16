import axios from "axios";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import { api } from "../backend";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [data, setData] = useState({
    name: " ",
    email: " ",
    addedBooks: [],
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${api}/profile/${localStorage.getItem("id")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData({
          name: response.data.name,
          email: response.data.email,
          addedBooks: [],
        });
        response.data.addedBooks.forEach((id) => {
          axios
            .get(`${api}/book/${id}`)
            .then((book) =>
              setData((data) => ({
                ...data,
                addedBooks: [...data.addedBooks, book],
              }))
            )
            .catch(() => {});
        });
      } catch (error) {
        setMsg(error.response.data.message);
      }
    };
    getData();
  }, []);

  const handleEdit = (event) => {
    navigate(`/profile/${localStorage.getItem("id")}`, {
      state: { name: data.name, email: data.email },
    });
  };

  const handleDelete = async (event) => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    console.log(id);
    navigate("/deleted", { state: { id: id, token: token } });
  };

  return !msg ? (
    <div>
      <h1>Welcome {data.name}</h1>
      <form>
        <input value={data.name} readOnly />
        <input value={data.email} readOnly />
      </form>
      <button onClick={handleEdit}>Edit Profile</button>
      <button onClick={handleDelete}>Delete Profile</button>
      {data.addedBooks &&
        data.addedBooks.map((book) => {
          return (
            <Book
              key={book.data._id}
              id={book.data._id}
              name={book.data.name}
              price={book.data.price}
              description={book.data.description}
              image={book.data.image}
              setData={setData}
            ></Book>
          );
        })}
    </div>
  ) : (
    <h1>{msg}</h1>
  );
};

export default MyProfile;
