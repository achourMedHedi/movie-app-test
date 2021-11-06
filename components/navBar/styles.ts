import { css } from "@emotion/css";

const styles = {
    container: css`
        padding: 15px 29px;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        
        @media (max-width: 375px) {
            justify-content: space-between;
            padding: 17px 20px;
        }
    `,
    logo: css`
        margin-right: 35px;
    `,
    text: css`
        font-weight: bold;
        font-size: 17px;
        color: #522583;
        font-family: Arial;

        @media (max-width: 375px) {
            display: none;
        }
    `,
    burgerMenu: css`
        display: none;

        @media (max-width: 375px) {
            display: block;
        }
    `
}

export default styles