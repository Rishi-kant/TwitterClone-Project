import React, { useEffect, useRef } from "react";

import "./App.css";
import SignUp from "./components/SignupComponent/SignUp";

import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUpInitial from "./pages/signup/SignUpInitial";



import { FcGoogle } from "react-icons/fc";
import Buttons from "./components/smallComponents/Button";
import Sidebar from "./components/sideBar/Sidebar";
import UserData from "./components/userData/UserData";
import style from "./pages/home/Home.module.css";
import TrendingData from "./components/trending/TrendingData";
import AddingTweet from "./components/addingTweet/AddingTweet";
import TwitterFeed from "./components/homeTweetCarousel/twitterFeed/TwitterFeed";
import LandingSidebar from "./components/landingPage/LandingSidebar";
import RightsideCard from "./components/landingPage/RightsideCard";
import Navbar from "./pages/navbar/Navbar";
import LandingPa from "./pages/LandingPa";



// import Login from "./pages/login/login";
import { useRecoilState } from "recoil";
import { authAtom } from "./recoil/users";
import Login from "./pages/login/Login" ;


function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);

  const isFirstRender = useRef(true);
  useEffect(() => {
    const authFromLocal = JSON.parse(localStorage.getItem("auth"));
    if (authFromLocal && isFirstRender.current) {
      setAuth(authFromLocal);
    }
    localStorage.setItem("auth", JSON.stringify(auth));
    if (auth.isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
    isFirstRender.current = false;
  }, [auth]);

  return (
    <>


      {/* <div className={style.home}>

        <div className={style.sidebar}>
          <LandingSidebar />
        </div>
        <div className={style.mainSection}>
          <div>
            <TwitterFeed />
          </div>
        </div>
        <div className={style.rightSide}>
          <div className={style.trendings}>
            <RightsideCard />
          </div>
        </div>
        <Navbar />
      </div> */}
      <Routes>

        <Route path="/" element={<LandingPa />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpInitial />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>

    </>
  );
}

export default App;
