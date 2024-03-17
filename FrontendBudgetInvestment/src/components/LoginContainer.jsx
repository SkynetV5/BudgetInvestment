import Label from "./Label"
import Button from "./Button"
import { Link } from "react-router-dom"

export default function LoginContainer(){

    return(
        <div id="container-login">
            <form>
                <Label>Email</Label><br></br>
                <input type="email"/> <br></br>
                <Label>Hasło</Label><br></br>
                <input type="password"/><br></br>
                <Link to='/register'><Button classed={"button-register"}> Zarejestruj się  </Button></Link>
                <Button classed={"button-login"}> Zaloguj się </Button>
            </form>
            <a> Nie pamiętasz hasła ?</a>
        </div>
    )
}