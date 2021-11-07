import styled from "@emotion/styled";

export const SquareLoadingContainer = styled.div<any>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    border-radius: 10px;
    background: #DDDBDD;
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
        animation: shimmer 1s infinite;
        content: '';
      }
    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
`