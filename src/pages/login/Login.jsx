import UiPart from "./../../components/smallComponents/UiPart";
import { ImCross } from "react-icons/im";

import { NavLink, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import style from "./Login.module.css";

import Icons from "./../../components/smallComponents/Icons";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


import { Snackbar } from "@mui/base";
import Navbar from "../navbar/Navbar";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/users";

const Login = () => {
  const setAuth = useSetRecoilState(authAtom);
  const [data, setData] = useState([]);
  const [firstInput, setFirstInput] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(true);
  //this state for password show and hide
  const [showPassword, setShowPassword] = React.useState(false);

  // This state is for snackBar
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const dataFromLocal = localStorage.getItem("users");
    if (dataFromLocal) {
      setData(JSON.parse(dataFromLocal));
    } else {
      setData([]);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (firstInput == "") {
      alert("Please fill the currect userNaame,email or phon number");
    } else {
      const findUser = data.find((user) => {
        return (
          user.username === firstInput ||
          user.email === firstInput ||
          user.number === firstInput
        );
      });
      if (!findUser) {
        alert("user data not found");
      } else {
        setShow(!show);
      }
    }
  }
  function handleForm() {
    setShowForm(false);
    navigate("/");
  }

  function handlePasswordSumbit(e) {
    e.preventDefault();
    const findUser = data.find((user) => {
      return (
        user.username === firstInput ||
        user.email === firstInput ||
        user.number === firstInput
      );
    });
    if (findUser.password === password) {
      // alert("succes Fully loged in")
      setOpen(true);
      setAuth((auth) => {
        return {
          isLoggedIn: true,
          user: {
            name: findUser.username,
            email: findUser.email,
            number: findUser.number,
          },
        };
      });
    } else {
      alert("please fill the correct Password");
    }
  }

  //this funtions are for password toggle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // This function is for Cloging snackbar
  function handleClose() {
    setOpen(false);
    navigate("/");
  }

  return (
    <div>
      {!show ? (
        <form onSubmit={handleSubmit}>
          {showForm && (
            <Box
              sx={{
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 400,
                height: 400,
                backgroundColor: "white",
                borderRadius: "10px",
                border: "2px solid lightgrey",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -5,
                padding: 11,
              }}
            >
              <button onClick={handleForm}>
                <Icons icons={<ImCross className={style.cross} />} />
              </button>

              <UiPart title="Sign in to Twitter" />
              <div className={style.hrr}>or</div>

              <TextField
                onChange={(e) => setFirstInput(e.target.value)}
                value={firstInput}
                id="filled-basic"
                label="Phone,email, or username"
                variant="outlined"
                sx={{ width: 300 }}
              />

              <Button
                variant="outlined"
                type="submit"
                sx={{
                  textTransform: "none",
                  width: 300,
                  height: 40,
                  border: "1px solid #dadce0",
                  backgroundColor: "black",
                  borderRadius: "50px",
                  color: "white",
                  fontFamily: "Google Sans arial,sans-serif",
                  fontSize: 14,
                  letterSpacing: 0.25,
                  margin: 2,

                  "&:hover": {
                    backgroundColor: "initial",
                    color: "initial",
                    border: "1px solid #dadce0",
                  },
                }}
              >
                Next
              </Button>

              <Button
                sx={{
                  textTransform: "none",
                  width: 300,
                  height: 40,
                  border: "1px solid #dadce0",
                  backgroundColor: "white",
                  borderRadius: "50px",
                  color: "black",
                  fontFamily: "Google Sans arial,sans-serif",
                  fontSize: 14,
                  letterSpacing: 0.25,
                  margin: 2,
                  "&:hover": {
                    backgroundColor: "initial",
                    color: "initial",
                    border: "1px solid #dadce0",
                  },
                }}
                variant="outlined"
              >
                Forget password ?
              </Button>
              <p className="p">
                Don't have an account?{" "}
                <span>
                  <NavLink className="link" to="/signup">
                    Sign up
                  </NavLink>
                </span>
              </p>
            </Box>
          )}
        </form>
      ) : (
        <div>
          <form onSubmit={handlePasswordSumbit}>
            <Box
              sx={{
                zIndex: 99,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 350,
                height: 350,
                backgroundColor: "white",
                borderRadius: "10px",
                border: "2px solid lightgrey",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -5,
                padding: 15,
              }}
            >
              <button onClick={handleForm}>
                <Icons icons={<ImCross className={style.cross} />} />
              </button>
              <UiPart title="Sign in to Twitter" />
              <TextField
                id="filled-basic"
                // label="Phone,email, or username"
                value={firstInput}
                variant="outlined"
                sx={{ width: 300, marginBottom: 5 }}
              />
              <div>
                <FormControl sx={{ m: 1, width: "38ch" }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    onChange={(e) => setPassword(e.target.value)}
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    textTransform: "none",
                    width: 300,
                    height: 40,
                    border: "1px solid #dadce0",
                    backgroundColor: "white",
                    borderRadius: "50px",
                    color: "black",
                    fontFamily: "Google Sans arial,sans-serif",
                    fontSize: 20,
                    letterSpacing: 0.25,
                    margin: 2,
  
                    "&:hover": {
                      backgroundColor: "initial",
                      color: "initial",
                      border: "1px solid #dadce0",
                    },
                  }}
                  
                >
                  Log in
                </Button>
              </div>

              <div>
                <p className="p">
                  Don't have an account?{" "}
                  <span>
                    <NavLink className="link" to="/signup">
                      Sign up
                    </NavLink>
                  </span>
                </p>
              </div>
            </Box>
          </form>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Succesfully Logged in...
        </Alert>
      </Snackbar>
      <Navbar />
    </div>
  );
};

export default Login;
