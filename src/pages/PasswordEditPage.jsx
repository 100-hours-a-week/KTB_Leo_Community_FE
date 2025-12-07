import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import styles from './PasswordEditPage.module.css';
import { validatePassword } from '../utils/validation';
import { updatePassword } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const PasswordEditPage = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [oldPasswordError, setOldPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const handleOldPasswordBlur = () => {
        if (!oldPassword) setOldPasswordError('*현재 비밀번호를 입력해주세요');
        else setOldPasswordError('');
    };

    const handlePasswordBlur = () => {
        if (!newPassword) setPasswordError('*비밀번호를 입력해주세요');
        else if (!validatePassword(newPassword)) setPasswordError('*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.');
        else setPasswordError('');
    };

    const handleConfirmBlur = () => {
        if (newPassword !== passwordConfirm) setConfirmError('*비밀번호가 다릅니다.');
        else if (!passwordConfirm) setConfirmError('*비밀번호를 한번 더 입력해주세요');
        else setConfirmError('');
    };

    const isFormValid = oldPassword && validatePassword(newPassword) && newPassword === passwordConfirm;

    const handleSubmit = async () => {
        if (!isFormValid) return;

        try {
            await updatePassword({
                old_password: oldPassword,
                new_password: newPassword
            });
            alert('비밀번호가 수정되었습니다.');
            navigate('/posts');
        } catch (error) {
            console.error('Password update failed:', error);
            alert('비밀번호 수정에 실패했습니다. 현재 비밀번호를 확인해주세요.');
        }
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.pageTitle}>비밀번호 수정</h2>

                <div className={styles.card}>
                    <Input
                        label="현재 비밀번호"
                        type="password"
                        placeholder="현재 비밀번호를 입력하세요"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        onBlur={handleOldPasswordBlur}
                        error={oldPasswordError}
                    />

                    <Input
                        label="새 비밀번호"
                        type="password"
                        placeholder="새 비밀번호를 입력하세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={handlePasswordBlur}
                        error={passwordError}
                    />

                    <Input
                        label="새 비밀번호 확인"
                        type="password"
                        placeholder="새 비밀번호를 한번 더 입력하세요"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onBlur={handleConfirmBlur}
                        error={confirmError}
                    />

                    <div className={styles.buttonGroup}>
                        <Button fullWidth disabled={!isFormValid} onClick={handleSubmit}>
                            수정하기
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordEditPage;
