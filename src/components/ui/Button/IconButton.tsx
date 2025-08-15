import styles from './Button.module.scss';
import IconButton from '@mui/material/IconButton';

type IconButtonProps = {
   ariaLabel: string;
   loading?: boolean;
   size?: 'small' | 'medium' | 'large';
   color?:
      | 'primary'
      | 'inherit'
      | 'default'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning';
   dataTestId?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButtonCustom({
   children,
   onClick,
   type = 'button',
   disabled = false,
   className = '',
   ariaLabel = '',
   loading = false,
   size = 'small',
   color = 'primary',
   dataTestId = '',
}: IconButtonProps) {
   return (
      <IconButton
         onClick={onClick}
         type={type}
         disabled={disabled}
         className={`${styles.iconButton} ${className}}`}
         aria-label={ariaLabel || 'button'}
         loading={loading}
         size={size}
         color={color}
         data-testid={dataTestId}
      >
         {children}
      </IconButton>
   );
}
