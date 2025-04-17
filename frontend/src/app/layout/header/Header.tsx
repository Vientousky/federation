import React from 'react';
import Action from './Action';
import Nav from './nav';
import style from './index.module.css'

const Header: React.FC = () => {
    return (
        <header className="header">

            <section>
                <figure>

                </figure>

                <Action/>

            </section>

            <section>

                <Nav/>

            </section>

        </header>
    );
};

export default Header;