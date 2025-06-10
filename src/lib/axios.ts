import axios from "axios";

export const Api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
