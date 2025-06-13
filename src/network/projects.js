import { axiosInstance } from "./index.js";
 
const getProjectsList = async (params) => await axiosInstance.get('/api/projects', {params});

export { getProjectsList };