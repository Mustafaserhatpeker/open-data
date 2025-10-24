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

// ✅ [USER] — Kullanıcının kendi oluşturduğu veri isteklerini getir
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

// ✅ [ORG] — Organizasyona yapılmış tüm veri isteklerini getir
export const getOrganizationDataRequests = async (params?: any, accessToken?: string) => {
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

// ✅ [PUBLIC] — Herkese açık veri istek akışı (authorization gerekmez)
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

// ✅ [ORG] — Organizasyon tarafından durum güncelleme
export const updateDataRequestStatus = async (id: string, status: string, accessToken: string) => {
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

// ✅ [USER or ORG] — Veri isteğine yorum ekle
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

// ✅ [USER or ORG] — Veri isteğini beğen veya beğeniyi kaldır (toggle)
export const toggleDataRequestLike = async (id: string, accessToken: string) => {
    try {
        const { data } = await axiosInstance.post(
            `${Base}/like/${id}`,
            {},
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