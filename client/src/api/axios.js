//Axios is a library to make HTTP requests (like fetch in JavaScript, but easier).
import axios from "axios";

//This creates a custom Axios instance called API.
const API = axios.create({ baseURL: "http://localhost:5000/api" });

/*Interceptors are like middlemen for requests.
This one runs before every request you send using API.
It allows you to modify the request (e.g., add headers) automatically. */
API.interceptors.request.use((config) => {
  const storage = localStorage.getItem("user");
  if (storage) {
    //JSON.parse() is a JavaScript function that converts a JSON string into a JavaScript object.
    const user = JSON.parse(storage);
    //user.token → JWT (JSON Web Token) used to authenticate requests.
    //config.headers.Authorization = "Bearer " + user.token → attaches token to every request automatically.
    //These headers are used in authMiddleware.js
    if (user.token) config.headers.Authorization = "Bearer " + user.token;
  }
  //Always return the config object after modifying it, so Axios knows what to send.
  return config;
});

export default API;

/*Summary for a beginner
Creates a pre-configured Axios instance.
Automatically attaches user token to every request if the user is logged in.
Makes API calls easier because you don’t have to write the full URL or manually attach the token every time. */
