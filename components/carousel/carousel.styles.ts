import { css } from "@emotion/css";
import styled from "@emotion/styled";


export const CarouselContainer = styled.div`
    position: relative;
    overflow: hidden;
`

export const CarouselItemsContainer = styled.div<any>`
    display: flex;
    transform: ${({ translate }) => `translateX(${-(translate * 320) + 20}px)`};
    transition: transform 0.3s;
    position: relative;
`

export const CarouselItem = styled.div`
    margin: 0 10px;
    position: relative;

     
    @media (max-width: 375px) {
        width: 100%;
    }
`

export const SwitchArrow = styled.button<any>`
    height: 100%;
    position: absolute;
    left: ${({ direction }) => direction === 'left' && "0"};
    top: 0;
    right: ${({ direction }) => direction === 'right' && "0"};
    z-index: 1;
    width: 300px;
    height: 360px;
    background: ${({ direction }) => `linear-gradient(to ${direction}, transparent , white , white  )`};
    border: none;
    outline: none;
    cursor: pointer;
    

    @media (max-width: 375px) {
        display: none;
    }
`

export const CarouselItemTitle = styled.div`
    position: absolute;
    bottom: 66px;
    text-align: center;
    width: 100%;
    color: white;
    font-weight: bold;
    font-size: 24px;
`

export const MobileStepsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 35px;
    margin-bottom: 35px;
`


export const MobileStep = styled.div<any>`
    height: 8px;
    border-radius: 999px;
    width: ${({ isActive }) => isActive ? 20 : 8}px;
    background: ${({ isActive }) => isActive ? "#522583" : "#522583"};
    opacity: ${({ isActive }) => isActive ? "1" : "0.3"};
    margin-right: 8px;
    display: none;

    @media (max-width: 375px) {
        display: inline-block;
    }
`


export const styles = {
    image: css`
        border-radius: 10px;
    `
}