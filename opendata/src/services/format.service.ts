import { axiosInstance } from "../lib/axios";

const Base = "/format";

export const getFormats = async () => {
    const { data } = await axiosInstance.get(`${Base}/get-all-formats`);
    return data;
};

export const addFormat = async (formatData: { formatName: string }) => {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.post(
        `${Base}/add-format`,
        formatData,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

export const updateFormat = async (
    formatId: string,
    formatData: { formatName: string }
) => {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.put(
        `${Base}/update-format/${formatId}`,
        formatData,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};
