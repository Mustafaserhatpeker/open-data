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

export const getOrganizationById = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-organization/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};