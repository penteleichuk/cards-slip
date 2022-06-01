import {FC} from "react";
import './ErrorWindow.scss'

type ErrorWindowPropsType = {
    error: string | null
    setError: (errorMessage: string | null) => void
}

const ErrorWindow: FC<ErrorWindowPropsType> = ({error, setError}): JSX.Element => {

     if(error) {
         setTimeout(() => {
             setError( null)
         }, 5000)
     }

    return (
        <div className="error">
            <div className="error_message">{error}</div>
        </div>
    )
}

export default ErrorWindow