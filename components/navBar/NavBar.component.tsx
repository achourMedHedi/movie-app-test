import { FC } from "react";
import styles from "./styles";
import Image from 'next/image'


const NavBar: FC = () : JSX.Element => {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src="/go-logo.svg" alt="Go logo" width={75} height={37} />
            </div>
            <div className={styles.text}>
                GO TV
            </div>
            <div className={styles.burgerMenu}>
                <Image src="/burger-icon.svg" alt="burger icon" width={24} height={24} />
            </div>
        </div>
    )
}

export default NavBar