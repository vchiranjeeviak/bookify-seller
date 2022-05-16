import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../backend";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${api}/auth/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{msg}</p>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={data.password}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Signup;
