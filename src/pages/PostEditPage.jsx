import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import styles from './PostEditPage.module.css';

import { createPost, updatePost, getPost } from '../api/posts';
import { uploadImage } from '../api/upload';

const PostEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [helperText, setHelperText] = useState('*제목, 내용을 모두 작성해주세요.');
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchPost = async () => {
                try {
                    const data = await getPost(id);
                    const post = data.post || data;
                    setTitle(post.title || '');
                    setContent(post.content || '');
                    if (post.article_image) {
                        setImage(post.article_image);
                    }
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                    alert('게시글 정보를 불러오지 못했습니다.');
                    navigate('/posts');
                }
            };
            fetchPost();
        }
    }, [isEditMode, id, navigate]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            return;
        }

        if (submitLoading) return;

        try {
            setSubmitLoading(true);
            let imageUrl = null;

            if (image) {
                if (typeof image === 'string') {
                    imageUrl = image;
                } else {
                    imageUrl = await uploadImage(image);
                }
            }

            const postData = {
                title,
                content,
                article_image_url: imageUrl
            };

            if (isEditMode) {
                await updatePost(id, postData);
                alert('게시글이 수정되었습니다.');
            } else {
                await createPost(postData);
                alert('게시글이 작성되었습니다.');
            }
            navigate('/posts');
        } catch (error) {
            console.error('Save failed:', error);
            alert('게시글 저장에 실패했습니다.');
        } finally {
            setSubmitLoading(false);
        }
    };

    const isFormValid = title.trim().length > 0 && content.trim().length > 0;

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.pageTitle}>{isEditMode ? '게시글 수정' : '게시글 작성'}</h2>

                <div className={styles.formCard}>
                    <Input
                        label="제목"
                        placeholder="제목을 입력해주세요. (최대 26글자)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={26}
                    />

                    <div className={styles.contentArea}>
                        <label className={styles.label}>내용</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="내용을 입력해주세요."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className={styles.fileArea}>
                        <label className={styles.label}>이미지</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />
                        {image && (
                            <span className={styles.fileName}>
                                {typeof image === 'string' ? '기존 이미지 유지 중' : image.name}
                            </span>
                        )}
                    </div>

                    <p className={styles.helperText}>{helperText}</p>

                    <div className={styles.buttonGroup}>
                        <Button fullWidth disabled={!isFormValid || submitLoading} onClick={handleSubmit}>
                            {submitLoading ? '처리중...' : '완료'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostEditPage;
