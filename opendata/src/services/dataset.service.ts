import { axiosInstance } from "../lib/axios";
const Base = "/dataset";

export const getDatasets = async (params?: any, accessToken?: any) => {

    try {
        const { data } = await axiosInstance.get(
            `${Base}/get-datasets`,
            {
                params,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        return data;
    } catch (error) {
        throw error;
    }
};

