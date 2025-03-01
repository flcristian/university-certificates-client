import { AxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";
import { AcceptRegisterEntryRequest, CreateRegisterEntryRequest, DenyRegisterEntryRequest, RegisterEntry } from "../schemas/RegisterEntrySchema";

export const getAllRegisterEntries = async (): Promise<RegisterEntry[]> => {
    try {
        const response = await axiosInstance.get('RegisterEntries/all');
        return response.data;
    }
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error retrieving register entries.');
    }
}

export const createRegisterEntry = async (request: CreateRegisterEntryRequest): Promise<RegisterEntry> => {
    try {
        const response = await axiosInstance.post('RegisterEntries/create', request, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return response.data;
    }
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error creating register entry.');
    }
}

export const updateRegisterEntry = async (request: DenyRegisterEntryRequest | AcceptRegisterEntryRequest): Promise<RegisterEntry> => {
    try {
        const response = await axiosInstance.put('RegisterEntries/update', request, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return response.data;
    }
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error updating register entry.');
    }
}