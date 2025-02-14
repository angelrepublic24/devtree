import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_URL_API
})

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default Api;