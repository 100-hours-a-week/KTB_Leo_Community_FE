import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ProfileImageUploader from '../components/features/ProfileImageUploader';
import styles from './SignupPage.module.css';
import { validateEmail, validatePassword, validateNickname } from '../utils/validation';
import { signup } from '../api/auth';
import { uploadImage } from '../api/upload';

const SignupPage = () => {
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nickname, setNickname] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [loading, setLoading] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isEmailValid = validateEmail(email) && !emailError;
        const isPasswordValid = validatePassword(password) && !passwordError;
        const isConfirmValid = password === passwordConfirm && passwordConfirm.length > 0;
        const isNicknameValid = validateNickname(nickname) && nickname.length > 0 && !nicknameError;
        const isImageValid = !!profileImage;

        setIsFormValid(isEmailValid && isPasswordValid && isConfirmValid && isNicknameValid && isImageValid);
    }, [email, password, passwordConfirm, nickname, profileImage, emailError, passwordError, nicknameError]);

    const handleEmailBlur = () => {
        if (!email) setEmailError('*이메일을 입력해주세요.');
        else if (!validateEmail(email)) setEmailError('*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
        else setEmailError('');
    };

    const handlePasswordBlur = () => {
        if (!password) setPasswordError('*비밀번호를 입력해주세요');
        else if (!validatePassword(password)) setPasswordError('*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.');
        else setPasswordError('');
    };

    const handleConfirmBlur = () => {
        if (password !== passwordConfirm) setPasswordConfirmError('*비밀번호가 다릅니다.');
        else if (!passwordConfirm) setPasswordConfirmError('*비밀번호를 한번 더 입력해주세요');
        else setPasswordConfirmError('');
    };

    const handleNicknameBlur = () => {
        if (!nickname) setNicknameError('*닉네임을 입력해주세요.');
        else if (/\s/.test(nickname)) setNicknameError('*띄어쓰기를 없애주세요');
        else if (nickname.length > 10) setNicknameError('*닉네임은 최대 10자 까지 작성 가능합니다.');
        else setNicknameError('');
    };

    const handleSignup = async () => {
        if (!isFormValid || loading) return;

        try {
            setLoading(true);
            let profileImageUrl = null;
            if (profileImage) {
                profileImageUrl = await uploadImage(profileImage);
            }

            await signup({
                email,
                password,
                nickname,
                profile_image: profileImageUrl || '',
            });

            alert('회원가입이 완료되었습니다.');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>

            <div className={styles.formCard}>
                <ProfileImageUploader
                    onImageChange={setProfileImage}
                    helperText={!profileImage ? "* 프로필 사진을 추가해주세요." : ""}
                />

                <Input
                    label="이메일*"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    error={emailError}
                />

                <Input
                    label="비밀번호*"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
                    error={passwordError}
                    helperText={!passwordError ? "* helper text" : null}
                />

                <Input
                    label="비밀번호 확인*"
                    type="password"
                    placeholder="비밀번호를 한번 더 입력하세요"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    onBlur={handleConfirmBlur}
                    error={passwordConfirmError}
                />

                <Input
                    label="닉네임*"
                    placeholder="닉네임을 입력하세요"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={handleNicknameBlur}
                    error={nicknameError}
                />

                <div className={styles.buttonGroup}>
                    <Button fullWidth disabled={!isFormValid || loading} onClick={handleSignup}>
                        회원가입
                    </Button>
                    <div className={styles.loginLink} onClick={() => navigate('/login')}>
                        로그인하러 가기
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
