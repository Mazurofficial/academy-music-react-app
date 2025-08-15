import TextField from '@mui/material/TextField';
import styles from './Input.module.scss';

export type InputProps = {
   label?: string;
   error?: boolean;
   errorText?: string;
   variant?: 'filled' | 'outlined' | 'standard';
   fullWidth?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputCustom({
   label,
   name,
   placeholder = '',
   type = 'text',
   disabled = false,
   value,
   error,
   onChange,
   errorText,
   variant = 'outlined',
   fullWidth = false,
}: InputProps) {
   return (
      <TextField
         label={label}
         variant={variant}
         id={name}
         name={name}
         type={type}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         className={styles.input}
         disabled={disabled}
         error={error}
         helperText={errorText}
         size="medium"
         fullWidth={fullWidth}
      />
   );
}
