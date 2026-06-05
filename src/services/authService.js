import api from './api';

const SESSION_USER_KEY = 'hrm_current_user';

const readSessionUser = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const writeSessionUser = (user) => {
  sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
};

const clearSessionUser = () => {
  sessionStorage.removeItem(SESSION_USER_KEY);
};

let currentUser = readSessionUser();

export const login = async (username, password) => {
  const response = await api.get('/users', {
    params: { username, password },
  });
  const user = response.data[0] || null;

  if (!user) {
    return null;
  }

  currentUser = user;
  writeSessionUser(user);
  return user;
};

export const logout = () => {
  currentUser = null;
  clearSessionUser();
};

export const getCurrentUser = () => currentUser;

export const updateCurrentUser = async (updates) => {
  if (!currentUser?.id) {
    throw new Error('Người dùng chưa đăng nhập.');
  }

  const response = await api.patch(`/users/${currentUser.id}`, updates);
  currentUser = response.data;
  writeSessionUser(currentUser);
  return currentUser;
};

export const changePassword = async (currentPassword, nextPassword) => {
  if (!currentUser?.id) {
    throw new Error('Người dùng chưa đăng nhập.');
  }

  if (currentUser.password !== currentPassword) {
    throw new Error('Mật khẩu hiện tại không đúng');
  }

  return updateCurrentUser({ password: nextPassword });
};
