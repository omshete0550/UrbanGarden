import { loginFailure, loginStart, loginSuccess, updateUser } from "./slices/userSlice";
import axios from "axios";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "../lib/apiBase";

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await axios.post(
            `${API_BASE_URL}/auth/login`,
            user,
            {
                withCredentials: true,
            }
        );

        const { accessToken, ...sessionUser } = res.data;

        if (accessToken) {
            window.localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
        }

        dispatch(loginSuccess(sessionUser));
    } catch (err) {
        console.error("Login failed:", err);
        dispatch(loginFailure());
    }
};
export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        await axios.post(`${API_BASE_URL}/auth/register`, user);
        const username = user.username
        const password = user.password
        login(dispatch, { username, password });
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const update = async (dispatch, user) => {
    try {
        const details = await axios.put(`${API_BASE_URL}/users/${user.id}`, user);
        const isAdmin = details.data.isAdmin;
        const updtduser = {
            isAdmin: isAdmin,
            details: { ...details.data }
        };
        dispatch(updateUser(updtduser));
    } catch (err) {
        console.log(err)
    }
};
