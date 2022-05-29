import s from "./ErrorWindow.module.css"
import {FC} from "react";

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
        <div className={s.error}>
            <div className={s.errorMessage}>{error}</div>
        </div>
    )
}

export default ErrorWindow