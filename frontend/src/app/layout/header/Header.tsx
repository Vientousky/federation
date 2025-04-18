'use client'

import {useEffect, useRef} from 'react';
import Nav from './Nav';
import Action from './Action';
import Search from './Search';
import Image from 'next/image';
import styles from './index.module.css'

const navLinks = [
    {name:"Inicio", href:"/"},
    {name:"Ranking", href:"/ranking"},
    {name:"Record", href:"/record"},
    {name:"Eventos", href:"/eventos"},
    {name:"Licencias Provincial", href:"/licencia-provincial"},
]

const Header: React.FC = () => {

    const headerRef = useRef<HTMLElement>(null);
    const lastScrollYRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const header = headerRef.current;
    
            if (!header) return;
    
            if (currentY > lastScrollYRef.current) {
                header.classList.add(styles.headerCollapsed);
                header.classList.remove(styles.headerExpanded);
            } else {
                header.classList.remove(styles.headerCollapsed);
                header.classList.add(styles.headerExpanded);
            }
    
            lastScrollYRef.current = currentY;
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    

    return (
        <header ref={headerRef} className={`${styles.header} ${styles.headerExpanded}`}>

            <section className={styles.headerTop}>
                <figure className={styles.logo}>
                    <Image src="/img/logo.jpg" alt="" width={65} height={45}  />
                </figure>

                <Action/>

            </section>

            <section className={styles.headerBottom}>

            <Nav links={navLinks} />

            <Search/>

            </section>

        </header>
    );
};

export default Header;