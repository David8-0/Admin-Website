import { axiosInstance } from "./index.js";

const getPropertiesList = async (params) => await axiosInstance.get('/api/projects/list-properties', {params});

const addProperty = async (payload) => await axiosInstance.post('/api/properties', payload);

const deleteProperty = async (id) => await axiosInstance.delete(`/api/properties/${id}`);

export { getPropertiesList, addProperty, deleteProperty };