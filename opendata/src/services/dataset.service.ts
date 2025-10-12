import { axiosInstance } from "../lib/axios";

const Base = "/dataset";

export const getDatasets = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-datasets`);
        return data;
    } catch (error) {
        throw error;
    }
};
