import api from './api';

export const getAttendance = async (params = {}) => {
  const response = await api.get('/attendance', { params });
  return response.data;
};

export const getAttendanceById = async (id) => {
  const response = await api.get(`/attendance/${id}`);
  return response.data;
};

export const createAttendance = async (attendance) => {
  const response = await api.post('/attendance', attendance);
  return response.data;
};

export const updateAttendance = async (id, attendance) => {
  const response = await api.put(`/attendance/${id}`, attendance);
  return response.data;
};

export const deleteAttendance = async (id) => {
  await api.delete(`/attendance/${id}`);
};
