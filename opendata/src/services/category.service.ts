import { axiosInstance } from "../lib/axios";

const Base = "/category";

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get(`${Base}/get-all-categories`);
    return data;
  } catch (error) {
    throw error;
  }
};
