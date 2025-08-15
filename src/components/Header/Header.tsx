import AddTrackBtn from './AddTrackBtn/AddTrackBtn';
import styles from './Header.module.scss';
import logo from '@/assets/logo_tunee.svg';
import logoMobile from '@/assets/logo_tunee_mobile.svg';

export default function Header() {
   return (
      <header className={styles.header}>
         <a href="/">
            <img
               src={logo}
               srcSet={`${logoMobile} 480w, ${logo} 800w`}
               sizes="(max-width: 480px) 138px, 208px"
               alt="logo"
            />
         </a>
         <AddTrackBtn />
      </header>
   );
}
