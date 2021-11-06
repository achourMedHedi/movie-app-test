import { css } from "@emotion/css"
import styled from '@emotion/styled'

const styles = {
    container: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 56px 30px 35px 30px;
        max-width: 620px;
        margin: auto;

        @media (max-width: 375px) {
            padding: 44px 30px 35px 30px;
        }
    `,
    subTitle: css`
        color: #FF6A13;
        margin-bottom: 20px;
        font-size: 45px;
        font-weight: bold;
        text-align: center;

        @media (max-width: 375px) {
            font-size: 34px;
            margin-bottom: 18px;
        }
    `,
    description: css`
        color: #6D6E71;
        font-size: 20px;
        text-align: center;

        @media (max-width: 375px) {
            font-size: 17px;
        }
    `
}

export const HeaderTitle = styled.h1`
    color: ${props => props.color};
    margin-bottom: 52px;
    font-size: 80px;
    font-weight: bold;
    text-align: center;
    margin-top: 0;

    @media (max-width: 375px) {
        font-size: 34px;
        margin-bottom: 44px;
    }

`

export default styles