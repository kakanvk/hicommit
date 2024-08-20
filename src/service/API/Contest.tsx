
import { axiosInstance } from "./AxiosConfig";

const getContests = async () => {
    try {
        const response = await axiosInstance.get(`/contests/list`);
        return response.data;
    } catch (error) {
        console.error('Error getting contests:', error);
        throw error;
    }
}

const getContestByID = async (contestID: string) => {
    try {
        const response = await axiosInstance.get(`/contests/${contestID}`);
        return response.data;
    } catch (error) {
        console.error('Error getting contests:', error);
        throw error;
    }
}

const getContestDescriptionByID = async (contestID: string) => {
    try {
        const response = await axiosInstance.get(`/contests/${contestID}/description`);
        return response.data;
    } catch (error) {
        console.error('Error getting contests:', error);
        throw error;
    }
}

const getContestsForAdmin = async () => {
    try {
        const response = await axiosInstance.get(`/admin/contests/list`);
        return response.data;
    } catch (error) {
        console.error('Error getting contests:', error);
        throw error;
    }
}

const createContest = async (contest: any) => {
    try {
        const response = await axiosInstance.post(`/admin/contests/create`, contest);
        return response.data;
    } catch (error) {
        console.error('Error getting contests:', error);
        throw error;
    }
}

const togglePublishContestByID = async (contestID: string) => {
    try {
        const response = await axiosInstance.put(`/admin/contests/${contestID}/publish`);
        return response.data;
    } catch (error) {
        console.error('Error getting contests:', error);
        throw error;
    }
}

const updatePublicContestByID = async (contestID: string, status: any) => {
    try {
        const response = await axiosInstance.put(`/admin/contests/${contestID}/public`, {public: status});
        return response.data;
    } catch (error) {
        console.error('Error getting contests:', error);
        throw error;
    }
}

export {
    getContests,
    getContestByID,
    getContestDescriptionByID,
    createContest,
    getContestsForAdmin,
    togglePublishContestByID,
    updatePublicContestByID
};