import FormControl from '@mui/material/FormControl';
import styles from './Select.module.scss';
import InputLabel from '@mui/material/InputLabel';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export type SelectOption = {
   label: string;
   value: string;
};

export type SelectCustomProps = {
   label?: string;
   name: string;
   placeholder?: string;
   className?: string;
   disabled?: boolean;
   options: SelectOption[];
   value: string;
   onChange: (value: string) => void;
   dataTestId?: string;
};

const ITEM_HEIGHT = 52;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

export default function SelectCustom({
   label,
   name,
   //placeholder = 'Select...',
   //className = '',
   disabled = false,
   options,
   value,
   onChange,
   dataTestId,
}: SelectCustomProps) {
   const handleChange = (e: SelectChangeEvent) => {
      onChange(e.target.value);
   };

   return (
      <FormControl fullWidth className={styles.select}>
         <InputLabel id={name}>{label}</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id={name}
            value={value}
            name={name}
            multiple={false}
            onChange={handleChange}
            label={label}
            disabled={disabled}
            size="medium"
            MenuProps={MenuProps}
            data-testid={dataTestId}
         >
            {options.map((opt) => (
               <MenuItem key={opt.value} value={opt.value} role="option">
                  {opt.label}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
}
