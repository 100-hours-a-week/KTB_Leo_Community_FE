import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, disabled, variant = 'primary', fullWidth = false, type = 'button' }) => {
    return (
        <button
            type={type}
            className={`
        ${styles.button} 
        ${styles[variant]} 
        ${fullWidth ? styles.fullWidth : ''}
        ${disabled ? styles.disabled : ''}
      `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
