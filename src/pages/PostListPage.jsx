import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import PostCard from '../components/common/PostCard';
import Button from '../components/common/Button';
import styles from './PostListPage.module.css';
import { getPosts } from '../api/posts';

const PostListPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await getPosts();

                if (Array.isArray(data)) {
                    setPosts(data);
                } else if (data.posts && Array.isArray(data.posts)) {
                    setPosts(data.posts);
                } else {
                    console.warn('예상치 못한 데이터 형식:', data);
                    setPosts([]);
                }
            } catch (err) {
                console.error('게시글 로딩 실패:', err);
                setError('게시글을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.introSection}>
                    <h2 className={styles.greeting}>
                        안녕하세요,<br />
                        우당탕탕 커뮤니티 <span className={styles.emphasis}>게시판</span> 입니다.
                    </h2>
                    <div className={styles.writeParams}>
                        <Button onClick={() => navigate('/posts/create')}>게시글 작성</Button>
                    </div>
                </div>

                <div className={styles.postList}>
                    {posts.length > 0 && console.log('First Post Data:', posts[0])}

                    {loading && <div>로딩 중...</div>}
                    {error && <div>{error}</div>}
                    {!loading && !error && posts.length === 0 && <div>게시글이 없습니다.</div>}

                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            content={post.content}
                            likesCount={post.likes_count || post.like_count || post.likes || 0}
                            commentsCount={post.comments_count || post.comment_count || post.comments || 0}
                            viewCount={post.view_count || post.views || post.read_count || 0}
                            date={post.created_at || post.date}
                            author={post.nickname || post.member?.nickname || post.author || `User ${post.member_id}`}
                            authorProfileImage={post.author_profile_image || post.profile_image}
                            articleImage={post.article_image || post.image_url}
                            onClick={() => navigate(`/posts/${post.id}`)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostListPage;
