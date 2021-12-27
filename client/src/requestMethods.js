import axios from 'axios'

const BASE_AXIOS_URL = "http://localhost:5000/api/";
const verifyUserSignin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).userSignin).userInfo
const TOKEN = verifyUserSignin ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).userSignin).userInfo
              .accessToken : ""

export const publiqueRequest = axios.create({
    baseURL:BASE_AXIOS_URL
});

export const userRequest = axios.create({
    baseURL:BASE_AXIOS_URL,
    headers:{token:`Bearer ${TOKEN}`}
})   