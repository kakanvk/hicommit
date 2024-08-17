import { da } from "date-fns/locale";
import { axiosInstance } from "./AxiosConfig";

const getProblems = async () => {
    try {
        const response = await axiosInstance.get(`/problems/list`);
        return response.data;
    } catch (error) {
        console.error('Error getting problems:', error);
        throw error;
    }
}

const getProblemByIDorSlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`/problems/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error getting problem:', error);
        throw error;
    }
}

const getProblemByIDForAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/problems/admin/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting problem:', error);
        throw error;
    }
}

const createProblem = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/problems/create`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating problem:', error);
        throw error;
    }
}

const updateProblem = async (id: string, data: any) => {
    try {
        const response = await axiosInstance.put(`/problems/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating problem:', error);
        throw error;
    }
}

const deleteProblemByID = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/problems/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting problem:', error);
        throw error;
    }
}

export {
    getProblems,
    createProblem,
    getProblemByIDorSlug,
    updateProblem,
    deleteProblemByID,
    getProblemByIDForAdmin
};