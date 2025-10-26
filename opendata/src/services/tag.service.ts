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

export const addTag = async (tagData: { name: string; description: string }) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const { data } = await axiosInstance.post(
            `${Base}/add-tag`,
            tagData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateTag = async (
    tagId: string,
    tagData: { name: string; description: string }
) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const { data } = await axiosInstance.put(
            `${Base}/update-tag/${tagId}`,
            tagData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return data;
    } catch (error) {
        throw error;
    }
};