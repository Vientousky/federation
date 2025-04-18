import styles from './index.module.css'

type navLinks = {
    name: string;
    href: string;
  };
  
  export default function Nav({ links }: { links: navLinks[] }) {
    return (
      <nav className={styles.nav} >
        {links.map((link) => (
          <a key={link.href} href={link.href} className={styles.navLinks} >
            {link.name}
          </a>
        ))}
      </nav>
    );
}