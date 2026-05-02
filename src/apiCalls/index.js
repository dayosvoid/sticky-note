import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
        ? import.meta.env.VITE_API_URL + '/api'
        : '/api' // fallback to proxy during development
})

axiosInstance.interceptors.request.use(

)

