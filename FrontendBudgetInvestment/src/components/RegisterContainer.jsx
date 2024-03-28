import Button from "./Button";
import Label from "./Label";

export default function RegisterContainer(){
    return <>
        <div id="container-register">
            <form>
                <Label>Nazwa Użytkownika</Label><br></br>
                <input type="text"/><br></br>
                <Label>Email</Label>
                <input type="email"/><br></br>
                <Label>Hasło</Label>
                <input type="password"/><br></br>
                <Label>Powtórz Hasło</Label><br></br>
                <input type="password"/><br></br>
                <div style={{paddingLeft: "75px"}}><Button classed={"button-register"}>Zarejestruj się </Button></div>
            </form>
            
        </div>
    </>
}