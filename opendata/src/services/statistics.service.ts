import { axiosInstance } from "../lib/axios";

const Base = "/statistics";

export const getStatistics = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-statistics`);
        return data;
    } catch (error) {
        throw error;
    }
};