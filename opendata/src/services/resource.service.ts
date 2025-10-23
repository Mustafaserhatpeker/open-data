import { axiosInstance } from "../lib/axios";

const Base = "/resource";

export const addResource = async (formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const { data } = await axiosInstance.post(`${Base}/add-resource`, formData, {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",

            },
        });

        return data;
    } catch (error: any) {
        console.error("Kaynak eklenirken hata:", error?.response || error);
        throw (
            error?.response?.data?.error ||
            error?.message ||
            "Kaynak yüklenirken bir hata oluştu."
        );
    }
};
