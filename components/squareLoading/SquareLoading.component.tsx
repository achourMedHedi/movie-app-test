import React, { FC } from "react";
import { SquareLoadingContainer } from "./squareLoading.styles";
import { TSquareLoadingProps } from './squareLoading.types'


const SquareLoading: FC<TSquareLoadingProps> = ({ loading, children, width, height, id }): JSX.Element => {

    if (loading) {
        return <SquareLoadingContainer id={`square-loading-${id}`} width={width} height={height} />
    }
    return (<div id={id}>
        {children}
    </div>)
}

export default SquareLoading