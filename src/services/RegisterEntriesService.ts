import { AxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";
import { RegisterEntry } from "../schemas/RegisterEntrySchema";

export const getAllRegisterEntries = async (): Promise<RegisterEntry[]> => {
    try {
        const response = await axiosInstance.get('RegisterEntries/all');
        return response.data;
    }
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error creating certificate template.');
    }
}