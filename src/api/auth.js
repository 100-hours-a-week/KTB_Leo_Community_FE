import { request } from './client';

export const login = async (email, password) => {
    return request('/members/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

export const signup = async (userData) => {
    return request('/members/sign-up', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

export const logout = async () => {
    return request('/members/logout', {
        method: 'POST',
    });
};

export const updateProfile = async (userData) => {
    return request('/members/me', {
        method: 'PATCH',
        body: JSON.stringify(userData),
    });
};

export const getMe = async () => {
    return request('/members/me');
};

export const updatePassword = async (data) => {
    return request('/members/password', {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
};

export const withdraw = async () => {
    return request('/members/me', {
        method: 'DELETE',
    });
};
