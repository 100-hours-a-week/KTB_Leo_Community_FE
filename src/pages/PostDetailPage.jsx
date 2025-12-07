import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import CommentItem from '../components/features/CommentItem';
import styles from './PostDetailPage.module.css';
import { getPost, deletePost, likePost } from '../api/posts';
import { getComments, createComment, deleteComment } from '../api/comments';

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState('');
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                setLoading(true);

                const postData = await getPost(id);
                if (postData && postData.id) {
                    setPost(postData);
                } else if (postData && postData.post) {
                    setPost(postData.post);
                } else {
                    console.warn('데이터 형식이 다릅니다:', postData);
                    setPost(postData);
                }

                try {
                    const commentsData = await getComments(id);
                    setComments(Array.isArray(commentsData) ? commentsData : []);
                } catch (commentErr) {
                    console.warn('댓글 로딩 실패(무시됨):', commentErr);
                    setComments([]);
                }

            } catch (err) {
                console.error('게시글 로딩 실패:', err);
                setError('게시글을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [id]);

    const handleLike = async () => {
        if (submitting) return;
        try {
            setSubmitting(true);
            await likePost(id);

            setIsLiked(prev => !prev);
            setPost(prev => ({
                ...prev,
                likes_count: isLiked
                    ? Math.max(0, (prev.likes_count || 0) - 1)
                    : (prev.likes_count || 0) + 1
            }));
        } catch (err) {
            console.error('좋아요 실패:', err);
            alert('좋아요 반영에 실패했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim() || submitting) return;

        try {
            setSubmitting(true);
            await createComment({
                post_id: parseInt(id),
                content: commentText
            });

            const newComments = await getComments(id);
            if (Array.isArray(newComments)) {
                setComments(newComments);
            } else if (newComments && Array.isArray(newComments.comments)) {
                setComments(newComments.comments);
            } else {
                console.warn('댓글 갱신 실패: 올바르지 않은 데이터', newComments);
            }
            setCommentText('');
        } catch (err) {
            console.error('댓글 작성 실패:', err);
            alert('댓글 작성에 실패했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (submitting) return;
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

        try {
            await deleteComment(commentId);
            const newComments = await getComments(id);
            setComments(Array.isArray(newComments) ? newComments : []);
        } catch (err) {
            console.error('댓글 삭제 실패:', err);
            alert('댓글 삭제에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        if (submitting) return;
        if (!window.confirm('정말 게시글을 삭제하시겠습니까?')) return;

        try {
            setSubmitting(true);
            await deletePost(id);
            alert('게시글이 삭제되었습니다.');
            navigate('/posts');
        } catch (err) {
            console.error('삭제 실패:', err);
            alert('게시글 삭제에 실패했습니다.');
            setSubmitting(false);
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

    const isPostAuthor = currentUser && (post.member_id === currentUser.id);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.backButton}>
                    <Button variant="secondary" onClick={() => navigate(-1)}>{'<'} 뒤로가기</Button>
                </div>

                <article className={styles.postCard}>
                    <div className={styles.postHeader}>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>
                            <div className={styles.authorInfo}>
                                <div className={styles.avatar}></div>
                                <span>{post.nickname || post.member?.nickname || post.author || `회원 ${post.member_id}`}</span>
                            </div>
                            <span className={styles.date}>{post.created_at ? post.created_at.substring(0, 10) : ''}</span>
                        </div>
                        {isPostAuthor && (
                            <div className={styles.actions}>
                                <Button variant="secondary" onClick={() => navigate(`/posts/${id}/edit`)}>수정</Button>
                                <Button variant="secondary" onClick={handleDelete} disabled={submitting}>삭제</Button>
                            </div>
                        )}
                    </div>

                    <div className={styles.divider} />

                    {post.article_image && (
                        <div className={styles.imageContainer}>
                            <img src={post.article_image} alt="Post content" />
                        </div>
                    )}

                    <div className={styles.content}>
                        {post.content}
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statsLeft}>
                            <div className={styles.statItem}>
                                <span className={styles.icon}>👁️</span>
                                <span>{post.view_count || 0} 조회</span>
                            </div>
                            <button
                                className={styles.likeBtn}
                                onClick={handleLike}
                                disabled={submitting}
                                style={{
                                    backgroundColor: isLiked ? '#E8F5E9' : 'white',
                                    borderColor: isLiked ? 'var(--color-primary)' : '#E0E0E0'
                                }}
                            >
                                <span className={styles.icon}>{isLiked ? '❤️' : '💚'}</span>
                                <span>{post.likes_count || 0} 좋아요</span>
                            </button>
                        </div>
                    </div>
                </article>

                <section className={styles.commentSection}>
                    <div className={styles.commentInputArea}>
                        <textarea
                            className={styles.commentInput}
                            placeholder="댓글을 남겨주세요."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className={styles.commentButtonWrapper}>
                            <Button onClick={handleCommentSubmit} disabled={!commentText.trim() || submitting}>등록</Button>
                        </div>
                    </div>

                    <div className={styles.commentList}>
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                author={comment.member?.nickname || '익명'}
                                content={comment.content}
                                date={comment.created_at ? comment.created_at.substring(0, 10) : ''}
                                isAuthor={currentUser && (comment.member?.id === currentUser.id)}
                                onDelete={() => handleCommentDelete(comment.id)}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default PostDetailPage;
