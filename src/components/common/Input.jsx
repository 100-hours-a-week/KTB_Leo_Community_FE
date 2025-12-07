import React from 'react';
import styles from './Input.module.css';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    helperText,
    required = false,
    readOnly = false,
    ...props
}) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label className={styles.label}>{label}{required && '*'}</label>}
            <input
                className={`${styles.input} ${error ? styles.errorInput : ''}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                readOnly={readOnly}
                {...props}
            />
            {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;
