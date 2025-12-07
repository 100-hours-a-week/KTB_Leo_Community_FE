import { request } from './client';

export const getPosts = async (skip = 0, limit = 100) => {
    return request(`/posts?skip=${skip}&limit=${limit}`);
};

export const getPost = async (id) => {
    return request(`/posts/${id}`);
};

export const createPost = async (postData) => {
    return request('/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
    });
};

export const updatePost = async (id, postData) => {
    return request(`/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(postData),
    });
};

export const deletePost = async (id) => {
    return request(`/posts/${id}`, {
        method: 'DELETE',
    });
};

export const likePost = async (id) => {
    return request(`/posts/${id}/like`, {
        method: 'POST',
    });
};
