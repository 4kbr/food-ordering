import axios from "axios";

const PUBLIC_URL = process.env.PUBLIC_LINK;

export const axiosPublic = axios.create({
  baseURL: PUBLIC_URL,
});
