import { FC } from "react";
import IProps from "./Header.types";
import styles, { HeaderTitle } from "./styles";


const Header: FC<IProps> = ({ title, subTitle, description }): JSX.Element => {

    return (
        <div className={styles.container}>
            <HeaderTitle color="#522583" >
                {title}
            </HeaderTitle>
            <div className={styles.subTitle}>
                {subTitle}
            </div>
            <div className={styles.description} >
                {description}
            </div>
        </div>
    )
}

export default Header