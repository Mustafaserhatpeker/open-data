import { axiosInstance } from "../lib/axios";

const Base = "/licence";

export const getLicences = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-all-licences`);
        return data;
    } catch (error) {
        throw error;
    }
};
