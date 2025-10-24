import { axiosInstance } from "../lib/axios"

const Base = "/organization"

// 🔹 Tüm kuruluşları getir
export const getOrganizations = async () => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-all-organizations`)
        return data
    } catch (error) {
        throw error
    }
}

// 🔹 ID’ye göre kuruluş getir
export const getOrganizationById = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`${Base}/get-organization/${id}`)
        return data
    } catch (error) {
        throw error
    }
}

// 🔹 Yeni kuruluş oluştur (backend JSON bekliyor, FormData değil!)
export const createOrganization = async (payload: {
    organizationName: string
    description: string
    websiteUrl: string
    contactEmail: string
    logoUrl: string
}) => {
    const accessToken = localStorage.getItem("accessToken")
    try {
        const { data } = await axiosInstance.post(
            `${Base}/create-organization`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        )
        return data
    } catch (error) {
        throw error
    }
}

export const updateOrganization = async (
    id: string,
    payload: {
        organizationName: string
        description: string
        websiteUrl: string
        contactEmail: string
        logoUrl: string
    }
) => {
    const accessToken = localStorage.getItem("accessToken")
    try {
        const { data } = await axiosInstance.put(
            `${Base}/update-organization/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        )
        return data
    } catch (error) {
        throw error
    }
}

// 🔹 Giriş yapan kullanıcının kuruluşlarını getir
export const getMyOrganizations = async () => {
    const accessToken = localStorage.getItem("accessToken")
    try {
        const { data } = await axiosInstance.get(`${Base}/get-my-organizations`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return data
    } catch (error) {
        throw error
    }
}
