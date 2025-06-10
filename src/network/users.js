import { axiosInstance } from "./index.js";

const getUsersList = async (params) => await axiosInstance.get('/api/users', {params});


const deleteUser = async (id) => await axiosInstance.delete(`/api/users/${id}`);

export {
        getUsersList,
        deleteUser
    };


