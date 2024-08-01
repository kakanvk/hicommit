import { axiosInstance } from "./AxiosConfig";

const getPosts = async () => {
    try {
        const response = await axiosInstance.get(`/posts/list`);
        return response.data;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
}

const getPostBySlug = async (slug: number) => {
    try {
        const response = await axiosInstance.get(`/posts/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error getting post:', error);
        throw error;
    }
}

const createPost = async (props: any) => {

    const {
        title,
        description,
        slug,
        tags,
        content,
        thumbnail
    } = props;

    try {
        const response = await axiosInstance.post(`/posts/create`, {
            title,
            description,
            slug,
            tags,
            content,
            thumbnail
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export { getPosts, createPost, getPostBySlug };