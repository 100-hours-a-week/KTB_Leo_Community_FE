import React from 'react';
import styles from './PostCard.module.css';

const PostCard = ({ title, content, likesCount, commentsCount, viewCount, date, author, authorProfileImage, articleImage, onClick }) => {
    const displayDate = date ? date.split('T')[0] : '';

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    {authorProfileImage ? (
                        <img src={authorProfileImage} alt={author} className={styles.avatarImg} />
                    ) : (
                        <div className={styles.avatarPlaceholder} />
                    )}
                </div>
                <div className={styles.headerText}>
                    <span className={styles.authorName}>{author}</span>
                    <span className={styles.date}>{displayDate}</span>
                </div>
            </div>

            <h3 className={styles.title}>{title}</h3>

            <p className={styles.contentPreview}>
                {content}
            </p>

            {articleImage && (
                <div className={styles.imageContainer}>
                    <img src={articleImage} alt="Post Attachment" className={styles.articleImage} />
                </div>
            )}

            <div className={styles.footer}>
                <div className={styles.statItem}>
                    <span className={styles.icon}>💚</span>
                    <span>{likesCount} Likes</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.icon}>💬</span>
                    <span>{commentsCount} Comments</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.icon}>👁️</span>
                    <span>{viewCount} Views</span>
                </div>
                <div className={styles.shareIcon}>
                    ➔
                </div>
            </div>
        </div>
    );
};

export default PostCard;
