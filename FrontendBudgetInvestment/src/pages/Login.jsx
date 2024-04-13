import Header from "../components/Header"
import LoginContainer from "../components/LoginContainer"
import "../cssFiles/Login.css"
import "../cssFiles/Header.css"
import "../cssFiles/Footer.css"
import Footer from "../components/Footer"
function Login(){
        return(
            <>
                <Header/>
                <LoginContainer />
                <Footer/>
             </>
        )
}

export default Login