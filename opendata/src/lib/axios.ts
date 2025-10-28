import axios from "axios";
import qs from "qs";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BaseURL,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
});


