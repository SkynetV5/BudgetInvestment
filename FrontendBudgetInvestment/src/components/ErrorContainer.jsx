export default function ErrorContainer({children}){
    return(
        <div id="error-container">
            <h1>Błąd!</h1>
            {children}
        </div>
    )
}