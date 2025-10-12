import { axiosInstance } from "../lib/axios";

const Base = "/format";

export const getFormats = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-all-formats`);
        return data;
    } catch (error) {
        throw error;
    }
};
