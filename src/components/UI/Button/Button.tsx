import styles from './Button.module.scss';
import Button from '@mui/material/Button';
import type { ReactNode } from 'react';

export type ButtonProps = {
   variant?: 'contained' | 'outlined' | 'text';
   loading?: boolean;
   startIcon?: ReactNode;
   color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
   dataTestId?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonCustom({
   children,
   onClick,
   type = 'button',
   variant = 'contained',
   disabled = false,
   className = '',
   title = '',
   loading = false,
   startIcon = null,
   color = 'primary',
   dataTestId = '',
}: ButtonProps) {
   return (
      <Button
         onClick={onClick}
         type={type}
         disabled={disabled}
         className={`${styles.button} ${className}}`}
         title={title}
         variant={variant}
         loading={loading}
         loadingPosition="start"
         startIcon={startIcon}
         color={color}
         data-testid={dataTestId}
      >
         {children}
      </Button>
   );
}
