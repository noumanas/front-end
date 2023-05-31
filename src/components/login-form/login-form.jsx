import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/auth";
import { useNavigate } from "react-router-dom";
import { _fetchToken } from "../../utils/spotifyApiServiceHandler";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import { createNewSession } from "../../services/session";

const LoginForm = () => {
  const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState("password");
  const [remeber, setRemember] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: event.target.email.value.toLocaleLowerCase(),
      password: event.target.password.value,
    };
    fetchSpotifyToken();
    try {
      const response = dispatch(
        login({
          data: payload,
        })
      );
      response.then((res) => {
        createNewSession(res.payload.data.accessToken);
        if (remeber) {
          localStorage.setItem("rememberMe", JSON.stringify(payload));
        }
      });
    } catch (err) {
      toast.error(err);
    }
    event.target.email.value = "";
    event.target.password.value = "";
  };
  const fetchSpotifyToken = async () => await _fetchToken();
  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__logo}>
        <img src={logo} alt="logo" className={classess.page__logo__img} />
        <h1 className={classess.page__logo__text}>Welcome to Black Lion</h1>
      </Box>
      <Box varient="div" component="div" className={classess.page__form}>
        <form
          action=""
          className={classess.page__form__main}
          onSubmit={onSubmit}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__form__main__field_container}
          >
            <label
              className={classess.page__form__main__field_container__label}
            >
              E-mail ID
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <InputLabel htmlFor="component-filled">Email ID</InputLabel>
              <FilledInput
                id="component-filled"
                defaultValue={rememberMe ? rememberMe.email : ""}
                name="email"
                type="text"
                className={classess.page__form__main__field_container__input}
                required
              />
            </FormControl>
          </Box>
          <Box
            varient="div"
            component="div"
            className={classess.page__form__main__field_container}
          >
            <label
              className={classess.page__form__main__field_container__label}
            >
              Password
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <InputLabel htmlFor="component-filled">Password</InputLabel>
              <FilledInput
                id="component-filled"
                defaultValue={rememberMe ? rememberMe.password : ""}
                name="password"
                type={passwordIcon}
                className={classess.page__form__main__field_container__input}
                required
              />
              <Box
                varient="div"
                component="div"
                sx={{
                  position: "absolute",
                  right: "18px",
                  top: "18px",
                  color: "#62666c",
                }}
              >
                {passwordIcon === "password" ? (
                  <FiEyeOff
                    fontSize={22}
                    cursor="pointer"
                    onClick={() => setPasswordIcon("text")}
                  />
                ) : (
                  <FiEye
                    fontSize={22}
                    cursor="pointer"
                    onClick={() => setPasswordIcon("password")}
                  />
                )}
              </Box>
            </FormControl>
          </Box>

          <Box
            varient="div"
            component="div"
            className={classess.page__form__main__form_action}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => setRemember(event.target.checked)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{ color: "white" }}
            />

            <Button onClick={() => navigate("/forgot-password")} variant="text">
              Forgot Password
            </Button>
          </Box>
          <Box
            varient="div"
            component="div"
            className={classess.page__form__main__action}
          >
            <Button
              type="submit"
              className={classess.page__form__main__action__btn}
              variant="contained"
              sx={{ width: { xs: "100%", sm: "100%", lg: "45%" } }}
            >
              Log In
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{
                background: "#36A1FF",
                width: { xs: "100%", sm: "100%", lg: "45%" },
              }}
              onClick={() => navigate("/signup")}
            >
              Register now
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
