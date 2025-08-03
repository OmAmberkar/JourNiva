import { axiosInstance } from "../utils/axiosInstance";

export const createJournal = async (journalData) =>{
    try {
        const res = await axiosInstance.post("/journal/create",journalData);
        return res.data;
    } catch (error) {
        console.error("API error",error)
        throw error
    }
}