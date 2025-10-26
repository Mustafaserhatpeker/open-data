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

export const addFormat = async (formatData: { name: string; description: string }) => {
    try {
        const { data } = await axiosInstance.post(
            `${Base}/add-format`,
            formatData
        );
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateFormat = async (
    formatId: string,
    formatData: { name: string; description: string }
) => {
    try {
        const { data } = await axiosInstance.put(
            `${Base}/update-format/${formatId}`,
            formatData
        );
        return data;
    } catch (error) {
        throw error;
    }
};