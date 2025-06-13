import { axiosInstance } from "./index.js";

const getProperties = async (payload) => await axiosInstance.post('/api/projects/list-properties', payload);

const getPropertyById = async (id) => await axiosInstance.get(`/api/projects/property/${id}`);

const deleteProperty = async (id) => await axiosInstance.delete(`/api/projects/property/${id}`);

export { getProperties, getPropertyById, deleteProperty };