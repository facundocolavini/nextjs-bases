import {ActiveLink} from "./ActiveLink";
import styles from "./Navbar.module.css";
import { menuItems } from "./constants/menuItems.constants";

interface NavbarItem {
  text: string;
  href: string;
}
const Navbar = () => {
  return (
    <nav className={styles['menu-conteiner']}>
      {
       menuItems.map(({text,href}: NavbarItem ) => {
        return <ActiveLink key={href} text={text} hrefPath={href}/>
      }  
      )}
     
    </nav>
  );
};
export default Navbar;
