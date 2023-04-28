import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUpInitial from "./pages/SignUpInitial";
import Register from "./pages/Register";
import NavBar from "./pages/Navbar";

import Logins from "./pages/Login/login";
import UserData from "./components/userData/UserData";
function App() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/signup" element={<SignUpInitial />} />
      </Routes>

      {/* <Logins/> */}
    </>
  );
}

export default App;
