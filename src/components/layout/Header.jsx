import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo} onClick={() => navigate('/posts')}>
                    우당탕탕 커뮤니티
                </h1>

                <div className={styles.profileContainer}>
                    <div className={styles.profileIcon} onClick={toggleMenu}>
                        <div className={styles.avatarPlaceholder} />
                    </div>

                    {isMenuOpen && (
                        <div className={styles.dropdown}>
                            <button onClick={() => navigate('/profile/edit')}>회원정보수정</button>
                            <button onClick={() => navigate('/profile/password')}>비밀번호수정</button>
                            <button onClick={() => navigate('/login')} className={styles.logoutBtn}>로그아웃</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
