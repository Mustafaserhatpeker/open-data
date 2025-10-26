import { axiosInstance } from "../lib/axios";

const Base = "/licence";

export const getLicences = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-all-licences`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const addLicence = async (licenceData: { name: string; description: string }) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const { data } = await axiosInstance.post(
            `${Base}/add-licence`,
            licenceData,
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

export const updateLicence = async (
    licenceId: string,
    licenceData: { name: string; description: string }
) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const { data } = await axiosInstance.put(
            `${Base}/update-licence/${licenceId}`,
            licenceData,
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