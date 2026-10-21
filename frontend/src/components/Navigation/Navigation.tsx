import {NavLink} from "react-router";
import clsx from "clsx";

import styles from './Navigation.module.css'
import {ArrowRightLeft, Info, List} from "lucide-react";


export const Navigation = () => {
    return (
        <nav>
            <ul className={styles.navList}>
                <li>
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            clsx(styles.navLink, {
                                [styles.navLinkActive]: isActive,
                            })
                        }
                    >
                        <ArrowRightLeft size={16}/>
                        <span>Конвертер</span>
                    </NavLink>
                </li>
                <li>

                    <NavLink
                        to="/rates"

                        className={({isActive}) =>
                            clsx(styles.navLink, {
                                [styles.navLinkActive]: isActive,
                            })
                        }
                    >
                        <List size={16}/>
                        <span> Курсы валют</span>
                    </NavLink>
                </li>
                <li>

                    <NavLink
                        to="/about"

                        className={({isActive}) =>
                            clsx(styles.navLink, {
                                [styles.navLinkActive]: isActive,
                            })
                        }
                    >
                        <Info size={16}/>
                        <span>О данных</span>
                    </NavLink>
                </li>
            </ul>
        </nav>

    )
}