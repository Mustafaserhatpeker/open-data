import { axiosInstance } from "../lib/axios";

const Base = "/organization";

export const getOrganizations = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-all-organizations`);
        return data;
    } catch (error) {
        throw error;
    }
};

