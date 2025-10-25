import { axiosInstance } from "../lib/axios";

const Base = "/data-request";

// ✅ [USER] — Yeni veri isteği oluştur
export const createDataRequest = async (dataRequestData: any, accessToken: string) => {
    try {
        const { data } = await axiosInstance.post(
            `${Base}/create`,
            dataRequestData,
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

export const getUserDataRequests = async (params?: any, accessToken?: string) => {
    try {
        const { data } = await axiosInstance.get(`${Base}/user`, {
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getOrganizationDataRequests = async (params?: any) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
        const { data } = await axiosInstance.get(`${Base}/organization`, {
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getPublicDataRequests = async (params?: any) => {
    try {
        const { data } = await axiosInstance.get(`${Base}/public`, {
            params,
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateDataRequestStatus = async (id: string, status: string) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
        const { data } = await axiosInstance.patch(
            `${Base}/status/${id}`,
            { status },
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

export const addDataRequestComment = async (id: string, body: string, accessToken: string) => {
    try {
        const { data } = await axiosInstance.post(
            `${Base}/comment/${id}`,
            { body },
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


export const getDataRequestById = async (id: string) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const { data } = await axiosInstance.get(`${Base}/${id}`, {
            headers: accessToken
                ? {
                    Authorization: `Bearer ${accessToken}`,
                }
                : {},
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getPublicDataRequestCounts = async () => {
    const { data } = await axiosInstance.get("/data-request/public/counts");
    return data;
};
