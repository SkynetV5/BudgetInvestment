import Header from "../components/Header"
import RegisterContainer from "../components/RegisterContainer"
import "../cssFiles/Register.css"
import "../cssFiles/Header.css"
import "../cssFiles/Footer.css"
import Footer from "../components/Footer"
function Register(){
    return (
        <>
            <Header />
            <RegisterContainer/>
            <Footer/>
        </>
    )
}

export default Register