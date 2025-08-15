import styles from './GenreTag.module.scss';

type GenreTagProps = {
   label: string;
   onRemove: () => void;
};

export default function GenreTag({ label, onRemove }: GenreTagProps) {
   return (
      <span onClick={onRemove} className={styles.genreTag}>
         {label}
         <i className="fa fa-times"></i>
      </span>
   );
}
