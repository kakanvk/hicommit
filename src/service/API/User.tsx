import { axiosInstance } from "./AxiosConfig";

const toggleFavouriteCourse = async (courseId: string) => {
    try {
        const response = await axiosInstance.put(`/users/favourite_course/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error toggling favourite course:', error);
        throw error;
    }
}

export { toggleFavouriteCourse };