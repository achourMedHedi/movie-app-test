import { css } from "@emotion/css";
import styled from "@emotion/styled";


export const ErrorHandlerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(255, 106, 19);
    height: 500px;
    width: 100%;

    @media (max-width: 375px) {
        flex-direction: column;
    }

`

export const ErrorHandlerText = styled.h1`
    font-weight: 500;
    font-size: 50px;
    line-height: normal;
    color: rgb(255, 255, 255);
    margin-left: 50px;
    text-align: center;
    
    @media (max-width: 375px) {
        margin-left: 0;
    }

`

export const styles = {
    errorHandlerImage: css`
        max-width: 100%;
    `
}