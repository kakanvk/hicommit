import { axiosInstance } from "./AxiosConfig";

const getMySubmissions = async () => {
    try {
        const response = await axiosInstance.get(`/submissions/me`);
        return response.data;
    } catch (error) {
        console.error('Error getting submissions:', error);
        throw error;
    }
}

const getSubmissionsByProblemSlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`/submissions/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error getting submissions:', error);
        throw error;
    }
}

const getMySubmissionsByProblemSlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`/submissions/me/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error getting submissions:', error);
        throw error;
    }
}

export { 
    getMySubmissions, 
    getSubmissionsByProblemSlug, 
    getMySubmissionsByProblemSlug 
};