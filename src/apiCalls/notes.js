import { axiosInstance } from ".";

export const handleGetAllNote = async() => {
    try {
        const response = await axiosInstance.get('/notes/get')
        return response.data
    } catch (error) {
         return { success: false, message: error.message }
    }
}

export const handleCreateNote = async({topic,note,category})=>{
    try {
        const response = await axiosInstance.post("/notes/create",{topic,note,category})
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        return { success: false, message: errorMessage };
    }
}