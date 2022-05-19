import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../backend";
import "../styles/login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
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
      const res = await axios.post(`${api}/auth/signin`, {
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
      <h2>
        Login here or{" "}
        <Link className="link" to="/signup">
          Signup
        </Link>{" "}
        if you are not a member already
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <p className="msg">{msg}</p>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
