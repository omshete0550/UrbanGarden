import { loginFailure, loginStart, loginSuccess, updateUser } from "./slices/userSlice";
import axios from "axios";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        await axios.post("/auth/register", user);
        const username = user.username
        const password = user.password
        login(dispatch, { username, password });
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const update = async (dispatch, user) => {
    try {
        const res = await axios.put(`/users/${user.id}`, user);
        dispatch(updateUser(res.data));
    } catch (err) {
        console.log(err)
    }
};