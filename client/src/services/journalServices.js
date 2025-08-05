import { axiosInstance } from "../api/axiosInstance";
import { toast } from "sonner";

export const createJournal = async (journalData) =>{
    try {
        const res = await axiosInstance.post("/journal/create",journalData);
        return res.data;
    } catch (error) {
        console.error("Journal creation failed", error);
        toast.error("API error",error)
        throw error
    }
}