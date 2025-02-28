import { AxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";
import { CertificateTemplate } from "../schemas/CertificateTemplateSchema";

export const getAllCertificateTemplates = async (): Promise<CertificateTemplate[]> => {
    try {
        const response = await axiosInstance.get('CertificateTemplates/all');
        return response.data;
    }
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error retrieving certificate templates.');
    }
}

export const createCertificateTemplate = async (formData: FormData): Promise<CertificateTemplate> => {
    try {
        const response = await axiosInstance.post('CertificateTemplates/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } 
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error creating certificate template.');
    }
};

export const updateCertificateTemplate = async (formData: FormData): Promise<CertificateTemplate> => {
    try {
        const response = await axiosInstance.put('CertificateTemplates/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } 
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error updating certificate template.');
    }
};

// SOFT DELETES - basically an update where it sets the active field to false
export const deleteCertificateTemplate = async (id: number): Promise<CertificateTemplate> => {
    try {
        const response = await axiosInstance.delete(`CertificateTemplates/delete/${id}`);
        return response.data;
    } 
    catch (error) {
        if(error instanceof AxiosError && error.response) {
            throw new Error(error.response.data);
        }
        throw new Error('Error (soft) deleting certificate template.');
    }
};