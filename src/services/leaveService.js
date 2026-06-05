import api from './api';

export const getLeaveRequests = async () => {
  const response = await api.get('/leaveRequests');
  return response.data;
};

export const getLeaveRequestById = async (id) => {
  const response = await api.get(`/leaveRequests/${id}`);
  return response.data;
};

export const createLeaveRequest = async (leaveRequest) => {
  const response = await api.post('/leaveRequests', leaveRequest);
  return response.data;
};

export const updateLeaveRequest = async (id, leaveRequest) => {
  const response = await api.put(`/leaveRequests/${id}`, leaveRequest);
  return response.data;
};

export const deleteLeaveRequest = async (id) => {
  await api.delete(`/leaveRequests/${id}`);
};
