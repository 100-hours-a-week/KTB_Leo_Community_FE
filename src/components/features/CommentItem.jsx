import React from 'react';
import styles from './CommentItem.module.css';

const CommentItem = ({ author, content, date, isAuthor, onDelete }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <span className={styles.author}>{author}</span>
                    <span className={styles.date}>{date}</span>
                </div>
                {isAuthor && onDelete && (
                    <button className={styles.deleteBtn} onClick={onDelete}>삭제</button>
                )}
            </div>
            <p className={styles.content}>{content}</p>
        </div>
    );
};

export default CommentItem;
