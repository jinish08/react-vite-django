import axios from "axios";

const app_api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export default app_api;
