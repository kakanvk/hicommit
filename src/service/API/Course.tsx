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

export { getCourses, createCourse, getCreatedCourses };