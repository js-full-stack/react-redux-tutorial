import axios from "axios";
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from "./auth-actions";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = (credential) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post("/users/signup", credential);
    token.set(response.data.token);

    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

export const logIn = (credential) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post("/users/login", credential);
    token.set(response.data.token);
    // console.log(response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logOut = () => async (dispatch) => {
  dispatch(logoutRequest());

  try {
    await axios.post("/users/logout");
    dispatch(logoutSuccess());

    // если логаут выполнелся успешно - снимаем заголовок авторизации
    token.unset();
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};
export const getCurrentUser = () => async (dispatch, getState) => {
  // деструктуризуем поле токена из стейта
  const {
    auth: { token: persistedToken },
  } = getState();

  // если токена нет - просто выходим из операции
  if (!persistedToken) {
    return;
  }
  // если токен есть - дообавляем его в заголовок авторизации
  token.set(persistedToken);

  dispatch(getCurrentUserRequest());
  try {
    const response = await axios.get("/users/current");
    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};
