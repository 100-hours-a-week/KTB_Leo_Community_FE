import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import styles from './LoginPage.module.css';
import { validateEmail, validatePassword } from '../utils/validation';
import { login } from '../api/auth';

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = email.length > 0 && password.length > 0;

        setIsFormValid(isEmailValid && password.length >= 1);
    }, [email, password]);

    const handleEmailBlur = () => {
        if (!email) {
            setEmailError('이메일을 입력해주세요.');
        } else if (!validateEmail(email)) {
            setEmailError('올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordError('비밀번호를 입력해주세요.');
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = async () => {
        if (!isFormValid || loading) return;

        try {
            setLoading(true);
            const data = await login(email, password);
            console.log('로그인 성공:', data);

            localStorage.setItem('user', JSON.stringify(data));

            const token = data.token || data.accessToken || data.access_token;
            if (token) {
                localStorage.setItem('accessToken', token);
            } else {
                console.warn('Login response does not contain a token:', data);
            }

            navigate('/posts');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>우당탕탕 커뮤니티</h1>

            <div className={styles.formCard}>
                <h2 className={styles.loginTitle}>로그인</h2>

                <Input
                    label="이메일"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    error={emailError}
                />

                <Input
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
                    error={passwordError}
                    helperText={!passwordError ? "" : null}
                />

                <div className={styles.buttonGroup}>
                    <Button
                        fullWidth
                        disabled={!isFormValid || loading}
                        onClick={handleLogin}
                    >
                        로그인
                    </Button>
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => navigate('/signup')}
                    >
                        회원가입
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
