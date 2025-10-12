import { axiosInstance } from "../lib/axios";

const Base = "/tag";

export const getTags = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-all-tags`);
        return data;
    } catch (error) {
        throw error;
    }
};
