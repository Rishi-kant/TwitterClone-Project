import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Styles from "./SignUp.module.css";


import { ImCross } from "react-icons/im";
import { authAtom } from "../../recoil/users";
import { useRecoilState } from "recoil";
import Icons from "../smallComponents/Icons";

import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { useState } from "react";
import { Button } from "@mui/base";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";

import Navbar from "../../pages/navbar/Navbar";

export default function SignUp() {
  const [showForm, setShowForm] = useState(true);
  function handleForm() {
    setShowForm(!showForm);
    navigate("/");
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let years = Array(120)
    .fill(1903)
    .map((ele, index) => ele + index);

  const initialData = {
    username: "",
    number: "",
    month: "",
    year: "",
    day: "",
    password: "",
    email: "",
  };
  const [details, setDetails] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authAtom);


  function handlechange(e) {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
   
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
    setErrors(validation(details));
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      localStorage.setItem("users", JSON.stringify([...data, details]));
      setDetails(initialData);
      setIsLoggedIn({
        isLoggedIn: true,
        user: {
          name: details.username,
          email: details.email,
          number: details.number,
        },
      });
      window.alert('Welcome!!')
      navigate("/");


      navigate("/login");

    }
  }, [errors]);

  useEffect(() => {
    const dataFromLocal = localStorage.getItem("users");
    if (dataFromLocal) {
      setData(JSON.parse(dataFromLocal));
    } else {
      setData([]);
    }
  }, []);

  function validation(details) {
    let warnings = {};
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!details.username) {
      warnings.username = "Please enter the name";
    } else if (details.username.length <= 2) {
      warnings.username = "Not a valid name";
    }
    if (toggle === false) {
      if (!details.email) {
        warnings.email = "Email is required";
      } else if (!regEx.test(details.email)) {
        warnings.email = "Please enter a valid email";
      }
    } else {
      if (!details.number) {
        warnings.number = "Phone number required";
      } else if (details.number.length < 10) {
        warnings.number = "Enter a valid Number";
      }
    }

    if (!details.password) {
      warnings.password = "Password is required";
    } else if (details.password.length < 6) {
      warnings.password = "Enter a strong password";
    }

    return warnings;
  }
 
  return (
    <div style={{ margin: "50px" }}>
      <Box
        sx={{
          paddingRight: "40px",
          paddingLeft: "40px",
          width: 600,
          height: 647,
          backgroundColor: "white",
          borderRadius: 5,
          borderColor: "black",
          // maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem",
          textAlign: "center",

          border: "1px solid #dadce0",
          position: "absolute",
          top: 0,
          left: 400,
        }}
      >
        <button onClick={handleForm}>
          <Icons icons={<ImCross className={Styles.cross} />} />
        </button>


        <FormControl type="submit">
          <h2
            style={{
              color: "black",
              marginBottom: "35px",
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            Create your account
          </h2>
          <TextField
            sx={{
              // backgroundColor: red,
              width: 438,
              height: 56,
              // marginBottom: 2,
            }}
            name="username"
            type="text"
            id="filled-basic"
            label="Name"
            value={details.username}
            variant="outlined"
            onChange={handlechange}
          />
          {/* //error message */}
          <p style={{ color: "red", textAlign: "left" }}>{errors.username}</p>
          {toggle ? (
            <TextField
              sx={{
                backgroundColor: red,
                width: 438,
                height: 56,
                marginBottom: 1,
                marginTop: 2,
              }}
              name="number"
              type="number"
              id="filled-basic"
              label="Phone"
              value={details.number}
              variant="outlined"
              onChange={handlechange}
            />
          ) : (
            <TextField
              sx={{
                backgroundColor: red,
                width: 438,
                height: 56,
                marginBottom: 1,
                marginTop: 2,
              }}
              name="email"
              type="email"
              id="filled-basic"
              label="Email"
              value={details.email}
              variant="outlined"
              onChange={handlechange}
            />
          )}
          <div>
            <p
              style={{ color: "blue", textAlign: "right", cursor: "pointer" }}
              onClick={handleToggle}
            >
              {toggle ? <>Use email instead</> : <>Use phone instead</>}

              {/* //error message */}
            </p>
            {toggle ? (
              <p style={{ color: "red", textAlign: "left" }}>{errors.number}</p>
            ) : (
              <p style={{ color: "red", textAlign: "left" }}>{errors.email}</p>
            )}
          </div>
          <TextField
            sx={{ backgroundColor: red, width: 438, height: 56, marginTop: 2 }}
            type="password"
            name="password"
            id="filled-basic"
            label="Password"
            value={details.password}
            variant="outlined"
            onChange={handlechange}
          />
          {/* //error message */}
          <p style={{ color: "red", textAlign: "left" }}>{errors.password}</p>
          <div className={Styles.date}>
            <h5 style={{ color: "black" }}>Date of Birth</h5>
            <p style={{ color: "black" }}>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              type="text"
              value={details.month}
              name="month"
              onChange={handlechange}
              sx={{ width: 200 }}
              label="Month"
              select
            >
              {months.map((month) => {
                return <MenuItem value={month}>{month}</MenuItem>;
              })}
            </TextField>
            <TextField
              type="text"
              value={details.year}
              name="year"
              onChange={handlechange}
              sx={{ width: 100, height: "100" }}
              label="Years"
              select
            >
              {years.map((year, index) => {
                return (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              type="number"
              onChange={handlechange}
              name="day"
              sx={{ width: 100 }}
              label="Day"
              select
            >
              {days.map((day, index) => {
                return (
                  <MenuItem key={index} value={day}>
                    {day}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
          <Button
            style={{
              margin: 20,
              marginTop: "80px",
              padding: "15px",
              borderRadius: "25px",
              color: "white",
              backgroundColor: "black",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
      {/* <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Succesfully Logged in...
        </Alert>
      </Snackbar> */}
      <Navbar />
    </div>
  );
}
