import { request } from './client';

export const getComments = async (postId) => {
    return request(`/comments?post_id=${postId}`);
};

export const createComment = async (data) => {
    return request('/comments', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateComment = async (commentId, data) => {
    return request(`/comments/${commentId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
};

export const deleteComment = async (commentId) => {
    return request(`/comments/${commentId}`, {
        method: 'DELETE',
    });
};
