import { axiosInstance } from ".";

export const handleGetAllNote = async() => {
    try {
        const response = await axiosInstance.get('/notes/get')
        return response.data
    } catch (error) {
         return { success: false, message: error.message }
    }
}

export const handleCreateNote = async({topic,note,category,image})=>{
    try {
        const response = await axiosInstance.post("/notes/create",{topic,note,category,image})
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        return { success: false, message: errorMessage };
    }
}