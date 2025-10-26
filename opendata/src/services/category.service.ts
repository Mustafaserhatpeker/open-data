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

export const getCategoryById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `${Base}/get-category/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id: string, payload: any) => {
  const accesToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axiosInstance.put(
      `${Base}/update-category/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (payload: any) => {
  const accesToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axiosInstance.post(

      `${Base}/create-category`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};