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

export const getDataset = async (id: any) => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-dataset/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getMyDatasets = async (params?: any, accessToken?: any) => {
    try {
        const { data } = await axiosInstance.get(
            `${Base}/get-my-datasets`,
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

export const createDataset = async (datasetData: any, accessToken: any) => {
    try {
        const { data } = await axiosInstance.post(
            `${Base}/create-dataset`,
            datasetData,
            {
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

export const updateDataset = async (datasetData: any, accessToken: any) => {
    try {
        const { data } = await axiosInstance.patch(
            `${Base}/update-dataset`,
            datasetData,
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

