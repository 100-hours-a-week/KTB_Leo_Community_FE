import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ProfileImageUploader from '../components/features/ProfileImageUploader';
import styles from './ProfileEditPage.module.css';
import { validateNickname } from '../utils/validation';
import { getMe, updateProfile, withdraw } from '../api/auth';
import { uploadImage } from '../api/upload';

const ProfileEditPage = () => {
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const [email, setEmail] = useState(currentUser.email || '');
    const [nickname, setNickname] = useState(currentUser.nickname || '');
    const [profileImage, setProfileImage] = useState(null);
    const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(currentUser.profile_image || '');
    const [loading, setLoading] = useState(true);

    const [nicknameError, setNicknameError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                setEmail(data.email);
                setNickname(data.nickname);
                if (data.profile_image) {
                    setCurrentProfileImageUrl(data.profile_image);
                }

                localStorage.setItem('user', JSON.stringify(data));
            } catch (error) {
                console.error('Failed to fetch user:', error);
                alert('회원 정보를 불러오는데 실패했습니다.');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleNicknameBlur = () => {
        if (!nickname) {
            setNicknameError('*닉네임을 입력해주세요.');
        } else if (/\s/.test(nickname)) {
            setNicknameError('*띄어쓰기를 없애주세요');
        } else if (nickname.length > 10) {
            setNicknameError('*닉네임은 최대 10자 까지 작성 가능합니다.');
        } else {
            setNicknameError('');
        }
    };

    const handleUpdate = async () => {
        if (nicknameError || !nickname) return;

        try {
            let imageUrl = currentProfileImageUrl;

            if (profileImage instanceof File) {
                imageUrl = await uploadImage(profileImage);
            }

            await updateProfile({
                nickname,
                profile_image: imageUrl
            });

            alert('수정 완료되었습니다.');

        } catch (error) {
            console.error('Update failed:', error);
            alert('회원정보 수정에 실패했습니다.');
        }
    };

    const handleWithdrawal = async () => {
        const confirm = window.confirm("회원탈퇴 하시겠습니까?\n작성된 게시글과 댓글은 삭제됩니다.");
        if (confirm) {
            try {
                await withdraw();
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                alert('회원탈퇴가 완료되었습니다.');
                navigate('/login');
            } catch (error) {
                console.error('Withdrawal failed:', error);
                alert('회원탈퇴에 실패했습니다.');
            }
        }
    };


    if (loading) return <div>로딩 중...</div>;
    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.pageTitle}>회원정보수정</h2>

                <div className={styles.card}>
                    <ProfileImageUploader
                        onImageChange={setProfileImage}
                        previewUrl={currentProfileImageUrl}
                    />

                    <div className={styles.emailDisplay}>
                        <span className={styles.label}>이메일</span>
                        <span className={styles.email}>{email}</span>
                    </div>

                    <Input
                        label="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        onBlur={handleNicknameBlur}
                        error={nicknameError}
                    />

                    <div className={styles.buttonGroup}>
                        <Button fullWidth onClick={handleUpdate}>수정하기</Button>
                        <button className={styles.withdrawBtn} onClick={handleWithdrawal}>회원 탈퇴</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileEditPage;
