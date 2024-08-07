import { axiosInstance } from "./AxiosConfig";

const getCourses = async () => {
    try {
        const response = await axiosInstance.get(`/courses/list`);
        return response.data;
    } catch (error) {
        console.error('Error getting courses:', error);
        throw error;
    }
}

const createCourse = async (course: any) => {
    try {
        const response = await axiosInstance.post(`/courses/create`, course);
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
}

const getCreatedCourses = async () => {
    try {
        const response = await axiosInstance.get(`/courses/created`);
        return response.data;
    } catch (error) {
        console.error('Error getting my courses:', error);
        throw error;
    }
}

const getCourseById = async (courseId: string) => {
    try {
        const response = await axiosInstance.get(`/courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting course:', error);
        throw error;
    }
}

// For ADMIN
const getCourseByIDForAdmin = async (courseId: string) => {
    try {
        const response = await axiosInstance.get(`/courses/admin/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting course:', error);
        throw error;
    }
}

const getJoinedCourses = async () => {
    try {
        const response = await axiosInstance.get(`/courses/joined`);
        return response.data;
    } catch (error) {
        console.error('Error getting joined courses:', error);
        throw error;
    }
}

const joinToCourse = async (courseId: string, join_key: string) => {
    try {
        const response = await axiosInstance.post(`/courses/join/${courseId}`, { join_key });
        return response.data;
    } catch (error) {
        console.error('Error joining course:', error);
        throw error;
    }
}

export {
    getCourses,
    createCourse,
    getCreatedCourses,
    getCourseById,
    joinToCourse,
    getJoinedCourses,
    getCourseByIDForAdmin
};