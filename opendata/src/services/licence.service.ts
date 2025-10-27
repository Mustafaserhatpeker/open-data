import { axiosInstance } from "../lib/axios";

const Base = "/licence";

export const getLicences = async () => {
    const { data } = await axiosInstance.get(`${Base}/get-all-licences`);
    return data;
};

export const addLicence = async (licenceData: { licenceName: string; licenceUrl: string }) => {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.post(
        `${Base}/create-licence`,
        licenceData,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return data;
};

export const updateLicence = async (
    licenceId: string,
    licenceData: { licenceName: string; licenceUrl: string }
) => {
    const accessToken = localStorage.getItem("accessToken");
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
};
