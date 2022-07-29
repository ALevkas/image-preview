import React from 'react';
import { IButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button = (props: IButtonProps): JSX.Element => {
  const {
    children = 'Button',
    className = '',
    onClick = () => {},
    type = 'button',
    disabled = false,
  } = props;
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
