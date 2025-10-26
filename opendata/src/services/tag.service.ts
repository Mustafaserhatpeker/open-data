import { axiosInstance } from "../lib/axios";

const Base = "/tag";

export const getTags = async () => {
    const { data } = await axiosInstance.get(`${Base}/get-all-tags`);
    return data;
};

export const addTag = async (tagData: { tagName: string }) => {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.post(`${Base}/add-tag`, tagData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
};

export const updateTag = async (
    tagId: string,
    tagData: { tagName: string }
) => {
    const accessToken = localStorage.getItem("accessToken");
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
};
