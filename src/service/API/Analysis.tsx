import { axiosInstance } from "./AxiosConfig";

const getAnalysis = async () => {
    try {
        const response = await axiosInstance.get('/admin/analysis/overview');
        return response.data;
    } catch (error) {
        console.error('Error getting analysis:', error);
        throw error;
    }
}

export {
    getAnalysis
}