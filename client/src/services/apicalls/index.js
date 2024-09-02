import axios from "axios";

export const instance = axios.create({
  baseURL: "https://book-my-show-project-three.vercel.app",
  // baseURL: "http://localhost:3001",
  withcredentials: true,
  headers: {
    "content-type": "application/json",
  },
});
