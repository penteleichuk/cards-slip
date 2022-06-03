import './ErrorWindow.scss'

type ErrorWindowPropsType = {
    error: string | null
    setError: (errorMessage: string | null) => void
}
const ErrorWindow = ({error, setError}: ErrorWindowPropsType) => {

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