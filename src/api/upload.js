const BASE_URL = '/api';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    const url = await response.text();
    return url.replace(/^\"|\"$/g, '');
};
