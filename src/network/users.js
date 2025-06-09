import { axiosInstance } from "./index.js";

const getUsersList = async (params) => await axiosInstance.get('/api/users', {params});


export {
        getUsersList
    };


