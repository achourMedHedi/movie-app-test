import styled from "@emotion/styled";


export const Tab = styled.button`
    color: ${props => props.isActive ? "#522583" : "#060606F5"};
    border: none;
    border-bottom: ${props => props.isActive ? "3px solid #522583" : "3px solid transparent"};
    font-size: 20px;
    margin-right: 19px;
    background: none;
    cursor: pointer;
    
    @media (max-width: 375px) {
        font-size: 17px;
    }
`

export const TabsContainer = styled.div`
    display: flex;
    justify-content: center
`