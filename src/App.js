import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddBook from "./components/AddBook";
import Deleted from "./components/Deleted";
import EditBook from "./components/EditBook";
import EditProfile from "./components/EditProfile";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/book/:bookId" element={<EditBook />} />
          <Route path="/deleted" element={<Deleted />} />
          <Route path="/profile/:profileId" element={<EditProfile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
