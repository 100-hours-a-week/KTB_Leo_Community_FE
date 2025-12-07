export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    if (password.length < 8 || password.length > 20) return false;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    return hasUpper && hasLower && hasNumber && hasSpecial;
};

export const validateNickname = (nickname) => {
    if (!nickname || nickname.length > 10) return false;
    const hasSpace = /\s/.test(nickname);
    return !hasSpace;
};
