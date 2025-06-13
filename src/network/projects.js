import { axiosInstance } from "./index.js";
 
const getProjectsList = async (params) => await axiosInstance.get('/api/projects', {params});

const deleteProject = async (id) => await axiosInstance.delete(`/api/projects/${id}`);

export { getProjectsList, deleteProject };