import { FC } from "react";
import { ErrorHandlerContainer, ErrorHandlerText, styles } from "./errorHandler.styles";
import { TErrorHandlerProps } from "./errorHandler.types";
import Image from 'next/image'


const ErrorHandler: FC<TErrorHandlerProps> = ({ statusCode, children }): JSX.Element => {
    const errorMessage = (): string => {
        switch (statusCode) {
            case 401:
                return 'Unauthorized'
            case 404:
                return 'Not Found'
        }
        return 'Something went wrong'
    }

    if (!statusCode || statusCode === 200) {
        return <>{children}</>
    }

    return (
        <ErrorHandlerContainer>
            <img src="/404.png" alt="Go logo" className={styles.errorHandlerImage} />
            <ErrorHandlerText>
                {errorMessage()}
            </ErrorHandlerText>
        </ErrorHandlerContainer>
    )
}

export default ErrorHandler